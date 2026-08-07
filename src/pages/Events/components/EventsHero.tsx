import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const EventsHero = () => {
  return (
    <section className="relative overflow-hidden bg-[#fffaf6] pt-40 pb-24">

      <div className="container-custom">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-subtitle mb-5">
              EVENT CELEBRATIONS
            </p>

            <h1 className="font-playfair text-[#3a2d28] text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
              Creating
              <br />
              Memorable
              <br />
              Events &
              <br />
              Experiences
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed max-w-xl mb-8">
              From intimate birthdays to grand weddings,
              we design and manage celebrations that leave
              lasting memories through creativity,
              elegance, and attention to detail.
            </p>

            {/* FEATURES */}

            <div className="grid grid-cols-2 gap-4 mb-10">

              <div className="flex items-center gap-2 text-[#3a2d28]">
                <span>✨</span>
                <span>Custom Themes</span>
              </div>

              <div className="flex items-center gap-2 text-[#3a2d28]">
                <span>🎈</span>
                <span>Balloon Decor</span>
              </div>

              <div className="flex items-center gap-2 text-[#3a2d28]">
                <span>🧸</span>
                <span>Mascot Services</span>
              </div>

              <div className="flex items-center gap-2 text-[#3a2d28]">
                <span>🎉</span>
                <span>Event Planning</span>
              </div>

            </div>

            {/* BUTTONS */}

            <div className="flex flex-wrap gap-4">

              <Link to="/contact" className="btn-primary">
                Book Event
              </Link>

              <Link to="/gallery" className="btn-secondary">
                View Gallery
              </Link>

            </div>
          </motion.div>

          {/* RIGHT IMAGE */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >

            <div className="rounded-[40px] overflow-hidden shadow-2xl">

              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622"
                alt="Event Celebration"
                className="w-full h-[700px] object-cover"
              />

            </div>

            {/* Floating Cards */}

            <div className="absolute top-8 -left-6 bg-white rounded-2xl px-5 py-4 shadow-xl">
              🎈 1500+ Events
            </div>

            <div className="absolute bottom-10 -right-6 bg-white rounded-2xl px-5 py-4 shadow-xl">
              ⭐ 5 Star Rated
            </div>

            <div className="absolute top-1/2 -right-10 bg-white rounded-2xl px-5 py-4 shadow-xl">
              ❤️ Trusted Across Haryana
            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
};

export default EventsHero;
