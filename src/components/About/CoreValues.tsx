import { motion } from "framer-motion";

const values = [
  {
    icon: "🎨",
    title: "Creativity",
    description:
      "Every cake, decoration, and celebration is designed with originality and imagination.",
  },
  {
    icon: "⭐",
    title: "Quality",
    description:
      "We maintain the highest standards in our products, services, and customer experience.",
  },
  {
    icon: "🤝",
    title: "Trust",
    description:
      "Building lasting relationships through transparency, reliability, and consistency.",
  },
  {
    icon: "❤️",
    title: "Customer Happiness",
    description:
      "Nothing matters more than seeing our clients smile during their special moments.",
  },
];

const CoreValues = () => {
  return (
    <section className="py-28 bg-[#fffaf6]">
      <div className="container-custom">

        {/* Heading */}
        <div className="text-center mb-20">
          <p className="section-subtitle">
            OUR VALUES
          </p>

          <h2
            className="section-title"
            style={{
              fontFamily: "Playfair Display",
            }}
          >
            The Principles That Guide Us
          </h2>

          <p className="max-w-2xl mx-auto text-gray-500 mt-4">
            Every celebration we create is built upon values
            that define who we are and how we serve our clients.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="bg-white border border-[#f3e5dc] rounded-[32px] p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-[#d7a88c]/20 flex items-center justify-center mb-6 text-3xl">
                {value.icon}
              </div>

              <h3
                className="text-2xl text-[#3a2d28] mb-4"
                style={{
                  fontFamily: "Playfair Display",
                }}
              >
                {value.title}
              </h3>

              <p className="text-gray-500 leading-7">
                {value.description}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default CoreValues;