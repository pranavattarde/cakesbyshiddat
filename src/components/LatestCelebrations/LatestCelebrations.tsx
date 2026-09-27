import { latestCelebrations } from "../../data/latestCelebrations";

const LatestCelebrations = () => {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-[#fff8f2]">
      <div className="container-custom">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <p className="uppercase tracking-[4px] sm:tracking-[5px] text-[#d7a88c] font-semibold text-xs sm:text-sm mb-2 sm:mb-4">
            Latest Celebrations
          </p>

          <h2
            className="text-3xl sm:text-5xl lg:text-6xl text-[#3a2d28] font-bold"
            style={{
              fontFamily: "Playfair Display",
            }}
          >
            Moments We Loved Creating
          </h2>

          <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-[#8a7a72] text-sm sm:text-base leading-relaxed">
            A glimpse into some of our recent celebrations, cakes, and unforgettable memories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {latestCelebrations.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-[24px] sm:rounded-[28px] border border-[#f0dfd7] shadow-sm"
            >
              <img
                src={item.image}
                alt="Recent Cakes By Shiddat celebration"
                loading="lazy"
                decoding="async"
                className="h-64 sm:h-72 md:h-[340px] w-full object-cover hover:scale-105 transition duration-700"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestCelebrations;
