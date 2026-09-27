import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import { useSettings } from '../../hooks/useSettings';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Cakes', path: '/cakes' },
  { name: 'Events', path: '/events' },
  { name: 'Mascots', path: '/mascots' },
  { name: 'Services', path: '/services' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const { settings } = useSettings();
  const [isOpen, setIsOpen] = useState(false);

  if (!settings) return null;

  const rawPhone = settings.whatsapp || settings.phone || '919999999999';
  const cleanPhone = rawPhone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hello Cakes by Shiddat, I would like to inquire about booking a cake / celebration!')}`;

  return (
    <header className="fixed top-0 left-0 z-50 w-full transition-all duration-300">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="mt-2.5 sm:mt-4 rounded-full border border-[#edd7cb] bg-[#fffaf6]/92 shadow-md backdrop-blur-xl transition-all">
          <div className="flex h-16 sm:h-20 items-center justify-between px-4 sm:px-7 lg:px-8">
            {/* Brand Logo */}
            <Link to="/" className="group shrink-0" aria-label={`${settings.businessName} home`}>
              <div className="flex flex-col leading-none">
                <span
                  className="text-xl sm:text-2xl lg:text-[26px] font-semibold text-[#3a2d28] transition-all duration-300 group-hover:text-[#d7a88c]"
                  style={{ fontFamily: 'Playfair Display' }}
                >
                  {settings.businessName || 'Cakes By Shiddat'}
                </span>
                <span className="mt-0.5 sm:mt-1 text-[8px] sm:text-[9px] uppercase tracking-[2.5px] sm:tracking-[4px] text-[#b89a89]">
                  {settings.tagline || 'Luxury Cakes & Celebrations'}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden items-center gap-3.5 lg:gap-5 xl:gap-7 lg:flex">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative text-xs lg:text-[13.5px] xl:text-[15px] font-medium transition-all duration-300 whitespace-nowrap ${
                      isActive
                        ? 'text-[#d7a88c] font-semibold after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-[#d7a88c] after:rounded-full'
                        : 'text-[#3a2d28] hover:text-[#d7a88c]'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Right Action: WhatsApp CTA & Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#25D366] to-[#1ebe5d] px-4 xl:px-6 py-2 xl:py-2.5 font-medium text-white text-xs xl:text-sm shadow-md shadow-[#25D366]/25 transition-all hover:scale-105 hover:shadow-lg"
              >
                <FaWhatsapp className="text-base xl:text-lg" />
                <span>WhatsApp Us</span>
              </a>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1.5 sm:p-2 rounded-xl text-2xl sm:text-3xl text-[#3a2d28] hover:bg-[#faeee6] transition lg:hidden cursor-pointer"
                aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
              >
                {isOpen ? <HiX /> : <HiMenu />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div
            className={`overflow-hidden transition-all duration-300 lg:hidden ${
              isOpen ? 'max-h-[580px] pb-6 pt-2 border-t border-[#f0dfd7]' : 'max-h-0'
            }`}
          >
            <div id="mobile-navigation" className="flex flex-col gap-3 px-6 sm:px-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `py-1.5 text-base font-medium transition ${
                      isActive ? 'text-[#d7a88c] font-bold' : 'text-[#3a2d28]'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20ba59] py-3 text-center font-medium text-white shadow-md transition"
              >
                <FaWhatsapp className="text-xl" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
