import { Link, useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import SEO from '../../components/SEO';
import { useCakeBySlug } from '../../hooks/use-cakes';
import { SHOW_RUPEE_PRICES } from '../../data/priceCatalogBackup';
import { FaWhatsapp } from 'react-icons/fa';
import { useSettings } from '../../hooks/useSettings';

export default function CakeDetails(): React.JSX.Element {
  const { slug } = useParams();
  const { settings } = useSettings();
  const { data: cake, isLoading, isError, refetch } = useCakeBySlug(slug);

  if (isLoading) return <div className="grid min-h-screen place-items-center bg-[#fffaf6]">Loading cake…</div>;
  if (isError || !cake) {
    return (
      <main className="grid min-h-screen place-items-center text-center bg-[#fffaf6] px-6">
        <div>
          <p className="text-lg text-[#554037]">We couldn’t find this cake.</p>
          <button
            onClick={() => void refetch()}
            className="mt-4 rounded-full bg-[#d7a88c] px-6 py-3 text-white shadow-md hover:bg-[#c99a7d] transition"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  const rawPhone = settings?.whatsapp || settings?.phone || '+91 9999999999';
  const cleanPhone = rawPhone.replace(/\D/g, '') || '919999999999';
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hi Cakes by Shiddat! I would like to inquire about: ${cake.name}`)}`;

  return (
    <>
      <SEO
        title={cake.seoTitle || cake.name}
        description={cake.seoDescription || cake.shortDescription}
        path={`/cakes/${cake.slug}`}
      />
      <Navbar />
      <main className="bg-[#fff8f2] px-6 pb-24 pt-36">
        <div className="container-custom grid gap-12 lg:grid-cols-2 items-start">
          <div className="overflow-hidden rounded-[40px] border border-[#f3e5dc] bg-white shadow-lg">
            <img
              src={cake.coverMedia.secureUrl}
              alt={cake.coverMedia.alt || cake.name}
              className="w-full aspect-[4/3] object-cover"
            />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#d7a88c]">
              {cake.category.name}
            </p>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-[#3a2d28]" style={{ fontFamily: 'Playfair Display' }}>
              {cake.name}
            </h1>
            <p className="mt-6 text-base leading-8 text-[#8a7a72]">{cake.description}</p>

            {/* Weights & Sizing */}
            <h2 className="mt-8 text-lg font-bold text-[#3a2d28]">Available Sizing & Pricing</h2>
            <div className="mt-3 grid gap-2">
              {cake.prices.map((price) => (
                <div
                  key={price.id}
                  className="flex items-center justify-between rounded-2xl bg-white border border-[#ebdcd3] p-4 shadow-sm"
                >
                  <span className="font-medium text-[#554037]">{price.weight}</span>
                  {SHOW_RUPEE_PRICES ? (
                    <b className="text-base text-[#3a2d28]">₹{price.price}</b>
                  ) : (
                    <span className="text-xs uppercase tracking-wider text-[#d7a88c] font-semibold">
                      Custom Quote on Request
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Flavours */}
            {cake.flavors.length > 0 && (
              <>
                <h2 className="mt-8 text-lg font-bold text-[#3a2d28]">Popular Flavours</h2>
                <p className="mt-2 text-sm text-[#8a7a72]">
                  {cake.flavors.map((flavour) => flavour.name).join(' • ')}
                </p>
              </>
            )}

            {/* Action buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white px-7 py-3.5 text-sm font-semibold shadow-md transition hover:scale-105"
              >
                <FaWhatsapp className="text-lg" />
                <span>Consult on WhatsApp</span>
              </a>

              <Link
                to="/cakes"
                className="rounded-full border border-[#d7a88c] text-[#3a2d28] hover:bg-[#d7a88c] hover:text-white px-7 py-3.5 text-sm font-semibold transition shadow-sm"
              >
                Back to All Cakes
              </Link>
            </div>
          </div>
        </div>

        {/* Gallery */}
        {cake.gallery.length > 0 && (
          <div className="container-custom mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
            {cake.gallery.map((item) => (
              <img
                key={item.mediaId}
                src={item.media.secureUrl}
                alt={item.media.alt || cake.name}
                className="aspect-square rounded-2xl object-cover shadow-sm border border-[#ebdcd3]"
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
