import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Priya Sharma",
    event: "Birthday Celebration",
    review:
      "The birthday setup exceeded our expectations. Every guest loved the decorations and attention to detail.",
  },
  {
    name: "Aman & Simran",
    event: "Wedding Decor",
    review:
      "The team transformed our venue into something magical. Everything was beautifully coordinated.",
  },
  {
    name: "Ritika Verma",
    event: "Baby Shower",
    review:
      "The decorations were absolutely stunning. The entire event looked exactly how we imagined it.",
  },
];

const EventTestimonials = () => {
  return (
    <section className="py-28 bg-[#fffaf6]">
      <div className="container-custom">

        <div className="text-center mb-20">
          <p className="section-subtitle">
            CLIENT LOVE
          </p>

          <h2 className="section-title">
            Celebrations Our Clients Remember
          </h2>

          <p className="max-w-3xl mx-auto text-gray-500 mt-4">
            Every successful event begins with trust and ends
            with unforgettable memories.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="bg-white border border-[#f3e5dc] rounded-[32px] p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex gap-1 mb-5">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="text-gray-600 leading-8 italic mb-8">
                "{item.review}"
              </p>

              <div>
                <h4
                  className="text-xl text-[#3a2d28]"
                  style={{
                    fontFamily: "Playfair Display",
                  }}
                >
                  {item.name}
                </h4>

                <p className="text-[#d7a88c] mt-1">
                  {item.event}
                </p>
              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default EventTestimonials;