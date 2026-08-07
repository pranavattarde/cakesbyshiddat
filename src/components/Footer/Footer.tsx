import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { useSettings } from '../../hooks/useSettings';

const Footer = () => {
  const { settings } = useSettings();
  if (!settings) return null;
  const whatsappUrl = `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`;
  return <footer className="bg-[#2f241f] text-white"><div className="container-custom py-20"><div className="grid gap-12 lg:grid-cols-4"><div><h2 className="text-3xl" style={{ fontFamily: 'Playfair Display' }}>{settings.businessName}</h2><p className="mt-4 leading-7 text-gray-300">{settings.description}</p></div><div><h3 className="mb-5 font-semibold">Quick Links</h3><ul className="space-y-3 text-gray-300"><li><Link to="/">Home</Link></li><li><Link to="/about">About</Link></li><li><Link to="/cakes">Cakes</Link></li><li><Link to="/events">Events</Link></li></ul></div><div><h3 className="mb-5 font-semibold">Services</h3><ul className="space-y-3 text-gray-300"><li>Custom Cakes</li><li>Wedding Cakes</li><li>Birthday Events</li><li>Mascot Services</li><li>Event Planning</li></ul></div><div><h3 className="mb-5 font-semibold">Contact</h3><ul className="space-y-3 text-gray-300"><li>📍 {settings.address}</li><li>📞 {settings.phone}</li><li>✉ {settings.email}</li></ul><div className="mt-6 flex gap-4">{settings.instagram && <a href={settings.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${settings.businessName} on Instagram`}><FaInstagram size={20} /></a>}{settings.facebook && <a href={settings.facebook} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${settings.businessName} on Facebook`}><FaFacebookF size={20} /></a>}{settings.youtube && <a href={settings.youtube} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${settings.businessName} on YouTube`}><FaYoutube size={20} /></a>}{settings.whatsapp && <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label={`Chat with ${settings.businessName} on WhatsApp`}><FaWhatsapp size={20} /></a>}</div></div></div><div className="mt-16 border-t border-white/10 pt-8 text-center text-gray-400">{settings.footerText}</div></div></footer>;
};

export default Footer;
