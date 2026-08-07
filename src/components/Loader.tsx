import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#fffaf6] flex items-center justify-center">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.8,
        }}
        className="text-center"
      >
        <h1
          className="text-5xl lg:text-7xl text-[#3a2d28]"
          style={{
            fontFamily: "Playfair Display",
          }}
        >
          Cakes By Shiddat
        </h1>

        <div className="mt-6 flex justify-center">
          <div className="w-40 h-1 bg-[#ead8cf] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#d7a88c]"
              initial={{
                width: 0,
              }}
              animate={{
                width: "100%",
              }}
              transition={{
                duration: 2,
              }}
            />
          </div>
        </div>

        <p className="mt-4 text-gray-500">
          Crafting Celebrations...
        </p>
      </motion.div>
    </div>
  );
};

export default Loader;