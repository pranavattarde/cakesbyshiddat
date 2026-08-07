import { motion } from "framer-motion";

const galleryImages = [
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1000",
  "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1000",
  "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=1000",
  "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=1000",
  "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=1000",
  "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=1000",
  "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=1000",
  "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=1000",
];

const CakeGallery = () => {
  return (
    <section className="py-28 bg-[#fffaf6]">
      <div className="container-custom">

        {/* Heading */}
        <div className="text-center mb-20">
          <p className="section-subtitle">
            CAKE GALLERY
          </p>

          <h2 className="section-title">
            A Collection Of Sweet Creations
          </h2>

          <p className="max-w-2xl mx-auto text-gray-500 mt-4">
            Browse through some of our handcrafted cakes,
            designed to make every celebration unforgettable.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">

          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
              }}
              className="overflow-hidden rounded-[30px] shadow-lg break-inside-avoid group cursor-pointer"
            >
              <img
                src={image}
                alt={`Cake ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full object-cover transition duration-700 group-hover:scale-110"
              />
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default CakeGallery;