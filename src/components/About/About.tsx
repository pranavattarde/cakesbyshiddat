import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import AboutHero from "../../components/About/AboutHero";
import OurStory from "../../components/About/OurStory";
import JourneyTimeline from "../../components/About/JourneyTimeline";
import FoundersSection from "../../components/About/FoundersSection";
import MissionVision from "../../components/About/MissionVision";
import CoreValues from "../../components/About/CoreValues";
import TeamSection from "../../components/About/TeamSection";
import WhyChooseUs from "../../components/About/WhyChooseUs";
import AboutCTA from "../../components/About/AboutCTA";
import PageTransition from "../PageTransition";
import SEO from "../SEO";

const About = () => {
  return (
    <PageTransition>
    <>
      <SEO title="About Us" path="/about" description="Meet the team and story behind Cakes By Shiddat." />
      <Navbar />

      <AboutHero />

      <OurStory />
    
     <JourneyTimeline />

     <FoundersSection />

     <MissionVision />

     <CoreValues />

     <TeamSection />

     <WhyChooseUs />

     <AboutCTA />

      <Footer />
    </>
    </PageTransition>
  );
};

export default About;
