import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Services from "../../components/Services/Services";
import About from "../About/AboutPreview";
import FeaturedCakes from "../Cakes/FeaturedCakes";
import FeaturedEvents from "../../pages/Events/FeaturedEvents";
import Founders from "../../components/Founders/Founders";
import Testimonials from "../../components/Testimonials/Testimonials";
import LatestCelebrations from "../../components/LatestCelebrations/LatestCelebrations";
import BookingCTA from "../../components/CTA/BookingCTA";
import Footer from "../../components/Footer/Footer";
import Statistics from "../../components/Statistics/Statistics";
import PageTransition from "../../components/PageTransition";
import SEO, { LocalBusinessSchema } from "../../components/SEO";

const Home = () => {
  return (
    <PageTransition>
    <>
      <SEO title="Luxury Cakes & Celebrations" path="/" description="Custom cakes and beautifully planned celebrations by Cakes By Shiddat in Haryana." />
      <LocalBusinessSchema />
      <Navbar />
      <Hero />
      <Services />
      <About />
      <FeaturedCakes />
      <FeaturedEvents />
      <Statistics />
      <Founders />
      <Testimonials />
      <LatestCelebrations />
      <BookingCTA />
      <Footer />
    </>
    </PageTransition>
  );
};

export default Home;
