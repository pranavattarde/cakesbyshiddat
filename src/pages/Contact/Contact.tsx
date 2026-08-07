import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import ContactHero from "../../components/contact/ContactHero";
import ContactCards from "../../components/contact/ContactCards";
import ContactForm from "../../components/contact/ContactForm";
import WhatsAppBanner from "../../components/contact/WhatsAppBanner";
import ContactMap from "../../components/contact/ContactMap";
import ContactFAQ from "../../components/contact/ContactFAQ";
import ContactCTA from "../../components/contact/ContactCTA";
import PageTransition from "../../components/PageTransition";
import SEO from "../../components/SEO";

const Contact = () => {
  return (
    <PageTransition>
    <>
      <SEO title="Contact Us" path="/contact" description="Get in touch to order a custom cake or plan your next celebration." />
      <Navbar />

      <main>
        <ContactHero />
        <ContactCards />
        <ContactForm />
        <WhatsAppBanner />
        <ContactMap />
        <ContactFAQ />
        <ContactCTA />
      </main>

      <Footer />
    </>
    </PageTransition>
  );
};

export default Contact;
