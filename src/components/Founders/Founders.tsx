import { founders } from "../../data/founders";
import FounderCard from "./FounderCard";
import { Link } from "react-router-dom";

const Founders = () => {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-[#fff8f2]">
      <div className="container-custom">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <p className="uppercase tracking-[4px] sm:tracking-[5px] text-[#d7a88c] font-semibold text-xs sm:text-sm mb-2 sm:mb-4">
            Meet Our Founders
          </p>

          <h2
            className="text-3xl sm:text-5xl lg:text-6xl text-[#3a2d28] font-bold"
            style={{
              fontFamily: "Playfair Display",
            }}
          >
            The Hearts Behind The Celebrations
          </h2>

          <p className="max-w-3xl mx-auto mt-4 sm:mt-6 text-[#8a7a72] text-sm sm:text-base leading-relaxed">
            What started as a home bakery in 2022 has evolved
            into a complete celebration management brand driven
            by passion, creativity, and a commitment to making
            every moment unforgettable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
          {founders.map((founder) => (
            <FounderCard
              key={founder.name}
              {...founder}
            />
          ))}
        </div>

        <div className="text-center mt-12 sm:mt-16">
          <Link
            to="/about"
            className="inline-block bg-[#d7a88c] hover:bg-[#c99a7d] text-white px-8 py-3.5 sm:py-4 rounded-full font-medium text-sm sm:text-base shadow-md transition hover:scale-105"
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Founders;
