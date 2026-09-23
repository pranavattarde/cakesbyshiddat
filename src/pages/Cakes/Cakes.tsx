import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import SEO from '../../components/SEO';
import { CakeGrid } from '../../components/Cakes/CakeGrid';
import { useCakeCategories, useCakes } from '../../hooks/use-cakes';
import { useSiteContent } from '../../contexts/SiteContentContext';
import { InquiryModal } from '../../components/InquiryModal';
import { FaCrown, FaStar, FaWhatsapp, FaCalendarCheck, FaSearch } from 'react-icons/fa';
import { useSettings } from '../../hooks/useSettings';

const Cakes: React.FC = () => {
  const location = useLocation();
  const { content } = useSiteContent();
  const { settings } = useSettings();

  const [search, setSearch] = useState('');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState('');
  const [sort, setSort] = useState<'displayOrder' | 'createdAt' | 'name'>('displayOrder');
  const [page, setPage] = useState(1);

  // Inquiry modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalService, setModalService] = useState('Luxury Cakes');

  const categoriesQuery = useCakeCategories();
  const cakesQuery = useCakes({
    page,
    limit: 12,
    search,
    category: selectedCategorySlug || undefined,
    sort,
    sortOrder: sort === 'name' ? 'asc' : 'desc',
  });

  const luxuryRef = useRef<HTMLDivElement>(null);

  // Check URL hash or query params to auto-scroll
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    const hash = location.hash;

    if (hash === '#luxury-cakes' || categoryParam === 'luxury-cakes' || categoryParam === 'luxury') {
      setSelectedCategorySlug('luxury-cakes');
      setTimeout(() => {
        if (luxuryRef.current) {
          luxuryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    } else if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
    }
  }, [location]);

  const rawPhone = settings?.whatsapp || settings?.phone || '919999999999';
  const whatsappUrl = `https://wa.me/${rawPhone.replace(/\D/g, '')}?text=${encodeURIComponent('Hi! I want to order/inquire about a custom cake from Cakes by Shiddat')}`;

  const openConsultation = (serviceName: string) => {
    setModalService(serviceName);
    setModalOpen(true);
  };

  const categories = content.cakeCategories.filter((c) => c.active);
  const luxuryCategory = categories.find((c) => c.slug === 'luxury-cakes') || categories[0];

  return (
    <>
      <SEO
        title="Luxury Cakes & Custom Confections"
        description="Explore artisanal custom cakes, luxury multi-tier wedding cakes, birthday confections, and gourmet flavours by Cakes By Shiddat."
        path="/cakes"
      />
      <Navbar />

      <main className="bg-[#fffdfa] pt-36 sm:pt-40">
        {/* Top Hero Banner */}
        <section className="bg-gradient-to-b from-[#fff5ee] via-[#fff9f4] to-[#fffdfa] py-16 sm:py-20 border-b border-[#f0dfd7]">
          <div className="container-custom text-center max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fdeee4] border border-[#ecd8cc] text-xs uppercase tracking-[4px] font-bold text-[#c99a7d] mb-4">
              <span>🎂</span>
              <span>The Artisanal Bakehouse</span>
            </span>
            <h1
              className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#3a2d28] tracking-tight leading-tight"
              style={{ fontFamily: 'Playfair Display' }}
            >
              Cakes of Distinction & Desire
            </h1>
            <p className="mt-6 text-base sm:text-lg text-[#8a7a72] leading-relaxed max-w-2xl mx-auto">
              Every cake is an edible masterpiece handcrafted with premium butter, Belgian chocolates, organic essences, and heartfelt artistry.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => openConsultation('Bespoke Custom Cake')}
                className="rounded-full bg-[#d7a88c] hover:bg-[#c99a7d] text-white px-8 py-3.5 font-medium shadow-md transition hover:scale-105"
              >
                Book Custom Cake Consultation
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500 text-emerald-700 hover:bg-emerald-50 px-6 py-3.5 text-sm font-medium transition"
              >
                <FaWhatsapp className="text-xl text-[#25D366]" />
                <span>Instant Order on WhatsApp</span>
              </a>
            </div>

            {/* Quick Category Anchor Bar */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.slug}`}
                  className="px-4 py-2 rounded-full text-xs font-semibold bg-white hover:bg-[#fceee5] border border-[#ecd7cb] text-[#3a2d28] hover:text-[#d7a88c] shadow-sm transition"
                >
                  {cat.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED: LUXURY CAKES SHOWCASE SECTION */}
        {luxuryCategory && (
          <section
            id="luxury-cakes"
            ref={luxuryRef}
            className="py-20 sm:py-28 bg-gradient-to-r from-[#2c1d24] via-[#3a2630] to-[#25181f] text-white relative overflow-hidden"
          >
            {/* Background luxury shimmer */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#d7a88c]/15 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#e8be99]/10 blur-3xl pointer-events-none" />

            <div className="container-custom relative z-10">
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                {/* Left Showcase Info */}
                <div className="lg:col-span-6 xl:col-span-5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-[3px] text-[#e8be99] mb-4">
                    <FaCrown className="text-amber-400" />
                    <span>The Crown Collection</span>
                  </div>

                  <h2
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
                    style={{ fontFamily: 'Playfair Display' }}
                  >
                    {luxuryCategory.title}
                  </h2>

                  <p className="mt-3 text-sm uppercase tracking-widest text-[#d7a88c] font-semibold">
                    {luxuryCategory.subtitle || '24K Edible Gold & Bespoke Multi-Tier Architectural Art'}
                  </p>

                  <p className="mt-5 text-gray-300 leading-relaxed text-base sm:text-lg">
                    {luxuryCategory.description}
                  </p>

                  {/* Highlights */}
                  {luxuryCategory.features && (
                    <div className="mt-8 grid grid-cols-2 gap-3">
                      {luxuryCategory.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-gray-200">
                          <span className="text-amber-400">✦</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => openConsultation('Luxury Cakes')}
                      className="rounded-full bg-gradient-to-r from-[#d7a88c] to-[#c99a7d] hover:brightness-110 text-white font-medium px-8 py-4 shadow-lg shadow-[#d7a88c]/25 transition hover:scale-105"
                    >
                      Book Luxury Cake Consultation
                    </button>
                    {luxuryCategory.startingPrice && (
                      <span className="text-sm text-gray-300 font-medium">
                        Starts at <strong className="text-white text-lg">{luxuryCategory.startingPrice}</strong>
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Image Triad Gallery */}
                <div className="lg:col-span-6 xl:col-span-7 grid sm:grid-cols-2 gap-4">
                  <div className="relative rounded-[32px] overflow-hidden shadow-2xl border border-white/15 aspect-[3/4]">
                    <img
                      src="https://res.cloudinary.com/n8ql5bui/image/upload/v1790159987/Screenshot_2026-09-23_160928_mebssm.png"
                      alt="Luxury Multi-Tier Royal Cake"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white">
                      Royal Golden Tier
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="relative rounded-[28px] overflow-hidden shadow-xl border border-white/15 aspect-[4/3]">
                      <img
                        src="https://res.cloudinary.com/n8ql5bui/image/upload/v1790159863/Screenshot_2026-09-23_160155_kqa9f5.png"
                        alt="Elegance Floral Celebration Cake"
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white">
                        Floral Symphony
                      </div>
                    </div>
                    <div className="relative rounded-[28px] overflow-hidden shadow-xl border border-white/15 aspect-[4/3]">
                      <img
                        src="https://res.cloudinary.com/n8ql5bui/image/upload/v1790159863/Screenshot_2026-09-23_155903_m47cow.png"
                        alt="Gourmet Handcrafted Delight"
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white">
                        Velvet Artisan
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* DETAILED CATEGORIES SECTIONS */}
        <section className="py-20 sm:py-28 bg-[#fffaf6]">
          <div className="container-custom">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[4px] text-[#c99a7d] font-bold">Categories & Styles</span>
              <h2
                className="text-4xl sm:text-5xl text-[#3a2d28] font-bold mt-2"
                style={{ fontFamily: 'Playfair Display' }}
              >
                Curated Cake Collections
              </h2>
              <p className="text-[#8a7a72] mt-3 max-w-xl mx-auto">
                Explore each signature category tailored for life’s grandest milestones and intimate moments.
              </p>
            </div>

            <div className="space-y-20">
              {categories.map((cat, idx) => (
                <div
                  key={cat.id}
                  id={cat.slug}
                  className={`scroll-mt-28 rounded-[40px] border border-[#f0dfd7] p-8 sm:p-12 transition-all ${
                    idx % 2 === 0 ? 'bg-[#fffdfa]' : 'bg-[#fff5ee]/60'
                  }`}
                >
                  <div className="grid lg:grid-cols-12 gap-8 items-center">
                    <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className="aspect-[4/3] rounded-[32px] overflow-hidden shadow-lg border border-[#eedcd2]">
                        <img
                          src={cat.coverImage}
                          alt={cat.title}
                          loading="lazy"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    </div>

                    <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <span className="text-xs uppercase tracking-[3px] text-[#d7a88c] font-bold">
                        {cat.badge || 'Signature Style'}
                      </span>
                      <h3
                        className="text-3xl sm:text-4xl text-[#3a2d28] font-bold mt-1"
                        style={{ fontFamily: 'Playfair Display' }}
                      >
                        {cat.title}
                      </h3>
                      {cat.subtitle && (
                        <p className="text-sm font-semibold text-[#8a7a72] mt-1">
                          {cat.subtitle}
                        </p>
                      )}
                      <p className="mt-4 text-[#8a7a72] leading-relaxed text-base">
                        {cat.description}
                      </p>

                      {cat.features && (
                        <div className="mt-6 flex flex-wrap gap-2">
                          {cat.features.map((feat, fIdx) => (
                            <span
                              key={fIdx}
                              className="px-3 py-1 rounded-full bg-[#fceee5] border border-[#ebd6ca] text-xs text-[#523d34] font-medium"
                            >
                              ✓ {feat}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-8 pt-6 border-t border-[#ebd8cd] flex flex-wrap items-center gap-4">
                        <button
                          onClick={() => openConsultation(cat.title)}
                          className="rounded-full bg-[#d7a88c] hover:bg-[#c99a7d] text-white px-7 py-3 font-medium text-sm shadow-md transition hover:scale-105"
                        >
                          Book {cat.title} Consultation
                        </button>
                        {cat.startingPrice && (
                          <span className="text-xs uppercase tracking-wider text-[#8a7a72]">
                            Starting from <strong className="text-sm text-[#3a2d28]">{cat.startingPrice}</strong>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LIVE CAKE BROWSER & SEARCH */}
        <section className="py-20 bg-gradient-to-b from-[#fffaf6] to-[#fff5ee] border-t border-[#f0dfd7]">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-xs uppercase tracking-[4px] text-[#c99a7d] font-bold">Live Inventory</span>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-[#3a2d28] mt-1"
                  style={{ fontFamily: 'Playfair Display' }}
                >
                  Browse Available Cakes
                </h2>
                <p className="text-sm text-[#8a7a72] mt-1">
                  Search flavors, browse active creations, and place orders directly.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search cakes, flavors..."
                    className="pl-9 pr-4 py-2.5 rounded-full border border-[#eadde1] bg-white text-sm text-[#3a2d28] focus:outline-none focus:border-[#d7a88c]"
                  />
                </div>

                <select
                  value={selectedCategorySlug}
                  onChange={(e) => {
                    setSelectedCategorySlug(e.target.value);
                    setPage(1);
                  }}
                  className="px-4 py-2.5 rounded-full border border-[#eadde1] bg-white text-sm text-[#3a2d28] focus:outline-none focus:border-[#d7a88c]"
                >
                  <option value="">All Categories</option>
                  {categoriesQuery.data?.map((item) => (
                    <option key={item.id} value={item.slug}>
                      {item.name}
                    </option>
                  ))}
                </select>

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as typeof sort)}
                  className="px-4 py-2.5 rounded-full border border-[#eadde1] bg-white text-sm text-[#3a2d28] focus:outline-none focus:border-[#d7a88c]"
                >
                  <option value="displayOrder">Featured Order</option>
                  <option value="createdAt">Newest Additions</option>
                  <option value="name">Name A–Z</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {cakesQuery.isLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="aspect-[4/5] animate-pulse rounded-3xl bg-[#f7ebe3]" />
                ))}
              </div>
            ) : cakesQuery.isError ? (
              <div className="text-center py-12 rounded-3xl bg-white border border-[#f0dfd7] p-8">
                <p className="text-[#8a7a72]">Unable to load live catalog at the moment.</p>
                <button
                  onClick={() => void cakesQuery.refetch()}
                  className="mt-4 rounded-full bg-[#d7a88c] px-6 py-2.5 text-white text-sm font-medium"
                >
                  Retry Loading
                </button>
              </div>
            ) : cakesQuery.data?.items?.length ? (
              <>
                <CakeGrid cakes={cakesQuery.data.items} />
                {/* Pagination */}
                <div className="mt-12 flex justify-center items-center gap-4">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((v) => v - 1)}
                    className="rounded-full border border-[#d7a88c] px-6 py-2 text-sm font-medium text-[#3a2d28] disabled:opacity-40 hover:bg-[#fdeee4] transition"
                  >
                    Previous
                  </button>
                  <span className="text-xs uppercase tracking-wider text-[#8a7a72]">
                    Page {page} of {cakesQuery.data.pagination.totalPages || 1}
                  </span>
                  <button
                    disabled={page >= (cakesQuery.data.pagination.totalPages ?? 1)}
                    onClick={() => setPage((v) => v + 1)}
                    className="rounded-full bg-[#d7a88c] px-6 py-2 text-sm font-medium text-white disabled:opacity-40 hover:bg-[#c99a7d] transition"
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-3xl border border-[#f0dfd7] p-8">
                <p className="text-lg text-[#3a2d28] font-serif">No specific items found</p>
                <p className="text-sm text-[#8a7a72] mt-1">Try clearing your search query or book a custom order with us.</p>
                <button
                  onClick={() => openConsultation('Custom Cake Request')}
                  className="mt-4 rounded-full bg-[#d7a88c] text-white px-6 py-2.5 text-sm font-medium"
                >
                  Request Custom Cake
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* Unified Consultation Modal */}
      <InquiryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialService={modalService}
      />
    </>
  );
};

export default Cakes;
