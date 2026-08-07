import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CakesHero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#fffaf6]">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/cakes-hero.jpg"
          alt="Luxury Cake"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#fffaf6]/75 backdrop-blur-[2px]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-subtitle mb-6">
              CUSTOM CAKES
            </p>

            <h1
              className="text-5xl lg:text-7xl leading-tight text-[#3a2d28]"
              style={{ fontFamily: "Playfair Display" }}
            >
              Handcrafted Cakes
              <br />
              For Every
              <br />
              Celebration
            </h1>

            <p className="mt-8 text-lg text-gray-600 max-w-xl leading-relaxed">
              Whether it's a birthday, wedding, anniversary,
              baby shower, or corporate event, we create cakes
              that become the centerpiece of your celebration.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mt-10">

              <div className="flex items-center gap-3">
                <span>✨</span>
                <p>Premium Ingredients</p>
              </div>

              <div className="flex items-center gap-3">
                <span>🎂</span>
                <p>Custom Designs</p>
              </div>

              <div className="flex items-center gap-3">
                <span>❤️</span>
                <p>Made With Love</p>
              </div>

              <div className="flex items-center gap-3">
                <span>⭐</span>
                <p>Luxury Finish</p>
              </div>

            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-5 mt-12">

              <Link
                to="/contact"
                className="px-8 py-4 rounded-full bg-[#d7a88c] text-white font-medium shadow-lg hover:scale-105 transition"
              >
                Order Custom Cake
              </Link>

              <Link
                to="/gallery"
                className="px-8 py-4 rounded-full border border-[#d7a88c] text-[#3a2d28] hover:bg-[#d7a88c] hover:text-white transition"
              >
                View Gallery
              </Link>

            </div>
          </motion.div>

          {/* Right Side Cake Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-[40px] overflow-hidden shadow-2xl">
              <img
                src="/images/featured-cake.jpg"
                alt="Featured Cake"
                className="w-full h-[650px] object-cover"
              />
            </div>

            {/* Floating Badge */}
            <div className="absolute top-10 -left-8 bg-white rounded-full px-6 py-4 shadow-xl">
              🎂 Wedding Cakes
            </div>

            <div className="absolute bottom-12 -right-8 bg-white rounded-full px-6 py-4 shadow-xl">
              ⭐ 1000+ Happy Clients
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CakesHero;