import { motion } from "framer-motion";

const cakes = [
  {
    category: "Wedding Cake",
    title: "Luxury Floral Wedding Cake",
    description:
      "Elegant multi-tier cake decorated with handcrafted floral details.",
    image:
      "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=1200",
  },
  {
    category: "Designer Cake",
    title: "Modern Celebration Cake",
    description:
      "Contemporary custom cake designed for unforgettable celebrations.",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200",
  },
  {
    category: "Birthday Cake",
    title: "Premium Birthday Collection",
    description:
      "Creative birthday cakes crafted to match every personality and theme.",
    image:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1200",
  },
];

const FeaturedCakesShowcase = () => {
  return (
    <section className="py-28 bg-white">
      <div className="container-custom">

        <div className="text-center mb-20">
          <p className="section-subtitle">
            FEATURED CREATIONS
          </p>

          <h2 className="section-title">
            Some Of Our Finest Cakes
          </h2>

          <p className="max-w-2xl mx-auto text-gray-500 mt-4">
            Every cake is handcrafted with attention to detail,
            premium ingredients, and a passion for creating
            memorable celebrations.
          </p>
        </div>

        <div className="space-y-12">

          {cakes.map((cake, index) => (
            <motion.div
              key={cake.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              className={`grid lg:grid-cols-2 gap-10 items-center ${
                index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >

              {/* Image */}
              <div className="overflow-hidden rounded-[40px] shadow-xl">
                <img
                  src={cake.image}
                  alt={cake.title}
                  className="w-full h-[500px] object-cover hover:scale-105 transition duration-700"
                />
              </div>

              {/* Content */}
              <div>

                <p className="text-[#d7a88c] uppercase tracking-[3px] mb-4">
                  {cake.category}
                </p>

                <h3
                  className="text-4xl lg:text-5xl text-[#3a2d28] mb-6"
                  style={{
                    fontFamily: "Playfair Display",
                  }}
                >
                  {cake.title}
                </h3>

                <p className="text-gray-500 text-lg leading-8 mb-8">
                  {cake.description}
                </p>

                <button className="px-8 py-4 rounded-full bg-[#d7a88c] text-white hover:bg-[#c9987a] transition-all duration-300">
                  View Cake
                </button>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default FeaturedCakesShowcase;