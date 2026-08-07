import { motion } from "framer-motion";

const OurStory = () => {
  return (
    <section className="py-28 bg-[#fffaf6]">
      <div className="container-custom">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >
            <img
              src="https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=800"
              alt=""
              className="rounded-[30px] h-[500px] object-cover"
            />

            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800"
                alt=""
                className="rounded-[30px] h-[240px] w-full object-cover"
              />

              <img
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800"
                alt=""
                className="rounded-[30px] h-[240px] w-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-subtitle">
              OUR STORY
            </p>

            <h2
              className="section-title mb-8"
              style={{ fontFamily: "Playfair Display" }}
            >
              From A Home Bakery To A Celebration Brand
            </h2>

            <div className="space-y-6 text-gray-600 leading-8 text-lg">

              <p>
                Cakes By Shiddat was founded in 2022 by
                <strong className="text-[#3a2d28]">
                  {" "}Navdeep Dua{" "}
                </strong>
                and
                <strong className="text-[#3a2d28]">
                  {" "}Chitra Dua{" "}
                </strong>
                with a simple vision —
                creating unforgettable memories through
                handcrafted cakes and heartfelt celebrations.
              </p>

              <p>
                What started as a passionate home bakery quickly
                gained the trust of families and clients who loved
                our attention to detail, creativity, and personal touch.
              </p>

              <p>
                As demand grew, so did our vision.
                We expanded beyond cakes into event decorations,
                themed celebrations, mascot experiences,
                anniversary setups, baby showers,
                wedding planning, and complete event management.
              </p>

              <p>
                Today, Cakes By Shiddat proudly helps families,
                couples, and businesses across Haryana create
                moments that are remembered for a lifetime.
              </p>

            </div>

            <div className="flex gap-10 mt-10">

              <div>
                <h3
                  className="text-4xl text-[#3a2d28]"
                  style={{ fontFamily: "Playfair Display" }}
                >
                  2022
                </h3>
                <p className="text-gray-500">
                  Founded
                </p>
              </div>

              <div>
                <h3
                  className="text-4xl text-[#3a2d28]"
                  style={{ fontFamily: "Playfair Display" }}
                >
                  1500+
                </h3>
                <p className="text-gray-500">
                  Celebrations
                </p>
              </div>

              <div>
                <h3
                  className="text-4xl text-[#3a2d28]"
                  style={{ fontFamily: "Playfair Display" }}
                >
                  1000+
                </h3>
                <p className="text-gray-500">
                  Happy Clients
                </p>
              </div>

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default OurStory;