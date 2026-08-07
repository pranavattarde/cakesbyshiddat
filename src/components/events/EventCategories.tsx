import { motion } from "framer-motion";

const categories = [
  {
    title: "Birthday Celebrations",
    description:
      "Custom themed birthdays, balloon decoration and memorable party setups.",
    image:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3",
  },
  {
    title: "Wedding Events",
    description:
      "Elegant wedding decor, stage setups and unforgettable celebrations.",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
  },
  {
    title: "Baby Showers",
    description:
      "Beautiful baby shower themes, welcome boards and decorations.",
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba",
  },
  {
    title: "Anniversary Events",
    description:
      "Romantic anniversary setups crafted for memorable moments.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552",
  },
  {
    title: "Mascot Experiences",
    description:
      "Interactive mascot entries and entertainment loved by children.",
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74",
  },
  {
    title: "Corporate Events",
    description:
      "Professional event planning for launches, meetings and celebrations.",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865",
  },
];

const EventCategories = () => {
  return (
    <section className="py-28 bg-[#fffaf6]">
      <div className="container-custom">

        {/* Heading */}

        <div className="text-center mb-16">
          <p className="section-subtitle">
            OUR SERVICES
          </p>

          <h2 className="section-title">
            Celebrations For Every Occasion
          </h2>

          <p className="max-w-3xl mx-auto text-gray-500 mt-4">
            From intimate family gatherings to grand celebrations,
            Cakes By Shiddat delivers memorable experiences tailored
            to every occasion.
          </p>
        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {categories.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -10,
              }}
              className="bg-white rounded-[28px] overflow-hidden border border-[#f3e5dc] shadow-lg"
            >
              {/* Image */}

              <div className="overflow-hidden h-72">
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  whileHover={{
                    scale: 1.08,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                />
              </div>

              {/* Content */}

              <div className="p-7">
                <h3
                  className="text-3xl text-[#3a2d28] mb-3"
                  style={{
                    fontFamily: "Playfair Display",
                  }}
                >
                  {item.title}
                </h3>

                <p className="text-gray-500 mb-5">
                  {item.description}
                </p>

                <button className="text-[#d4a27f] font-medium hover:translate-x-1 transition-all">
                  Explore →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventCategories;