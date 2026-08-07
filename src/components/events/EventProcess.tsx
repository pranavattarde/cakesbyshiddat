import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Consultation",
    icon: "💬",
    description:
      "We discuss your event, vision, budget, guest count, and celebration goals.",
  },
  {
    number: "02",
    title: "Theme Planning",
    icon: "🎨",
    description:
      "Our team creates a personalized theme, decoration concept, and event plan.",
  },
  {
    number: "03",
    title: "Setup & Execution",
    icon: "🎈",
    description:
      "We handle decorations, props, mascots, balloons, and every event detail.",
  },
  {
    number: "04",
    title: "Celebrate",
    icon: "🎉",
    description:
      "Enjoy your event while we ensure everything runs smoothly and beautifully.",
  },
];

const EventProcess = () => {
  return (
    <section className="py-28 bg-[#fffaf6]">
      <div className="container-custom">

        <div className="text-center mb-20">
          <p className="section-subtitle">
            HOW WE WORK
          </p>

          <h2 className="section-title">
            Bringing Your Vision To Life
          </h2>

          <p className="max-w-3xl mx-auto text-gray-500 mt-4">
            Every successful celebration follows a carefully
            planned process designed to deliver a stress-free
            and unforgettable experience.
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
              className="bg-white border border-[#f3e5dc] rounded-[32px] p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">

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

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default EventProcess;