import { timeline } from "../../data/timelineData";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center">
          {/* Left Side Images */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-3 sm:gap-4"
          >
            <img
              src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3"
              alt="Cakes By Shiddat artisanal cake creation"
              loading="lazy"
              className="rounded-[24px] sm:rounded-[32px] h-52 xs:h-64 sm:h-80 lg:h-[380px] w-full object-cover shadow-sm"
            />

            <img
              src="https://images.unsplash.com/photo-1535254973040-607b474cb50d"
              alt="Cakes By Shiddat festive floral cake"
              loading="lazy"
              className="rounded-[24px] sm:rounded-[32px] h-44 xs:h-52 sm:h-64 lg:h-[300px] mt-6 sm:mt-12 lg:mt-16 w-full object-cover shadow-sm"
            />

            <img
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed"
              alt="Cakes By Shiddat celebration event decor"
              loading="lazy"
              className="rounded-[24px] sm:rounded-[32px] h-40 xs:h-48 sm:h-60 lg:h-[280px] w-full object-cover shadow-sm"
            />

            <img
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc"
              alt="Cakes By Shiddat milestone celebration"
              loading="lazy"
              className="rounded-[24px] sm:rounded-[32px] h-52 xs:h-60 sm:h-72 lg:h-[360px] w-full object-cover shadow-sm"
            />
          </motion.div>

          {/* Right Side Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="uppercase tracking-[4px] sm:tracking-[5px] text-[#d7a88c] font-semibold text-xs sm:text-sm mb-3 sm:mb-4">
              About Us
            </p>

            <h2
              className="text-3xl sm:text-5xl lg:text-6xl text-[#3a2d28] font-bold leading-tight"
              style={{ fontFamily: "Playfair Display" }}
            >
              Crafting Celebrations With Shiddat
            </h2>

            <p className="mt-5 sm:mt-8 text-sm sm:text-base text-[#8a7a72] leading-relaxed">
              Founded in 2022 by Navdeep Dua and Chitraa Dua, Cakes By Shiddat began as a passionate home bakery dedicated to creating memorable moments through handcrafted cakes.
            </p>

            <p className="mt-4 text-sm sm:text-base text-[#8a7a72] leading-relaxed">
              Over the years, we expanded beyond cakes into decorations, themed events, mascot experiences, and complete event planning services, helping families and businesses celebrate life's most precious moments.
            </p>

            {/* Timeline */}
            <div className="mt-8 sm:mt-12 space-y-4 sm:space-y-6">
              {timeline.map((item) => (
                <div key={item.year} className="flex items-center gap-3 sm:gap-5">
                  <div className="w-16 sm:w-20 text-sm sm:text-base text-[#d7a88c] font-semibold shrink-0">
                    {item.year}
                  </div>
                  <div className="h-px flex-1 bg-[#ead7ce]" />
                  <div className="text-xs sm:text-base text-[#3a2d28] font-medium">
                    {item.title}
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="inline-block mt-8 sm:mt-12 bg-[#d7a88c] hover:bg-[#c99a7d] text-white px-8 py-3.5 sm:py-4 rounded-full font-medium text-sm sm:text-base transition shadow-md hover:scale-105"
            >
              Learn More About Us
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
