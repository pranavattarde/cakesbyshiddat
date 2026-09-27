import { motion } from "framer-motion";
import { heroStats } from "../../data/heroData";
import { Link } from "react-router-dom";
import { useSettings } from '../../hooks/useSettings';
import HeroCardDeck from "./HeroCardDeck";
import { FaWhatsapp } from "react-icons/fa";

const Hero = () => {
  const { settings } = useSettings();
  if (!settings) return null;

  const rawPhone = settings.whatsapp || settings.phone || '919999999999';
  const cleanPhone = rawPhone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hi Cakes by Shiddat, I would like to book a consultation for a luxury cake / celebration!')}`;

  return (
    <section className="relative min-h-[90vh] bg-gradient-to-b from-[#fff8f2] via-[#fcf5ef] to-[#fbf2eb] pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 overflow-hidden">
      {/* Decorative background glow circles */}
      <div className="absolute top-10 left-5 sm:left-10 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#fde9df]/60 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-5 right-5 sm:right-10 w-80 sm:w-[500px] h-80 sm:h-[500px] rounded-full bg-[#fcece3]/70 blur-3xl -z-10 pointer-events-none" />

      <div className="container-custom">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headlines, CTA, Stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 xl:col-span-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#fff0e6] border border-[#f0dcce] text-[11px] sm:text-xs font-semibold uppercase tracking-[2.5px] sm:tracking-[3px] text-[#c99a7d] mb-4 sm:mb-6">
              <span>✨</span>
              <span>{settings.tagline || 'Crafted With Love & Shiddat'}</span>
            </div>

            <h1
              className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.14] text-[#3a2d28] tracking-tight"
              style={{ fontFamily: "Playfair Display" }}
            >
              {settings.heroTitle || 'Luxury Cakes & Celebrations'}
            </h1>

            <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg leading-relaxed text-[#8a7a72] max-w-xl mx-auto lg:mx-0">
              {settings.heroSubtitle || 'Custom handcrafted cakes and beautifully planned event celebrations in Haryana. Where passion meets perfection in every single detail.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-4 mt-6 sm:mt-8 lg:mt-10">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#d7a88c] hover:bg-[#c99a7d] shadow-lg shadow-[#d7a88c]/25 transition-all hover:scale-105 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-white font-medium text-sm sm:text-base cursor-pointer"
              >
                <FaWhatsapp className="text-xl" />
                <span>{settings.heroButtonText || 'Book Consultation'}</span>
              </a>

              <Link
                to="/gallery"
                className="w-full sm:w-auto inline-flex items-center justify-center border border-[#d7a88c] text-[#3a2d28] hover:bg-[#d7a88c] hover:text-white transition-all px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-medium text-sm sm:text-base shadow-sm"
              >
                Explore Gallery
              </Link>
            </div>

            {/* Quick Statistics - 2x2 on mobile, 4 columns on tablet and desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#eedcd2]">
              {heroStats.map((item) => (
                <div key={item.label} className="text-center lg:text-left">
                  <h3
                    className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#3a2d28]"
                    style={{ fontFamily: 'Playfair Display' }}
                  >
                    {item.value}
                  </h3>
                  <p className="text-[11px] sm:text-xs lg:text-sm text-[#8a7a72] mt-0.5 sm:mt-1 font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Dynamic 3-Card Stack (Cakes, Events, Mascots) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-6 xl:col-span-6 flex justify-center w-full"
          >
            <HeroCardDeck />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
