import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Wedding Cakes",
    image:
      "https://images.unsplash.com/photo-1535254973040-607b474cb50d",
    description:
      "Elegant multi-tier cakes crafted for unforgettable weddings.",
  },
  {
    title: "Birthday Cakes",
    image:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3",
    description:
      "Custom birthday cakes designed for every age and theme.",
  },
  {
    title: "Anniversary Cakes",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    description:
      "Celebrate special milestones with luxury cake creations.",
  },
  {
    title: "Baby Shower Cakes",
    image:
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e",
    description:
      "Adorable themed cakes perfect for welcoming little ones.",
  },
  {
    title: "Corporate Cakes",
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b",
    description:
      "Professional cake designs for company events and launches.",
  },
  {
    title: "Designer Cakes",
    image:
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d",
    description:
      "Luxury custom cakes tailored to your unique vision.",
  },
];

const CakeCategories = () => {
  return (
    <section className="py-28 bg-[#fffaf6]">
      <div className="container-custom">

        {/* Heading */}
        <div className="text-center mb-16">
          <p className="section-subtitle">
            OUR SPECIALTIES
          </p>

          <h2 className="section-title">
            Cakes For Every Occasion
          </h2>

          <p className="max-w-2xl mx-auto text-gray-500 mt-4">
            From intimate celebrations to grand weddings,
            every cake is handcrafted with creativity,
            precision, and premium ingredients.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="group bg-white rounded-[30px] overflow-hidden shadow-lg border border-[#f3e5dc]"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  loading="lazy"
                  decoding="async"
                  className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                <h3
                  className="text-3xl text-[#3a2d28] mb-4"
                  style={{
                    fontFamily: "Playfair Display",
                  }}
                >
                  {category.title}
                </h3>

                <p className="text-gray-500 leading-relaxed">
                  {category.description}
                </p>

                <Link to="/contact" className="mt-6 inline-block text-[#d7a88c] font-medium hover:translate-x-1 transition">
                  Explore →
                </Link>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default CakeCategories;
