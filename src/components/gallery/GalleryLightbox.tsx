import { AnimatePresence, motion } from "framer-motion";
import { HiX, HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface GalleryLightboxProps {
  images: {
    image: string;
    title: string;
    category: string;
  }[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const GalleryLightbox = ({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: GalleryLightboxProps) => {
  const current = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >

        {/* Close Button */}

        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-white text-4xl"
          aria-label="Close image viewer"
        >
          <HiX />
        </button>

        {/* Previous */}

        <button
          onClick={onPrev}
          className="absolute left-8 text-white text-5xl"
          aria-label="Previous image"
        >
          <HiChevronLeft />
        </button>

        {/* Next */}

        <button
          onClick={onNext}
          className="absolute right-8 text-white text-5xl"
          aria-label="Next image"
        >
          <HiChevronRight />
        </button>

        {/* Image */}

        <motion.div
          key={current.image}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="max-w-5xl w-full"
        >
          <img
            src={current.image}
            alt={current.title}
            decoding="async"
            className="w-full max-h-[80vh] object-contain rounded-[24px]"
          />

          <div className="text-center mt-6">
            <p className="text-[#d7a88c] uppercase tracking-[2px]">
              {current.category}
            </p>

            <h3
              className="text-white text-3xl mt-2"
              style={{
                fontFamily: "Playfair Display",
              }}
            >
              {current.title}
            </h3>
          </div>
        </motion.div>

      </motion.div>
    </AnimatePresence>
  );
};

export default GalleryLightbox;
