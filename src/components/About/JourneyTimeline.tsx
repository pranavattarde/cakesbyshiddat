import { motion } from "framer-motion";

const timelineData = [
  {
    year: "2022",
    title: "Home Bakery Launch",
    description:
      "Started Cakes By Shiddat with handcrafted cakes made from home.",
  },
  {
    year: "2023",
    title: "Custom Cake Studio",
    description:
      "Expanded cake designs with premium custom and themed creations.",
  },
  {
    year: "2024",
    title: "Mascot Experiences",
    description:
      "Added mascot services and entertainment experiences for celebrations.",
  },
  {
    year: "2025",
    title: "Event Decoration Services",
    description:
      "Introduced event setups, balloon decorations, and themed celebrations.",
  },
  {
    year: "Today",
    title: "Complete Celebration Management",
    description:
      "Providing cakes, decorations, mascots, event planning, and unforgettable experiences.",
  },
];

const JourneyTimeline = () => {
  return (
    <section className="py-28 bg-white">
      <div className="container-custom">

        <div className="text-center mb-20">
          <p className="section-subtitle">
            OUR JOURNEY
          </p>

          <h2 className="section-title">
            Growing With Every Celebration
          </h2>

          <p className="max-w-2xl mx-auto text-gray-500 mt-4">
            Every year brought new experiences, bigger dreams,
            and more reasons to celebrate.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">

          {/* Center Line */}
          <div className="absolute left-1/2 top-0 h-full w-[2px] bg-[#e9d6cb] -translate-x-1/2" />

          {timelineData.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className={`relative flex items-center mb-16 ${
                index % 2 === 0
                  ? "justify-start"
                  : "justify-end"
              }`}
            >

              <div className="w-[45%] bg-[#fffaf6] border border-[#f1dfd5] rounded-3xl p-6 shadow-lg">

                <span className="text-[#d7a88c] font-semibold tracking-wider">
                  {item.year}
                </span>

                <h3
                  className="text-2xl mt-2 mb-3 text-[#3a2d28]"
                  style={{
                    fontFamily: "Playfair Display",
                  }}
                >
                  {item.title}
                </h3>

                <p className="text-gray-500 leading-7">
                  {item.description}
                </p>

              </div>

              {/* Circle */}
              <div className="absolute left-1/2 w-5 h-5 bg-[#d7a88c] rounded-full border-4 border-white -translate-x-1/2" />

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;