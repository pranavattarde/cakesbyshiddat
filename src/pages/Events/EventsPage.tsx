import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import EventsHero from "./components/EventsHero";
import EventCategories from "../../components/events/EventCategories";
import FeaturedEventGallery from "../../components/events/FeaturedEventGallery";
import EventProcess from "../../components/events/EventProcess";
import WhyChooseEvents from "../../components/events/WhyChooseEvents";
import EventTestimonials from "../../components/events/EventTestimonials";
import EventFAQ from "../../components/events/EventFAQ";
import EventCTA from "../../components/events/EventCTA";
import PageTransition from "../../components/PageTransition";
import SEO from "../../components/SEO";
const EventsPage = () => {
  return (
    <PageTransition>
    <>
      <SEO title="Events & Celebrations" path="/events" description="Thoughtful event styling and celebration planning by Cakes By Shiddat." />
      <Navbar />

      <EventsHero />

      <EventCategories />

      <FeaturedEventGallery />

      <EventProcess />

      <WhyChooseEvents />

      <EventTestimonials />

      <EventFAQ />

    <EventCTA />

      <Footer />
    </>
    </PageTransition>
  );
};

export default EventsPage;
