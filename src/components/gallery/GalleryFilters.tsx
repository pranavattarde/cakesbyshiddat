import { motion } from "framer-motion";

const filters = [
  "All",
  "Cakes",
  "Birthdays",
  "Weddings",
  "Baby Showers",
  "Mascots",
  "Corporate",
];

interface GalleryFiltersProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

const GalleryFilters = ({
  activeFilter,
  setActiveFilter,
}: GalleryFiltersProps) => {
  return (
    <section className="py-10 bg-white">
      <div className="container-custom">
        <div className="flex flex-wrap justify-center gap-4">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-[#d7a88c] text-white border-[#d7a88c]"
                  : "bg-white text-[#3a2d28] border-[#ead8cf] hover:border-[#d7a88c]"
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryFilters;