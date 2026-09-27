import { Link } from 'react-router-dom';
import { CakeGrid } from '../../components/Cakes/CakeGrid';
import { useCakes } from '../../hooks/use-cakes';

const FeaturedCakes = () => {
  const { data, isLoading, isError, refetch } = useCakes({
    page: 1,
    limit: 6,
    featured: true,
    sort: 'displayOrder',
    sortOrder: 'asc',
  });

  return (
    <section className="bg-[#fff8f2] py-16 sm:py-24 lg:py-32">
      <div className="container-custom">
        <div className="mb-12 sm:mb-16 text-center">
          <p className="mb-2 sm:mb-4 uppercase tracking-[4px] sm:tracking-[5px] text-[#d7a88c] font-semibold text-xs sm:text-sm">
            Signature Collection
          </p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#3a2d28]" style={{ fontFamily: 'Playfair Display' }}>
            Featured Cakes
          </h2>
          <p className="text-[#8a7a72] mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            A curated showcase of our most beloved bespoke creations, made with artistry and the finest gourmet ingredients.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((value) => (
              <div key={value} className="aspect-[4/3] animate-pulse rounded-3xl bg-[#f3e5dc]" />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-10 bg-white rounded-3xl border border-[#f0dfd7] p-8 max-w-lg mx-auto">
            <p className="text-[#8a7a72]">Unable to load featured cakes.</p>
            <button
              onClick={() => void refetch()}
              className="mt-4 rounded-full bg-[#d7a88c] px-6 py-2.5 text-white text-sm font-medium hover:bg-[#c99a7d] transition"
            >
              Retry
            </button>
          </div>
        ) : (
          <CakeGrid cakes={data?.items ?? []} />
        )}

        <div className="mt-12 sm:mt-14 text-center">
          <Link
            to="/cakes"
            className="inline-block rounded-full bg-[#d7a88c] hover:bg-[#c99a7d] px-8 py-3.5 sm:py-4 text-white font-medium text-sm sm:text-base transition shadow-md hover:scale-105"
          >
            View Full Cake Collection
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCakes;
