import { motion } from "framer-motion";

const GalleryHero = () => {
  return (
    <section className="relative pt-40 pb-32 bg-[#fffaf6] overflow-hidden">

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=2000"
          alt="Celebration"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-[#fffaf6]/90" />

      <div className="container-custom relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto text-center"
        >
          <p className="section-subtitle mb-6">
            OUR PORTFOLIO
          </p>

          <h1
            className="text-5xl lg:text-7xl text-[#3a2d28] mb-8"
            style={{
              fontFamily: "Playfair Display",
            }}
          >
            Celebrations
            <br />
            We've Brought To Life
          </h1>

          <p className="text-lg lg:text-xl text-gray-600 leading-8 max-w-3xl mx-auto">
            Explore our collection of custom cakes, birthday setups,
            wedding decorations, baby showers, mascot experiences,
            balloon decor, and unforgettable moments.
          </p>
        </motion.div>

      </div>

    </section>
  );
};

export default GalleryHero;