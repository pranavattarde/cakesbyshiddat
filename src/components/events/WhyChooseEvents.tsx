import { motion } from "framer-motion";

const features = [
  {
    icon: "🎨",
    title: "Custom Themes",
    description:
      "Every celebration is uniquely designed around your vision and style.",
  },
  {
    icon: "🎈",
    title: "Professional Decoration",
    description:
      "Premium balloon decor, stage setups, welcome boards, and event styling.",
  },
  {
    icon: "🧸",
    title: "Mascot Experiences",
    description:
      "Interactive mascot entries that create unforgettable moments for children.",
  },
  {
    icon: "📋",
    title: "End-To-End Planning",
    description:
      "From concept to execution, we manage every detail of your celebration.",
  },
  {
    icon: "✨",
    title: "Attention To Detail",
    description:
      "Every decoration, color, and setup is carefully crafted to perfection.",
  },
  {
    icon: "❤️",
    title: "1500+ Successful Events",
    description:
      "Trusted by families and businesses for memorable celebrations since 2022.",
  },
];

const WhyChooseEvents = () => {
  return (
    <section className="py-28 bg-white">
      <div className="container-custom">

        <div className="text-center mb-20">
          <p className="section-subtitle">
            WHY CHOOSE US
          </p>

          <h2 className="section-title">
            Creating Celebrations That Leave Memories
          </h2>

          <p className="max-w-3xl mx-auto text-gray-500 mt-4">
            We combine creativity, planning, and execution
            to deliver celebrations that people remember long after they end.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="bg-[#fffaf6] border border-[#f3e5dc] rounded-[32px] p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-4xl mb-5">
                {feature.icon}
              </div>

              <h3
                className="text-2xl text-[#3a2d28] mb-4"
                style={{
                  fontFamily: "Playfair Display",
                }}
              >
                {feature.title}
              </h3>

              <p className="text-gray-500 leading-7">
                {feature.description}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default WhyChooseEvents;