import { motion } from "framer-motion";
import { useSettings } from '../../hooks/useSettings';

const ContactHero = () => {
  const { settings } = useSettings();
  if (!settings) return null;
  const whatsappUrl = `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`;
  return (
    <section className="relative pt-40 pb-28 bg-[#fffaf6] overflow-hidden">
      <div className="container-custom">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="section-subtitle mb-6">
            CONTACT US
          </p>

          <h1
            className="text-5xl lg:text-7xl text-[#3a2d28] mb-8"
            style={{
              fontFamily: "Playfair Display",
            }}
          >
            Let's Bring Your
            <br />
            Celebration To Life
          </h1>

          <p className="text-lg text-gray-600 leading-8 max-w-3xl mx-auto">
            Whether it's a custom cake, birthday celebration,
            wedding decoration, baby shower, mascot experience,
            or corporate event, we'd love to hear from you.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5 mt-10">

            <a
              href={`tel:${settings.phone}`}
              className="bg-[#d7a88c] text-white px-8 py-4 rounded-full hover:bg-[#c9987a] transition-all"
            >
              Call Us
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#d7a88c] text-[#3a2d28] px-8 py-4 rounded-full hover:bg-[#d7a88c] hover:text-white transition-all"
            >
              WhatsApp Us
            </a>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ContactHero;
