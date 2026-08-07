import { timeline } from "../../data/timelineData";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="py-32 bg-white">
      <div className="container-custom">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left Side Images */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <img
              src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3"
              alt=""
              className="rounded-[32px] h-[420px] object-cover"
            />

            <img
              src="https://images.unsplash.com/photo-1535254973040-607b474cb50d"
              alt=""
              className="rounded-[32px] h-[300px] mt-16 object-cover"
            />

            <img
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed"
              alt=""
              className="rounded-[32px] h-[280px] object-cover"
            />

            <img
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc"
              alt=""
              className="rounded-[32px] h-[400px] object-cover"
            />
          </motion.div>

          {/* Right Side Content */}

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="uppercase tracking-[5px] text-[#d7a88c] mb-4">
              About Us
            </p>

            <h2
              className="text-5xl md:text-6xl text-[#3a2d28] leading-tight"
              style={{
                fontFamily: "Playfair Display",
              }}
            >
              Crafting Celebrations With Shiddat
            </h2>

            <p className="mt-8 text-[#8a7a72] leading-8">
              Founded in 2022 by Navdeep Dua and Chitraa Dua,
              Cakes By Shiddat began as a passionate home bakery
              dedicated to creating memorable moments through
              handcrafted cakes.
            </p>

            <p className="mt-5 text-[#8a7a72] leading-8">
              Over the years, we expanded beyond cakes into
              decorations, themed events, mascot experiences,
              and complete event planning services, helping
              families and businesses celebrate life's most
              precious moments.
            </p>

            {/* Timeline */}

            <div className="mt-12 space-y-6">
              {timeline.map((item) => (
                <div
                  key={item.year}
                  className="flex items-center gap-5"
                >
                  <div className="w-20 text-[#d7a88c] font-semibold">
                    {item.year}
                  </div>

                  <div className="h-px flex-1 bg-[#ead7ce]" />

                  <div className="text-[#3a2d28]">
                    {item.title}
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-12 bg-[#d7a88c] text-white px-8 py-4 rounded-full hover:bg-[#c79a7f] transition">
              Learn More
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
