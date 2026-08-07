import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { useSettings } from '../../hooks/useSettings';

const navLinks = [{ name: 'Home', path: '/' }, { name: 'Cakes', path: '/cakes' }, { name: 'Services', path: '/services' }, { name: 'Events', path: '/events' }, { name: 'Gallery', path: '/gallery' }, { name: 'About', path: '/about' }, { name: 'Contact', path: '/contact' }];

const Navbar = () => {
  const { settings } = useSettings();
  const [isOpen, setIsOpen] = useState(false);
  if (!settings) return null;
  const whatsappUrl = `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`;
  return <header className="fixed top-0 left-0 z-50 w-full"><div className="mx-auto max-w-7xl px-6 lg:px-10"><div className="mt-4 rounded-full border border-[#f0dfd7] bg-white/75 shadow-lg backdrop-blur-xl"><div className="flex h-20 items-center justify-between px-8">
    <Link to="/" className="group" aria-label={`${settings.businessName} home`}><div className="flex flex-col leading-none"><h1 className="text-[28px] text-[#3a2d28] transition-all duration-300 group-hover:text-[#d7a88c]" style={{ fontFamily: 'Playfair Display' }}>{settings.businessName}</h1><span className="mt-1 text-[9px] uppercase tracking-[4px] text-[#b89a89]">{settings.tagline}</span></div></Link>
    <nav className="hidden items-center gap-10 lg:flex">{navLinks.map((link) => <NavLink key={link.path} to={link.path} className={({ isActive }) => `relative text-[15px] font-medium transition-all duration-300 ${isActive ? 'text-[#d7a88c]' : 'text-[#3a2d28] hover:text-[#d7a88c]'}`}>{link.name}</NavLink>)}</nav>
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hidden rounded-full bg-[#d7a88c] px-6 py-3 font-medium text-white transition-all hover:bg-[#c9987a] lg:block">{settings.heroButtonText}</a>
    <button onClick={() => setIsOpen(!isOpen)} className="text-3xl text-[#3a2d28] lg:hidden" aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={isOpen} aria-controls="mobile-navigation">{isOpen ? <HiX /> : <HiMenu />}</button>
  </div><div className={`overflow-hidden transition-all duration-300 lg:hidden ${isOpen ? 'max-h-[500px] pb-6' : 'max-h-0'}`}><div id="mobile-navigation" className="flex flex-col gap-5 px-8">{navLinks.map((link) => <NavLink key={link.path} to={link.path} onClick={() => setIsOpen(false)} className={({ isActive }) => `${isActive ? 'text-[#d7a88c]' : 'text-[#3a2d28]'} font-medium`}>{link.name}</NavLink>)}<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-2 rounded-full bg-[#d7a88c] py-3 text-center text-white">{settings.heroButtonText}</a></div></div></div></div></header>;
};

export default Navbar;
