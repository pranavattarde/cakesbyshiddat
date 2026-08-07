import { motion } from "framer-motion";
import { useSettings } from '../../hooks/useSettings';

const WhatsAppBanner = () => {
  const { settings } = useSettings();
  if (!settings) return null;
  const whatsappUrl = `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`;
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#25D366] rounded-[40px] p-10 lg:p-16 text-center text-white"
        >
          <div className="text-6xl mb-6">
            💬
          </div>

          <h2
            className="text-4xl lg:text-5xl mb-6"
            style={{
              fontFamily: "Playfair Display",
            }}
          >
            Need A Quick Response?
          </h2>

          <p className="max-w-2xl mx-auto text-lg leading-8 mb-8">
            Most inquiries are answered within minutes on WhatsApp.
            Chat directly with our team and start planning your celebration today.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-white text-[#25D366] px-8 py-4 rounded-full font-semibold hover:scale-105 transition-all duration-300"
          >
            Chat On WhatsApp
          </a>

        </motion.div>

      </div>
    </section>
  );
};

export default WhatsAppBanner;
