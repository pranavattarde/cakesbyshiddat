import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Consultation",
    description:
      "Share your occasion, theme, inspiration, and cake requirements with us.",
    icon: "💬",
  },
  {
    number: "02",
    title: "Design Discussion",
    description:
      "We work together to finalize the perfect design, flavor, size, and details.",
    icon: "🎨",
  },
  {
    number: "03",
    title: "Cake Creation",
    description:
      "Our team carefully crafts your cake using premium ingredients and attention to detail.",
    icon: "🎂",
  },
  {
    number: "04",
    title: "Delivery & Celebration",
    description:
      "Receive your cake on time and enjoy a memorable celebration with your loved ones.",
    icon: "✨",
  },
];

const CakeProcess = () => {
  return (
    <section className="py-28 bg-white">
      <div className="container-custom">

        <div className="text-center mb-20">
          <p className="section-subtitle">
            HOW IT WORKS
          </p>

          <h2 className="section-title">
            Your Cake Journey
          </h2>

          <p className="max-w-2xl mx-auto text-gray-500 mt-4">
            From the first idea to the final celebration,
            we make the process simple, enjoyable, and personalized.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="relative"
            >

              <div className="bg-[#fffaf6] border border-[#f3e5dc] rounded-[32px] p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-300">

                <div className="flex justify-between items-center mb-6">

                  <div className="w-16 h-16 rounded-full bg-[#d7a88c]/20 flex items-center justify-center text-3xl">
                    {step.icon}
                  </div>

                  <span className="text-[#d7a88c] text-xl font-semibold">
                    {step.number}
                  </span>

                </div>

                <h3
                  className="text-2xl text-[#3a2d28] mb-4"
                  style={{
                    fontFamily: "Playfair Display",
                  }}
                >
                  {step.title}
                </h3>

                <p className="text-gray-500 leading-7">
                  {step.description}
                </p>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default CakeProcess;