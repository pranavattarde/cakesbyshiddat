import ServiceCard from "./ServiceCard";
import { services } from "../../data/servicesData";

const Services = () => {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-[#fffaf6] border-y border-[#f0dfd7]">
      <div className="container-custom">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <p className="uppercase tracking-[4px] sm:tracking-[5px] text-[#d7a88c] font-semibold text-xs sm:text-sm mb-2 sm:mb-3">
            Comprehensive Offerings
          </p>
          <h2
            className="text-3xl sm:text-5xl lg:text-6xl text-[#3a2d28] font-bold"
            style={{ fontFamily: "Playfair Display" }}
          >
            Crafted With Love & Shiddat
          </h2>
          <p className="text-[#8a7a72] mt-4 sm:mt-5 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed">
            From bespoke luxury designer cakes to complete themed event setups and joyful mascot shows, we make every milestone unforgettable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              subtitle={service.subtitle}
              image={service.image}
              link={service.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
