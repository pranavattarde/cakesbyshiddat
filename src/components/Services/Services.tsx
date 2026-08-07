import ServiceCard from "./ServiceCard";
import { services } from "../../data/servicesData";

const Services = () => {
  return <section className="py-28 bg-[#fff8f2]"><div className="container-custom"><div className="text-center mb-16"><p className="uppercase tracking-[4px] text-[#d7a88c] mb-4">Our Services</p><h2 className="text-5xl text-[#3a2d28]" style={{ fontFamily: "Playfair Display" }}>Crafted With Love & Shiddat</h2><p className="text-[#8a7a72] mt-5 max-w-2xl mx-auto">From luxury cakes to complete event experiences, we make every celebration unforgettable.</p></div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{services.map((service) => <ServiceCard key={service.title} title={service.title} image={service.image} />)}</div></div></section>;
};

export default Services;
