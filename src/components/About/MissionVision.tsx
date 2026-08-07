import { motion } from "framer-motion";

const MissionVision = () => {
  return (
    <section className="py-28 bg-white">
      <div className="container-custom">

        <div className="text-center mb-20">
          <p className="section-subtitle">
            OUR PURPOSE
          </p>

          <h2
            className="section-title"
            style={{
              fontFamily: "Playfair Display",
            }}
          >
            Driven By Passion & Purpose
          </h2>

          <p className="max-w-2xl mx-auto text-gray-500 mt-4">
            Every celebration we create is guided by our commitment
            to quality, creativity, and unforgettable experiences.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Mission */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#fffaf6] border border-[#f3e5dc] rounded-[40px] p-10 shadow-lg"
          >
            <div className="w-16 h-16 rounded-full bg-[#d7a88c]/20 flex items-center justify-center mb-6">
              <span className="text-3xl">🎯</span>
            </div>

            <h3
              className="text-4xl text-[#3a2d28] mb-6"
              style={{
                fontFamily: "Playfair Display",
              }}
            >
              Our Mission
            </h3>

            <p className="text-gray-600 leading-8 text-lg">
              To create unforgettable celebrations through
              beautifully crafted cakes, exceptional decorations,
              creative experiences, and personalized event
              management that brings people together and creates
              lifelong memories.
            </p>
          </motion.div>

          {/* Vision */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#fffaf6] border border-[#f3e5dc] rounded-[40px] p-10 shadow-lg"
          >
            <div className="w-16 h-16 rounded-full bg-[#d7a88c]/20 flex items-center justify-center mb-6">
              <span className="text-3xl">✨</span>
            </div>

            <h3
              className="text-4xl text-[#3a2d28] mb-6"
              style={{
                fontFamily: "Playfair Display",
              }}
            >
              Our Vision
            </h3>

            <p className="text-gray-600 leading-8 text-lg">
              To become Haryana's most trusted celebration
              management brand by continuously delivering
              innovative experiences, premium quality, and
              memorable moments that exceed expectations.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default MissionVision;