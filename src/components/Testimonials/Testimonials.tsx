import { testimonials } from "../../data/testimonials";
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <p className="uppercase tracking-[4px] sm:tracking-[5px] text-[#d7a88c] font-semibold text-xs sm:text-sm mb-2 sm:mb-4">
            Client Love
          </p>

          <h2
            className="text-3xl sm:text-5xl lg:text-6xl text-[#3a2d28] font-bold"
            style={{
              fontFamily: "Playfair Display",
            }}
          >
            Stories From Our Celebrations
          </h2>

          <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-[#8a7a72] text-sm sm:text-base leading-relaxed">
            Every celebration tells a story. Here are a few
            words from families and clients who trusted us
            with their special moments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              {...testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
