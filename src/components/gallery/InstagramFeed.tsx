import { motion } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=1000",
  "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1000",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1000",
  "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1000",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000",
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1000",
];

const InstagramFeed = () => {
  return (
    <section className="py-28 bg-white">
      <div className="container-custom">

        {/* Heading */}

        <div className="text-center mb-16">
          <p className="section-subtitle">
            FOLLOW OUR JOURNEY
          </p>

          <h2 className="section-title">
            Moments Shared With Love
          </h2>

          <p className="max-w-2xl mx-auto text-gray-500 mt-4">
            Follow Cakes By Shiddat for the latest cakes,
            celebrations, event setups and behind-the-scenes moments.
          </p>
        </div>

        {/* Grid */}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

          {images.map((image, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -5,
              }}
              className="overflow-hidden rounded-[24px] group cursor-pointer"
            >
              <img
                src={image}
                alt="Instagram Post"
                loading="lazy"
                decoding="async"
                className="w-full h-[250px] object-cover transition duration-700 group-hover:scale-110"
              />
            </motion.div>
          ))}

        </div>

        {/* CTA */}

        <div className="text-center mt-12">

          <h3
            className="text-3xl text-[#3a2d28] mb-4"
            style={{
              fontFamily: "Playfair Display",
            }}
          >
            @cakes_by_shiddat_kurukshetra
          </h3>

          <p className="text-gray-500 mb-8">
            Follow us for daily inspiration and celebrations.
          </p>

          <a
                href="https://www.instagram.com/cakes_by_shiddat_kurukshetra"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#d7a88c] hover:bg-[#c9987a] transition-all duration-300 text-white font-medium shadow-lg"
                >
                Follow On Instagram
                </a>

        </div>

      </div>
    </section>
  );
};

export default InstagramFeed;