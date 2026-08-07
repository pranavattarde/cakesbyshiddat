import { motion } from "framer-motion";
import { heroStats } from "../../data/heroData";
import { Link } from "react-router-dom"
import { useSettings } from '../../hooks/useSettings';

const Hero = () => {
  const { settings } = useSettings();
  if (!settings) return null;
  const whatsappUrl = `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`;
  return (
    <section className="min-h-screen bg-[#fff8f2] pt-40">
      <div className="container-custom max-width:1440px">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="uppercase tracking-[5px] text-[#d7a88c] text-sm mb-5">{settings.tagline}</p>
            <h1 className="text-5xl md:text-7xl leading-tight text-[#3a2d28]" style={{ fontFamily: "Playfair Display" }}>{settings.heroTitle}</h1>
            <p className="mt-6 text-lg text-[#8a7a72] max-w-xl">{settings.heroSubtitle}</p>
            <div className="flex flex-wrap gap-4 mt-10"><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-[#d7a88c] hover:bg-[#c99a7d] transition-all px-8 py-4 rounded-full text-white font-medium">{settings.heroButtonText}</a><Link to="/gallery" className="border border-[#d7a88c] text-[#3a2d28] hover:bg-[#d7a88c] hover:text-white transition-all px-8 py-4 rounded-full font-medium">Explore Gallery</Link></div>
            <div className="grid grid-cols-3 gap-8 mt-14">{heroStats.map((item) => <div key={item.label}><h3 className="text-3xl font-semibold text-[#3a2d28]">{item.value}</h3><p className="text-[#8a7a72] mt-2">{item.label}</p></div>)}</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative"><img src="https://images.unsplash.com/photo-1535254973040-607b474cb50d" alt="Luxury Cake" loading="lazy" decoding="async" className="rounded-[48px] shadow-2xl object-cover h-[780px] w-full" /><div className="absolute -top-6 -left-6 bg-white p-5 rounded-3xl shadow-xl">🎂 Wedding Cakes</div><div className="absolute top-1/2 -right-6 bg-white p-5 rounded-3xl shadow-xl">🎉 Event Planning</div><div className="absolute bottom-10 left-0 bg-white p-5 rounded-3xl shadow-xl">🧸 Mascot Services</div></motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
