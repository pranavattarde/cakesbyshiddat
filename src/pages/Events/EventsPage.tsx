import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import SEO from '../../components/SEO';
import { useSiteContent } from '../../contexts/SiteContentContext';
import { SmartMedia } from '../../components/common/SmartMedia';
import { OtherServicesSection } from '../../components/events/OtherServicesSection';
import { InquiryModal } from '../../components/InquiryModal';
import { FaWhatsapp, FaStar } from 'react-icons/fa';
import { useSettings } from '../../hooks/useSettings';

const EventsPage: React.FC = () => {
  const location = useLocation();
  const { content } = useSiteContent();
  const { settings } = useSettings();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalService, setModalService] = useState('Wedding Events');
  const [isCustomService, setIsCustomService] = useState(false);

  // Auto-scroll when hash is in URL (e.g. from homepage cards)
  useEffect(() => {
    if (location.hash) {
      const targetElement = document.querySelector(location.hash);
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const rawPhone = settings?.whatsapp || settings?.phone || '919999999999';
  const whatsappUrl = `https://wa.me/${rawPhone.replace(/\D/g, '')}?text=${encodeURIComponent('Hi! I would like to inquire about event decoration & planning services from Cakes by Shiddat')}`;

  const openConsultation = (serviceName: string, custom = false) => {
    setModalService(serviceName);
    setIsCustomService(custom);
    setModalOpen(true);
  };

  const categories = content.eventCategories.filter((c) => c.active);

  return (
    <>
      <SEO
        title="Event Planning & Luxury Celebrations"
        description="Thoughtful event styling, wedding decor, baby showers, anniversaries, retirement and engagement celebrations by Cakes By Shiddat in Haryana."
        path="/events"
      />
      <Navbar />

      <main className="bg-[#fffdfa] pt-28 sm:pt-36 lg:pt-40">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#fff5ee] via-[#fff9f4] to-[#fffdfa] py-12 sm:py-16 lg:py-20 border-b border-[#f0dfd7]">
          <div className="container-custom text-center max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#fdeee4] border border-[#ecd8cc] text-[11px] sm:text-xs uppercase tracking-[3px] sm:tracking-[4px] font-bold text-[#c99a7d] mb-3 sm:mb-4">
              <span>🎉</span>
              <span>Celebration Architecture</span>
            </span>
            <h1
              className="text-3xl sm:text-5xl lg:text-7xl font-bold text-[#3a2d28] tracking-tight leading-tight"
              style={{ fontFamily: 'Playfair Display' }}
            >
              Celebrations Styled to Perfection
            </h1>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-[#8a7a72] leading-relaxed max-w-2xl mx-auto">
              Transforming milestones into breathtaking experiences. From dream weddings and magical birthdays to intimate anniversaries and vibrant kid celebrations.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={() => openConsultation('General Event Consultation')}
                className="w-full sm:w-auto rounded-full bg-[#d7a88c] hover:bg-[#c99a7d] text-white px-7 sm:px-8 py-3.5 font-medium text-sm sm:text-base shadow-md transition hover:scale-105 cursor-pointer text-center"
              >
                Plan Your Event With Us
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-emerald-500 text-emerald-700 hover:bg-emerald-50 px-6 py-3.5 text-sm font-medium transition"
              >
                <FaWhatsapp className="text-xl text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Quick Category Anchor Bar */}
            <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.slug}`}
                  className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold bg-white hover:bg-[#fceee5] border border-[#ecd7cb] text-[#3a2d28] hover:text-[#d7a88c] shadow-sm transition"
                >
                  {cat.title}
                </a>
              ))}
              <a
                href="#other-services"
                className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold bg-[#3a2630] text-white hover:bg-[#d7a88c] shadow-sm transition"
              >
                + Specialized Services
              </a>
            </div>
          </div>
        </section>

        {/* 6 Core Event Category Showcases */}
        <section className="py-14 sm:py-20 lg:py-28 bg-[#fffaf6]">
          <div className="container-custom">
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <span className="text-xs uppercase tracking-[3px] sm:tracking-[4px] text-[#c99a7d] font-bold">Comprehensive Experiences</span>
              <h2
                className="text-3xl sm:text-5xl lg:text-6xl text-[#3a2d28] font-bold mt-2"
                style={{ fontFamily: 'Playfair Display' }}
              >
                Specialized Event Categories
              </h2>
              <p className="text-xs sm:text-sm text-[#8a7a72] mt-2 sm:mt-3 max-w-xl mx-auto">
                Explore our signature setups with customized themes, stage styling, imported florals, and coordinated experiences.
              </p>
            </div>

            <div className="space-y-14 sm:space-y-20 lg:space-y-24">
              {categories.map((cat, idx) => (
                <div
                  key={cat.id}
                  id={cat.slug}
                  className={`scroll-mt-28 rounded-[28px] sm:rounded-[44px] border border-[#f0dfd7] p-5 sm:p-10 lg:p-14 transition-all shadow-sm ${
                    idx % 2 === 0 ? 'bg-[#fffdfa]' : 'bg-[#fff6ef]/65'
                  }`}
                >
                  <div className="grid lg:grid-cols-12 gap-10 items-center">
                    {/* Media / Reel Visuals */}
                    <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className="rounded-[36px] overflow-hidden shadow-xl border border-[#eedcd2] bg-[#22161d]">
                        {cat.media && cat.media.length > 0 ? (
                          <SmartMedia
                            url={cat.media[0].url}
                            type={cat.media[0].type}
                            title={cat.media[0].title || cat.title}
                            aspectRatio="aspect-[16/11]"
                            className="w-full h-full"
                          />
                        ) : (
                          <img
                            src={cat.coverImage}
                            alt={cat.title}
                            loading="lazy"
                            className="w-full aspect-[16/11] object-cover hover:scale-105 transition-transform duration-700"
                          />
                        )}
                      </div>
                    </div>

                    {/* Description & Booking Info */}
                    <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fdeee4] border border-[#ecd8cc] text-[11px] uppercase tracking-[3px] font-bold text-[#c99a7d] mb-3">
                        <FaStar className="text-amber-500 text-xs" />
                        <span>{cat.badge || 'Full Coordination'}</span>
                      </div>

                      <h3
                        className="text-3xl sm:text-4xl lg:text-5xl text-[#3a2d28] font-bold tracking-tight"
                        style={{ fontFamily: 'Playfair Display' }}
                      >
                        {cat.title}
                      </h3>

                      {cat.subtitle && (
                        <p className="text-sm font-semibold text-[#8a7a72] mt-2">
                          {cat.subtitle}
                        </p>
                      )}

                      <p className="mt-4 text-[#8a7a72] leading-relaxed text-base">
                        {cat.description}
                      </p>

                      {cat.features && (
                        <div className="mt-6 space-y-2">
                          {cat.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-2.5 text-sm text-[#523d34]">
                              <span className="w-5 h-5 rounded-full bg-[#d7a88c]/20 text-[#d7a88c] flex items-center justify-center text-xs font-bold shrink-0">
                                ✓
                              </span>
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-8 pt-6 border-t border-[#ebd8cd] flex flex-wrap items-center gap-4">
                        <button
                          onClick={() => openConsultation(cat.title)}
                          className="rounded-full bg-[#d7a88c] hover:bg-[#c99a7d] text-white px-8 py-3.5 font-medium text-sm shadow-md transition hover:scale-105"
                        >
                          Book {cat.title}
                        </button>
                        <a
                          href={`https://wa.me/${cleanPhone(rawPhone)}?text=${encodeURIComponent(`Hi Cakes by Shiddat, I want to inquire about: ${cat.title}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs uppercase tracking-wider text-[#8a7a72] hover:text-[#d7a88c] font-semibold underline underline-offset-4"
                        >
                          Chat about {cat.title}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8: OTHER EVENT SERVICES & CUSTOMIZABLE SERVICE */}
        <OtherServicesSection onSelectService={(name, custom) => openConsultation(name, custom)} />
      </main>

      <Footer />

      {/* Unified Consultation Modal */}
      <InquiryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialService={modalService}
        isCustomService={isCustomService}
      />
    </>
  );
};

function cleanPhone(raw: string) {
  return raw.replace(/\D/g, '');
}

export default EventsPage;
