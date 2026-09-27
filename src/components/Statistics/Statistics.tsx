import { motion } from "framer-motion";

const stats = [
  {
    number: 1500,
    suffix: "+",
    label: "Events Completed",
  },
  {
    number: 1000,
    suffix: "+",
    label: "Happy Clients",
  },
  {
    number: 4,
    suffix: "+",
    label: "Years Experience",
  },
  {
    number: 5,
    suffix: "★",
    label: "Customer Rating",
  },
];

const Statistics = () => {
  return (
    <section className="py-16 sm:py-24 lg:py-28 bg-[#fffaf6]">
      <div className="container-custom">
        <div className="text-center mb-12 sm:mb-16">
          <p className="uppercase tracking-[4px] sm:tracking-[5px] text-[#d7a88c] font-semibold text-xs sm:text-sm mb-2 sm:mb-3">
            CELEBRATIONS IN NUMBERS
          </p>

          <h2
            className="text-3xl sm:text-5xl lg:text-6xl text-[#3a2d28] font-bold"
            style={{ fontFamily: 'Playfair Display' }}
          >
            Crafting Memories Since 2022
          </h2>

          <p className="max-w-2xl mx-auto text-[#8a7a72] mt-4 text-sm sm:text-base leading-relaxed">
            Every cake, every decoration, and every event is
            crafted with care, creativity, and attention to detail.
          </p>
        </div>

        <div className="bg-white rounded-[28px] sm:rounded-[40px] shadow-xl border border-[#f3e5dc] p-6 sm:p-10 lg:p-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
            {stats.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className={`text-center relative ${
                  index !== stats.length - 1
                    ? "lg:border-r lg:border-[#efe4dc]"
                    : ""
                }`}
              >
                <h3
                  className="text-3xl sm:text-5xl lg:text-6xl text-[#3a2d28] mb-2 sm:mb-4 font-bold"
                  style={{
                    fontFamily: "Playfair Display",
                  }}
                >
                  {item.number}
                  {item.suffix}
                </h3>

                <p className="text-xs sm:text-sm text-[#8a7a72] font-medium">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
