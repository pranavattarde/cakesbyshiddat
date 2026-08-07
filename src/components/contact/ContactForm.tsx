import { useState } from 'react';
import { useSettings } from '../../hooks/useSettings';
import { inquiriesService } from '../../services/inquiries.service';

const initialForm = { name: '', phone: '', email: '', service: '', eventDate: '', message: '' };

const ContactForm = () => {
  const { settings } = useSettings();
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const eventDate = new Date(`${formData.eventDate}T12:00:00`);
    if (eventDate.getTime() <= Date.now()) {
      setStatus('Please choose a future event date.');
      return;
    }
    const whatsappWindow = settings?.whatsapp ? window.open('', '_blank') : null;
    setSubmitting(true);
    setStatus('');
    try {
      await inquiriesService.create({
        customer: { name: formData.name.trim(), phone: formData.phone.trim(), email: formData.email.trim() || undefined },
        eventType: formData.service,
        eventDate: eventDate.toISOString(),
        deliveryType: 'PICKUP', guestCount: 1, weight: 0, budget: 0,
        message: formData.message.trim(),
      });
      setStatus('Thank you — your inquiry has been received.');
      setFormData(initialForm);
      if (settings?.whatsapp) {
        const text = `Hello ${settings.businessName}, I submitted an inquiry for ${formData.service}. My name is ${formData.name} and phone is ${formData.phone}.`;
        const whatsappUrl = `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
        if (whatsappWindow) {
          whatsappWindow.opener = null;
          whatsappWindow.location.href = whatsappUrl;
        } else {
          window.location.href = whatsappUrl;
        }
      }
    } catch { whatsappWindow?.close(); setStatus('We could not send your inquiry. Please try again.'); }
    finally { setSubmitting(false); }
  };

  return <section className="bg-[#fffaf6] py-28"><div className="container-custom"><div className="mb-16 text-center"><p className="section-subtitle">SEND AN INQUIRY</p><h2 className="section-title">Tell Us About Your Celebration</h2><p className="mx-auto mt-4 max-w-2xl text-gray-500">Your inquiry is saved securely and you can continue the conversation on WhatsApp.</p></div><form onSubmit={submit} className="mx-auto max-w-4xl rounded-[40px] border border-[#f3e5dc] bg-white p-10 shadow-xl"><div className="grid gap-6 md:grid-cols-2"><label><span className="sr-only">Your name</span><input required autoComplete="name" value={formData.name} type="text" name="name" placeholder="Your Name" onChange={handleChange} className="w-full rounded-xl border border-gray-200 p-4" /></label><label><span className="sr-only">Phone number</span><input required autoComplete="tel" value={formData.phone} type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} className="w-full rounded-xl border border-gray-200 p-4" /></label><label><span className="sr-only">Email address</span><input autoComplete="email" value={formData.email} type="email" name="email" placeholder="Email Address" onChange={handleChange} className="w-full rounded-xl border border-gray-200 p-4" /></label><label><span className="sr-only">Event date</span><input required value={formData.eventDate} type="date" name="eventDate" onChange={handleChange} className="w-full rounded-xl border border-gray-200 p-4" /></label><label className="md:col-span-2"><span className="sr-only">Service</span><select required value={formData.service} name="service" onChange={handleChange} className="w-full rounded-xl border border-gray-200 p-4"><option value="">Select Service</option>{['Cake Order','Birthday Celebration','Wedding Decoration','Baby Shower','Mascot Service','Corporate Event','Other'].map((service) => <option key={service}>{service}</option>)}</select></label><label className="md:col-span-2"><span className="sr-only">Message</span><textarea value={formData.message} rows={6} name="message" placeholder="Tell us about your event..." onChange={handleChange} className="w-full rounded-xl border border-gray-200 p-4" /></label></div><div className="mt-8 text-center"><button disabled={submitting} className="rounded-full bg-[#25D366] px-8 py-4 font-medium text-white transition hover:bg-[#1ebc59] disabled:opacity-60">{submitting ? 'Sending…' : 'Send Inquiry'}</button>{status && <p aria-live="polite" className="mt-4 text-[#3a2d28]">{status}</p>}</div></form></div></section>;
};

export default ContactForm;
