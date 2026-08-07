import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import { featuredEvents } from "../../data/featuredEvents";

const FeaturedEvents = () => {
  return <section className="py-32 bg-white"><div className="container-custom"><div className="text-center mb-20"><p className="uppercase tracking-[5px] text-[#d7a88c] mb-4">Event Experiences</p><h2 className="text-5xl text-[#3a2d28]" style={{ fontFamily: "Playfair Display" }}>Creating Moments Worth Remembering</h2><p className="text-[#8a7a72] mt-6 max-w-2xl mx-auto">From intimate celebrations to grand events, we transform every occasion into an unforgettable experience.</p></div><div className="grid md:grid-cols-2 gap-8">{featuredEvents.map((event) => <EventCard key={event.id} {...event} />)}</div><div className="text-center mt-16"><Link to="/events" className="bg-[#d7a88c] text-white px-8 py-4 rounded-full">View All Events</Link></div></div></section>;
};
export default FeaturedEvents;
