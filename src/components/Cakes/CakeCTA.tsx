import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSettings } from '../../hooks/useSettings';

const CakeCTA = () => {
  const { settings } = useSettings();
  if (!settings) return null;
  const whatsappUrl = `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`;
  return (
    <section className="py-28 bg-[#fffaf6]">
      <div className="container-custom">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#3a2d28] rounded-[50px] p-12 lg:p-20 text-center relative overflow-hidden"
        >
          {/* Decorative Glow */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-[#d7a88c]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#d7a88c]/10 rounded-full blur-3xl" />

          <div className="relative z-10">

            <p className="uppercase tracking-[4px] text-[#d7a88c] mb-5">
              Ready To Order?
            </p>

            <h2
              className="text-4xl lg:text-6xl text-white mb-6"
              style={{
                fontFamily: "Playfair Display",
              }}
            >
              Let's Design Your
              <br />
              Dream Cake
            </h2>

            <p className="max-w-3xl mx-auto text-gray-300 text-lg leading-8">
              Whether it's a birthday, wedding, anniversary,
              baby shower, corporate event, or a completely custom
              creation, we're ready to bring your vision to life.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-5 mt-10">

              <Link
                to="/contact"
                className="bg-[#d7a88c] hover:bg-[#c9987a] text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg"
              >
                Order Your Cake
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-[#3a2d28] transition-all duration-300"
              >
                WhatsApp Us
              </a>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default CakeCTA;
