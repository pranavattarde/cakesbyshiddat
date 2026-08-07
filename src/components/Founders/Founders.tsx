import { founders } from "../../data/founders";
import FounderCard from "./FounderCard";
import { Link } from "react-router-dom";

const Founders = () => {
  return (
    <section className="py-32 bg-[#fff8f2]">
      <div className="container-custom">

        <div className="text-center mb-20">
          <p className="uppercase tracking-[5px] text-[#d7a88c] mb-4">
            Meet Our Founders
          </p>

          <h2
            className="text-5xl text-[#3a2d28]"
            style={{
              fontFamily: "Playfair Display",
            }}
          >
            The Hearts Behind The Celebrations
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-[#8a7a72]">
            What started as a home bakery in 2022 has evolved
            into a complete celebration management brand driven
            by passion, creativity, and a commitment to making
            every moment unforgettable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {founders.map((founder) => (
            <FounderCard
              key={founder.name}
              {...founder}
            />
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/about"
            className="bg-[#d7a88c] text-white px-8 py-4 rounded-full"
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Founders;
