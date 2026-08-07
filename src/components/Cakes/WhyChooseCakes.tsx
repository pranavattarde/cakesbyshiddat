import { motion } from "framer-motion";

const features = [
  {
    icon: "🥛",
    title: "Premium Ingredients",
    description:
      "Every cake is made using carefully selected premium ingredients for exceptional taste and quality.",
  },
  {
    icon: "🎂",
    title: "Freshly Baked",
    description:
      "Our cakes are freshly prepared for every order to ensure maximum freshness and flavor.",
  },
  {
    icon: "🎨",
    title: "Custom Designs",
    description:
      "From elegant wedding cakes to themed birthday creations, every design is tailored to your vision.",
  },
  {
    icon: "✨",
    title: "Attention To Detail",
    description:
      "Every decoration, finish, and detail is crafted with precision and care.",
  },
  {
    icon: "🚚",
    title: "Reliable Delivery",
    description:
      "Timely delivery and professional handling ensure your cake arrives celebration-ready.",
  },
  {
    icon: "❤️",
    title: "1000+ Happy Clients",
    description:
      "Trusted by families and businesses who continue to celebrate with Cakes By Shiddat.",
  },
];

const WhyChooseCakes = () => {
  return (
    <section className="py-28 bg-[#fffaf6]">
      <div className="container-custom">

        <div className="text-center mb-20">
          <p className="section-subtitle">
            WHY OUR CAKES
          </p>

          <h2 className="section-title">
            Crafted With Passion & Perfection
          </h2>

          <p className="max-w-2xl mx-auto text-gray-500 mt-4">
            Every cake is more than a dessert —
            it's a centerpiece designed to make your celebration unforgettable.
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
              className="bg-white rounded-[32px] border border-[#f3e5dc] p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
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

export default WhyChooseCakes;