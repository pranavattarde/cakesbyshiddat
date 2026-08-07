import { Routes, Route } from "react-router-dom";

import Cakes from "../pages/Cakes/Cakes";
import { ContentPage } from '../components/ContentPage';
import CakeDetails from '../pages/Cakes/CakeDetails';
import ContactForm from '../components/contact/ContactForm';
import ContactMap from '../components/contact/ContactMap';
import { HomeCakesSection } from '../components/Cakes/HomeCakesSection';

const NotFound = () => <main className="grid min-h-screen place-items-center bg-[#fff8f2] px-6 text-center"><div><h1 className="text-6xl text-[#3a2d28]" style={{ fontFamily: 'Playfair Display' }}>Page not found</h1><p className="mt-5 text-[#8a7a72]">The page you requested does not exist.</p></div></main>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ContentPage slug="home" insertChildrenAfter={1}><HomeCakesSection /></ContentPage>} />
      <Route path="/about" element={<ContentPage slug="about" />} />
      <Route path="/services" element={<ContentPage slug="services" />} />
      <Route path="/cakes" element={<Cakes />} />
      <Route path="/cakes/:slug" element={<CakeDetails />} />
      <Route path="/events" element={<ContentPage slug="events" />} />
      <Route path="/gallery" element={<ContentPage slug="gallery" />} />
      <Route path="/contact" element={<ContentPage slug="contact"><div id="contact-form"><ContactForm /></div><ContactMap /></ContentPage>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
