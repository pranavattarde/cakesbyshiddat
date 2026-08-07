import { motion } from "framer-motion";

const reasons = [
  {
    icon: "🎂",
    title: "Custom Designed Cakes",
    description:
      "Unique handcrafted cakes tailored to every celebration.",
  },
  {
    icon: "🎉",
    title: "Complete Event Management",
    description:
      "From planning to execution, we handle every detail.",
  },
  {
    icon: "🎈",
    title: "Decoration Experts",
    description:
      "Elegant setups designed to match your celebration theme.",
  },
  {
    icon: "🧸",
    title: "Mascot Experiences",
    description:
      "Interactive mascot services loved by children and families.",
  },
  {
    icon: "⭐",
    title: "Premium Quality",
    description:
      "Attention to detail and high-quality standards in everything we create.",
  },
  {
    icon: "❤️",
    title: "Personalized Experience",
    description:
      "Every celebration is customized around your vision and preferences.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-28 bg-[#fffaf6]">
      <div className="container-custom">

        <div className="text-center mb-20">
          <p className="section-subtitle">
            WHY CHOOSE US
          </p>

          <h2
            className="section-title"
            style={{
              fontFamily: "Playfair Display",
            }}
          >
            Creating Celebrations That Matter
          </h2>

          <p className="max-w-2xl mx-auto text-gray-500 mt-4">
            We combine creativity, quality, and experience
            to deliver celebrations that leave lasting memories.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="bg-white rounded-[32px] border border-[#f3e5dc] p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-4xl mb-5">
                {reason.icon}
              </div>

              <h3
                className="text-2xl text-[#3a2d28] mb-4"
                style={{
                  fontFamily: "Playfair Display",
                }}
              >
                {reason.title}
              </h3>

              <p className="text-gray-500 leading-7">
                {reason.description}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;