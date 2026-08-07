import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const projects = [
  {
    title: "Luxury Wedding Celebration",
    category: "Wedding Event",
    description:
      "A beautifully curated wedding setup featuring elegant floral decorations, stage design, and premium event styling.",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1400",
  },
  {
    title: "Custom Birthday Experience",
    category: "Birthday Celebration",
    description:
      "A vibrant themed birthday celebration complete with balloons, custom decor, entertainment, and a personalized cake.",
    image:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1400",
  },
  {
    title: "Elegant Baby Shower Setup",
    category: "Baby Shower",
    description:
      "A premium baby shower theme designed to create memorable moments for family and friends.",
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1400",
  },
];

const FeaturedProjects = () => {
  return (
    <section className="py-28 bg-[#fffaf6]">
      <div className="container-custom">

        <div className="text-center mb-20">
          <p className="section-subtitle">
            FEATURED PROJECTS
          </p>

          <h2 className="section-title">
            Celebrations We're Proud Of
          </h2>

          <p className="max-w-3xl mx-auto text-gray-500 mt-4">
            Some of our most loved celebrations, showcasing
            creativity, attention to detail, and memorable experiences.
          </p>
        </div>

        <div className="space-y-24">

          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid lg:grid-cols-2 gap-14 items-center ${
                index % 2 !== 0
                  ? "lg:[&>*:first-child]:order-2"
                  : ""
              }`}
            >

              <div className="overflow-hidden rounded-[40px] shadow-xl">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[500px] object-cover hover:scale-105 transition duration-700"
                />
              </div>

              <div>

                <p className="uppercase tracking-[3px] text-[#d7a88c] mb-4">
                  {project.category}
                </p>

                <h3
                  className="text-4xl lg:text-5xl text-[#3a2d28] mb-6"
                  style={{
                    fontFamily: "Playfair Display",
                  }}
                >
                  {project.title}
                </h3>

                <p className="text-gray-500 leading-8 text-lg mb-8">
                  {project.description}
                </p>

                <Link to="/contact" className="bg-[#d7a88c] hover:bg-[#c9987a] text-white px-8 py-4 rounded-full transition-all duration-300">
                  View Project
                </Link>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default FeaturedProjects;
