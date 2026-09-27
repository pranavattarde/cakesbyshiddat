import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { useSettings } from '../../hooks/useSettings';

const Footer = () => {
  const { settings } = useSettings();
  if (!settings) return null;
  const whatsappUrl = `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`;

  return (
    <footer className="bg-[#2f241f] text-white">
      <div className="container-custom py-14 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Brand Info */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'Playfair Display' }}>
              {settings.businessName}
            </h2>
            <p className="mt-3 sm:mt-4 leading-relaxed text-gray-300 text-sm">
              {settings.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 sm:mb-4 text-base font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li><Link to="/" className="hover:text-[#d7a88c] transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#d7a88c] transition">About Us</Link></li>
              <li><Link to="/cakes" className="hover:text-[#d7a88c] transition">Luxury Cakes</Link></li>
              <li><Link to="/events" className="hover:text-[#d7a88c] transition">Event Celebrations</Link></li>
              <li><Link to="/mascots" className="hover:text-[#d7a88c] transition">Kids & Mascots</Link></li>
              <li><Link to="/gallery" className="hover:text-[#d7a88c] transition">Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-[#d7a88c] transition">Contact</Link></li>
            </ul>
          </div>

          {/* Offerings */}
          <div>
            <h3 className="mb-3 sm:mb-4 text-base font-semibold text-white">Our Offerings</h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>Bespoke Multi-Tier Cakes</li>
              <li>Royal Wedding Stages & Decor</li>
              <li>Theme Birthday Celebrations</li>
              <li>Baby Showers & Anniversaries</li>
              <li>Mascot Characters & Live Magic</li>
              <li>Specialized Event Favors</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="mb-3 sm:mb-4 text-base font-semibold text-white">Get in Touch</h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>📍 {settings.address}</li>
              <li>📞 <a href={`tel:${settings.phone.replace(/\D/g, '')}`} className="hover:text-[#d7a88c] transition">{settings.phone}</a></li>
              <li>✉ <a href={`mailto:${settings.email}`} className="hover:text-[#d7a88c] transition">{settings.email}</a></li>
            </ul>

            <div className="mt-5 sm:mt-6 flex items-center gap-3">
              {settings.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#d7a88c] text-white flex items-center justify-center transition"
                  aria-label={`Visit ${settings.businessName} on Instagram`}
                >
                  <FaInstagram size={17} />
                </a>
              )}
              {settings.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#d7a88c] text-white flex items-center justify-center transition"
                  aria-label={`Visit ${settings.businessName} on Facebook`}
                >
                  <FaFacebookF size={17} />
                </a>
              )}
              {settings.youtube && (
                <a
                  href={settings.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#d7a88c] text-white flex items-center justify-center transition"
                  aria-label={`Visit ${settings.businessName} on YouTube`}
                >
                  <FaYoutube size={17} />
                </a>
              )}
              {settings.whatsapp && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition"
                  aria-label={`Chat with ${settings.businessName} on WhatsApp`}
                >
                  <FaWhatsapp size={17} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 border-t border-white/10 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-400">
          {settings.footerText || '© 2026 Cakes By Shiddat. All rights reserved.'}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
