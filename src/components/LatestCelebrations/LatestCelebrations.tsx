import { latestCelebrations } from "../../data/latestCelebrations";

const LatestCelebrations = () => {
  return (
    <section className="py-32 bg-[#fff8f2]">
      <div className="container-custom">

        <div className="text-center mb-20">
          <p className="uppercase tracking-[5px] text-[#d7a88c] mb-4">
            Latest Celebrations
          </p>

          <h2
            className="text-5xl text-[#3a2d28]"
            style={{
              fontFamily: "Playfair Display",
            }}
          >
            Moments We Loved Creating
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-[#8a7a72]">
            A glimpse into some of our recent celebrations,
            cakes, and unforgettable memories.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {latestCelebrations.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-[28px]"
            >
              <img
                src={item.image}
                alt="Recent Cakes By Shiddat celebration"
                loading="lazy"
                decoding="async"
                className="h-[350px] w-full object-cover hover:scale-110 transition duration-700"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default LatestCelebrations;
