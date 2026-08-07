import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Navdeep Dua",
    role: "Founder",
    initials: "ND",
    description:
      "Leading business growth, client relations, and overall event management operations.",
  },
  {
    name: "Chitraa Dua",
    role: "Co-Founder",
    initials: "CD",
    description:
      "Driving creativity, cake design, event styling, and customer experiences.",
  },
];

const TeamSection = () => {
  return (
    <section className="py-28 bg-white">
      <div className="container-custom">

        <div className="text-center mb-20">
          <p className="section-subtitle">
            OUR TEAM
          </p>

          <h2
            className="section-title"
            style={{
              fontFamily: "Playfair Display",
            }}
          >
            Meet The People Behind The Magic
          </h2>

          <p className="max-w-2xl mx-auto text-gray-500 mt-4">
            Every celebration is brought to life by passionate people
            dedicated to making your special moments unforgettable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
              }}
              className="bg-[#fffaf6] border border-[#f3e5dc] rounded-[40px] p-10 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center gap-6">

                <div className="w-24 h-24 rounded-full bg-[#d7a88c] flex items-center justify-center">
                  <span
                    className="text-white text-3xl"
                    style={{
                      fontFamily: "Playfair Display",
                    }}
                  >
                    {member.initials}
                  </span>
                </div>

                <div>
                  <h3
                    className="text-3xl text-[#3a2d28]"
                    style={{
                      fontFamily: "Playfair Display",
                    }}
                  >
                    {member.name}
                  </h3>

                  <p className="text-[#d7a88c] font-medium mt-1">
                    {member.role}
                  </p>
                </div>

              </div>

              <p className="mt-8 text-gray-500 leading-8">
                {member.description}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default TeamSection;