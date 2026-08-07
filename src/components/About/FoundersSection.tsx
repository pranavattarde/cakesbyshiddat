import { motion } from "framer-motion";

const founders = [
  {
    name: "Navdeep Dua",
    role: "Founder",
    description:
      "Leading the vision and growth of Cakes By Shiddat, Navdeep focuses on delivering exceptional experiences and ensuring every celebration is executed flawlessly.",
  },
  {
    name: "Chitraa Dua",
    role: "Co-Founder",
    description:
      "The creative force behind Cakes By Shiddat, Chitraa brings imagination, artistry, and attention to detail to every cake and celebration.",
  },
];

const FoundersSection = () => {
  return (
    <section className="py-28 bg-[#fffaf6]">
      <div className="container-custom">

        <div className="text-center mb-20">
          <p className="section-subtitle">
            MEET THE FOUNDERS
          </p>

          <h2
            className="section-title"
            style={{
              fontFamily: "Playfair Display",
            }}
          >
            The Hearts Behind Cakes By Shiddat
          </h2>

          <p className="max-w-2xl mx-auto text-gray-500 mt-4">
            What began as a passion for creating memorable celebrations
            has grown into a trusted brand dedicated to turning special
            moments into lifelong memories.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
              }}
              className="bg-white rounded-[40px] shadow-lg border border-[#f3e5dc] overflow-hidden hover:shadow-2xl transition-all duration-500"
            >

              {/* Placeholder Image */}
              <div className="h-[320px] bg-gradient-to-br from-[#f5e7de] to-[#fffaf6] flex items-center justify-center">

                <div className="text-center">
                  <div className="w-28 h-28 rounded-full bg-[#d7a88c] flex items-center justify-center mx-auto mb-5">
                    <span
                      className="text-4xl text-white"
                      style={{
                        fontFamily: "Playfair Display",
                      }}
                    >
                      {founder.name.charAt(0)}
                    </span>
                  </div>

                  <p className="text-[#8a7a72]">
                    Founder Portrait
                  </p>

                  <p className="text-sm text-gray-400">
                    Coming Soon
                  </p>
                </div>

              </div>

              {/* Content */}
              <div className="p-10">

                <h3
                  className="text-3xl text-[#3a2d28]"
                  style={{
                    fontFamily: "Playfair Display",
                  }}
                >
                  {founder.name}
                </h3>

                <p className="text-[#d7a88c] font-medium mt-2">
                  {founder.role}
                </p>

                <p className="text-gray-500 mt-6 leading-8">
                  {founder.description}
                </p>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default FoundersSection;