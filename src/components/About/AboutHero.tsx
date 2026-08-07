import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AboutHero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=2000')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#fffaf6]/70 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-10 container-custom text-center">

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-sm uppercase tracking-[4px] text-[#d7a88c]">
            Home / About Us
          </p>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl lg:text-7xl text-[#3a2d28] mb-6"
          style={{
            fontFamily: "Playfair Display",
          }}
        >
          Creating Beautiful
          <br />
          Memories Since 2022
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
          }}
          className="max-w-3xl mx-auto text-lg lg:text-xl text-gray-600 leading-8 mb-10"
        >
          From handcrafted cakes to complete celebration experiences,
          Cakes By Shiddat has been turning special moments into
          unforgettable memories with creativity, passion, and love.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.4,
          }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            to="/contact"
            className="bg-[#d7a88c] hover:bg-[#c9987a] text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg"
          >
            Get In Touch
          </Link>

          <Link
            to="/gallery"
            className="border border-[#d7a88c] text-[#3a2d28] px-8 py-4 rounded-full hover:bg-white transition-all duration-300"
          >
            Explore Gallery
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutHero;