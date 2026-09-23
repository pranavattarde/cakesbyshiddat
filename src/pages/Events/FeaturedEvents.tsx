import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import { featuredEvents } from "../../data/featuredEvents";

const FeaturedEvents = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#fffdfa] border-b border-[#f0dfd7]">
      <div className="container-custom">
        <div className="text-center mb-16 sm:mb-20">
          <p className="uppercase tracking-[5px] text-[#d7a88c] font-semibold text-xs sm:text-sm mb-3">
            Grand Celebrations
          </p>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl text-[#3a2d28] font-bold"
            style={{ fontFamily: "Playfair Display" }}
          >
            Creating Moments Worth Remembering
          </h2>
          <p className="text-[#8a7a72] mt-5 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            From intimate romantic setups to lavish wedding stages, themed birthdays, and memorable milestones, we turn every occasion into a masterpiece.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>

        <div className="text-center mt-14 sm:mt-16">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 rounded-full bg-[#d7a88c] hover:bg-[#c99a7d] text-white px-9 py-4 font-medium shadow-md transition hover:scale-105"
          >
            <span>Explore All Event Services & Packages</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
