import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import GalleryHero from "../../components/gallery/GalleryHero";
import GalleryFilters from "../../components/gallery/GalleryFilters";
import MasonryGallery from "../../components/gallery/MasonryGallery";
import FeaturedProjects from "../../components/gallery/FeaturedProjects";
import InstagramFeed from "../../components/gallery/InstagramFeed";
import GalleryCTA from "../../components/gallery/GalleryCTA";
import PageTransition from "../../components/PageTransition";
import SEO from "../../components/SEO";


const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  return (
    <PageTransition>
    <>
      <SEO title="Celebration Gallery" path="/gallery" description="Browse cakes, events, and sweet celebration moments from Cakes By Shiddat." />
      <Navbar />

      <main>
        <GalleryHero />
        <GalleryFilters
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <MasonryGallery
          activeFilter={activeFilter}
        />
        <FeaturedProjects />
        <InstagramFeed />
        <GalleryCTA />
      </main>

      <Footer />
    </>
    </PageTransition>
  );
};

export default Gallery;
