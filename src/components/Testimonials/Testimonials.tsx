import { testimonials } from "../../data/testimonials";
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  return (
    <section className="py-32 bg-white">
      <div className="container-custom">

        <div className="text-center mb-20">
          <p className="uppercase tracking-[5px] text-[#d7a88c] mb-4">
            Client Love
          </p>

          <h2
            className="text-5xl text-[#3a2d28]"
            style={{
              fontFamily: "Playfair Display",
            }}
          >
            Stories From Our Celebrations
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-[#8a7a72]">
            Every celebration tells a story. Here are a few
            words from families and clients who trusted us
            with their special moments.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
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
