
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
    <section className="py-28 bg-[#fffaf6]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <p className="section-subtitle">
            CELEBRATIONS IN NUMBERS
          </p>

          <h2 className="section-title">
            Crafting Memories Since 2022
          </h2>

          <p className="max-w-2xl mx-auto text-gray-500 mt-4">
            Every cake, every decoration, and every event is
            crafted with care, creativity, and attention to detail.
          </p>
        </div>

        <div className="bg-white rounded-[40px] shadow-xl border border-[#f3e5dc] p-10 lg:p-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {stats.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
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
                        className="text-5xl lg:text-6xl text-[#3a2d28] mb-4"
                        style={{
                            fontFamily: "Playfair Display",
                        }}
                        >
                        {item.number}
                        {item.suffix}
                        </h3>

                <p className="text-gray-500 font-medium">
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
