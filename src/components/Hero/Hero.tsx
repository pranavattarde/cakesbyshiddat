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
    <section className="relative min-h-screen bg-gradient-to-b from-[#fff8f2] via-[#fcf5ef] to-[#fbf2eb] pt-36 sm:pt-44 pb-20 overflow-hidden">
      {/* Decorative background glow circles */}
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-[#fde9df]/60 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-[#fcece3]/70 blur-3xl -z-10 pointer-events-none" />

      <div className="container-custom max-width:1440px">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines, CTA, Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 xl:col-span-5"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fff0e6] border border-[#f0dcce] text-xs font-semibold uppercase tracking-[3px] text-[#c99a7d] mb-6">
              <span>✨</span>
              <span>{settings.tagline || 'Crafted With Love & Shiddat'}</span>
            </div>

            <h1
              className="text-4xl sm:text-6xl xl:text-7xl font-bold leading-[1.12] text-[#3a2d28]"
              style={{ fontFamily: "Playfair Display" }}
            >
              {settings.heroTitle || 'Luxury Cakes & Celebrations'}
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#8a7a72] max-w-xl">
              {settings.heroSubtitle || 'Custom handcrafted cakes and beautifully planned event celebrations in Haryana. Where passion meets perfection in every single detail.'}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8 sm:mt-10">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#d7a88c] hover:bg-[#c99a7d] shadow-lg shadow-[#d7a88c]/25 transition-all hover:scale-105 px-8 py-4 rounded-full text-white font-medium text-base"
              >
                <FaWhatsapp className="text-xl" />
                <span>{settings.heroButtonText || 'Book Consultation'}</span>
              </a>

              <Link
                to="/gallery"
                className="border border-[#d7a88c] text-[#3a2d28] hover:bg-[#d7a88c] hover:text-white transition-all px-8 py-4 rounded-full font-medium text-base shadow-sm"
              >
                Explore Gallery
              </Link>
            </div>

            {/* Quick Statistics */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-12 pt-8 border-t border-[#eedcd2]">
              {heroStats.map((item) => (
                <div key={item.label}>
                  <h3
                    className="text-2xl sm:text-3xl font-bold text-[#3a2d28]"
                    style={{ fontFamily: 'Playfair Display' }}
                  >
                    {item.value}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8a7a72] mt-1 font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Dynamic 3-Card Stack (Cakes, Events, Mascots) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-6 xl:col-span-7"
          >
            <HeroCardDeck />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
