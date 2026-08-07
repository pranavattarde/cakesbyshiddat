import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GalleryLightbox from "./GalleryLightbox";

interface MasonryGalleryProps {
  activeFilter: string;
}

const galleryItems = [
  {
    title: "Luxury Wedding Cake",
    category: "Cakes",
    image:
      "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=1200",
  },
  {
    title: "Birthday Celebration",
    category: "Birthdays",
    image:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1200",
  },
  {
    title: "Wedding Decoration",
    category: "Weddings",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200",
  },
  {
    title: "Baby Shower Theme",
    category: "Baby Showers",
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1200",
  },
  {
    title: "Mascot Experience",
    category: "Mascots",
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1200",
  },
  {
    title: "Corporate Event",
    category: "Corporate",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200",
  },
  {
    title: "Balloon Decoration",
    category: "Birthdays",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200",
  },
  {
    title: "Designer Cake",
    category: "Cakes",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200",
  },
];

const MasonryGallery = ({
  activeFilter,
}: MasonryGalleryProps) => {
  const [selectedIndex, setSelectedIndex] =
    useState<number | null>(null);

  const filteredItems =
    activeFilter === "All"
      ? galleryItems
      : galleryItems.filter(
          (item) => item.category === activeFilter
        );

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.35,
            }}
            className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={`${item.title}-${index}`}
                initial={{
                  opacity: 0,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.04,
                }}
                whileHover={{
                  y: -8,
                }}
                onClick={() =>
                  setSelectedIndex(index)
                }
                className="relative overflow-hidden rounded-[32px] break-inside-avoid group cursor-pointer shadow-lg"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover transition duration-700 group-hover:scale-110"
                />

                {/* Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content */}

                <div className="absolute bottom-6 left-6 right-6">

                  <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-sm mb-3">
                    {item.category}
                  </span>

                  <h3
                    className="text-white text-2xl"
                    style={{
                      fontFamily: "Playfair Display",
                    }}
                  >
                    {item.title}
                  </h3>

                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Lightbox */}

        {selectedIndex !== null && (
          <GalleryLightbox
            images={filteredItems}
            currentIndex={selectedIndex}
            onClose={() =>
              setSelectedIndex(null)
            }
            onNext={() =>
              setSelectedIndex(
                (selectedIndex + 1) %
                  filteredItems.length
              )
            }
            onPrev={() =>
              setSelectedIndex(
                selectedIndex === 0
                  ? filteredItems.length - 1
                  : selectedIndex - 1
              )
            }
          />
        )}

      </div>
    </section>
  );
};

export default MasonryGallery;