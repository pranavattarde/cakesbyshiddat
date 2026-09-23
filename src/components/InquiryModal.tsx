import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { inquiriesService } from '../services/inquiries.service';
import { FaTimes, FaCheckCircle, FaWhatsapp } from 'react-icons/fa';
import { useSettings } from '../hooks/useSettings';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.union([z.literal(''), z.string().email('Invalid email')]),
  eventType: z.string().min(1, 'Service/Event type is required'),
  eventDate: z.string().min(1, 'Event date is required'),
  deliveryType: z.enum(['PICKUP', 'HOME_DELIVERY']),
  guestCount: z.coerce.number().min(1),
  budget: z.coerce.number().min(0),
  message: z.string().optional(),
});

interface InquiryModalProps {
  open: boolean;
  onClose: () => void;
  initialService?: string;
  isCustomService?: boolean;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  open,
  onClose,
  initialService = 'Custom Celebration',
  isCustomService = false,
}) => {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: initialService,
    eventDate: '',
    deliveryType: 'PICKUP' as 'PICKUP' | 'HOME_DELIVERY',
    guestCount: 25,
    budget: 5000,
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, eventType: initialService }));
    }
  }, [initialService, open]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const parsed = schema.safeParse(formData);
    if (!parsed.success) {
      setErrorMsg(parsed.error.issues[0]?.message || 'Please check the required fields');
      return;
    }

    setLoading(true);
    try {
      await inquiriesService.create({
        customer: {
          name: parsed.data.name,
          phone: parsed.data.phone,
          email: parsed.data.email || undefined,
          whatsapp: parsed.data.phone,
        },
        eventType: parsed.data.eventType,
        eventDate: new Date(parsed.data.eventDate).toISOString(),
        deliveryType: parsed.data.deliveryType,
        guestCount: parsed.data.guestCount,
        weight: 0,
        budget: parsed.data.budget,
        message: parsed.data.message || '',
      });
      setSuccess(true);
    } catch {
      setErrorMsg('Could not submit booking right now. Please message us on WhatsApp directly!');
    } finally {
      setLoading(false);
    }
  };

  const whatsappUrl = settings?.whatsapp
    ? `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi Cakes by Shiddat! I would like to inquire about: ${formData.eventType}`)}`
    : 'https://wa.me/919999999999';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
      onMouseDown={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-[32px] border border-[#f0dfd7] bg-[#fffaf6] p-6 sm:p-8 shadow-2xl my-8"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#3a2d28] hover:bg-[#faeae1] transition"
          aria-label="Close modal"
        >
          <FaTimes />
        </button>

        {success ? (
          <div className="py-10 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 text-3xl">
              <FaCheckCircle />
            </div>
            <h3 className="text-3xl font-serif text-[#3a2d28]">Inquiry Received!</h3>
            <p className="mt-3 text-[#8a7a72] max-w-md mx-auto">
              Thank you for trusting Cakes By Shiddat with your special celebration. Our team will contact you shortly to finalize details.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-3 font-medium transition"
              >
                <FaWhatsapp className="text-xl" /> Chat on WhatsApp Now
              </a>
              <button
                onClick={onClose}
                className="rounded-full border border-[#d7a88c] text-[#3a2d28] hover:bg-[#d7a88c] hover:text-white px-6 py-3 font-medium transition"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="text-xs uppercase tracking-[4px] text-[#d7a88c] font-semibold">Consultation & Booking</span>
              <h2 className="text-3xl sm:text-4xl text-[#3a2d28] mt-1 font-serif">
                {isCustomService ? 'Book Custom Celebration' : 'Plan Your Celebration'}
              </h2>
              <p className="text-sm text-[#8a7a72] mt-1">
                Tell us about your requirements for <strong className="text-[#3a2d28]">{formData.eventType}</strong>.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-600">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#695349] font-medium mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Navdeep Dua"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-2xl border border-[#ebdcd3] bg-white px-4 py-3 text-sm text-[#3a2d28] focus:border-[#d7a88c] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#695349] font-medium mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-2xl border border-[#ebdcd3] bg-white px-4 py-3 text-sm text-[#3a2d28] focus:border-[#d7a88c] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#695349] font-medium mb-1">Service / Celebration</label>
                  <input
                    type="text"
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full rounded-2xl border border-[#ebdcd3] bg-white px-4 py-3 text-sm text-[#3a2d28] focus:border-[#d7a88c] focus:outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#695349] font-medium mb-1">Event Date & Time *</label>
                  <div className="relative">
                    <input
                      type="datetime-local"
                      required
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full rounded-2xl border border-[#ebdcd3] bg-white px-4 py-3 text-sm text-[#3a2d28] focus:border-[#d7a88c] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#695349] font-medium mb-1">Expected Guests</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                    className="w-full rounded-2xl border border-[#ebdcd3] bg-white px-4 py-3 text-sm text-[#3a2d28] focus:border-[#d7a88c] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#695349] font-medium mb-1">Approx. Budget (₹)</label>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                    className="w-full rounded-2xl border border-[#ebdcd3] bg-white px-4 py-3 text-sm text-[#3a2d28] focus:border-[#d7a88c] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#695349] font-medium mb-1">
                  {isCustomService ? 'Describe Your Custom Requirement *' : 'Specific Requirements / Flavors / Themes'}
                </label>
                <textarea
                  rows={3}
                  placeholder={
                    isCustomService
                      ? 'Tell us what you envision (e.g., custom entrance with fireworks, customized mascots, specific color palette, anchor requirements...)'
                      : 'E.g., 2-tier chocolate truffle cake with golden floral theme, mascot for kids, stage decor...'
                  }
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-2xl border border-[#ebdcd3] bg-white px-4 py-3 text-sm text-[#3a2d28] focus:border-[#d7a88c] focus:outline-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto rounded-full bg-[#d7a88c] hover:bg-[#c99a7d] px-8 py-3.5 text-white font-medium shadow-md transition disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Send Consultation Request'}
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-emerald-500 text-emerald-700 hover:bg-emerald-50 px-6 py-3 text-sm font-medium transition"
                >
                  <FaWhatsapp className="text-lg text-[#25D366]" /> Or Chat on WhatsApp
                </a>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default InquiryModal;
