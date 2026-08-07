import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const galleryImages = [
  {
    title: "Wedding Decor",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200",
    height: "h-[520px]",
  },
  {
    title: "Mascot Experience",
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1200",
    height: "h-[250px]",
  },
  {
    title: "Baby Shower",
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1200",
    height: "h-[300px]",
  },
  {
    title: "Birthday Setup",
    image:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1200",
    height: "h-[420px]",
  },
  {
    title: "Balloon Decoration",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200",
    height: "h-[250px]",
  },
  {
    title: "Stage Decoration",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200",
    height: "h-[420px]",
  },
];

const FeaturedEventGallery = () => {
  return (
    <section className="py-28 bg-white">
      <div className="container-custom">

        {/* Heading */}

        <div className="text-center mb-20">
          <p className="section-subtitle">
            EVENT GALLERY
          </p>

          <h2 className="section-title">
            Moments We Have Created
          </h2>

          <p className="max-w-3xl mx-auto text-gray-500 mt-4">
            Explore some of our most memorable celebrations,
            decorations, themed setups and event experiences.
          </p>
        </div>

        {/* Masonry Layout */}

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">

          {galleryImages.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
              }}
              className="relative overflow-hidden rounded-[30px] break-inside-avoid group cursor-pointer shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className={`w-full object-cover ${item.height} transition duration-700 group-hover:scale-110`}
              />

              {/* Overlay */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Title */}

              <div className="absolute bottom-6 left-6">
                <h3
                  className="text-white text-2xl lg:text-3xl"
                  style={{
                    fontFamily: "Playfair Display",
                  }}
                >
                  {item.title}
                </h3>
              </div>

            </motion.div>
          ))}

        </div>

        {/* CTA */}

        <div className="text-center mt-16">
          <Link to="/gallery" className="bg-[#d7a88c] hover:bg-[#c9987a] transition-all duration-300 text-white px-8 py-4 rounded-full font-medium shadow-lg">
            View Full Gallery
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedEventGallery;
