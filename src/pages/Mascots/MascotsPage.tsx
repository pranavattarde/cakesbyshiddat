import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import SEO from '../../components/SEO';
import { useSiteContent } from '../../contexts/SiteContentContext';
import { SmartMedia } from '../../components/common/SmartMedia';
import { InquiryModal } from '../../components/InquiryModal';
import { FaWhatsapp, FaSmile, FaHeart, FaStar, FaShieldAlt } from 'react-icons/fa';
import { useSettings } from '../../hooks/useSettings';

const MascotsPage: React.FC = () => {
  const { content } = useSiteContent();
  const { settings } = useSettings();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMascot, setSelectedMascot] = useState('Mascot Services');

  const rawPhone = settings?.whatsapp || settings?.phone || '919999999999';
  const whatsappUrl = `https://wa.me/${rawPhone.replace(/\D/g, '')}?text=${encodeURIComponent('Hi! I want to inquire about booking a Mascot for my child celebration with Cakes by Shiddat')}`;

  const openConsultation = (mascotName: string) => {
    setSelectedMascot(mascotName);
    setModalOpen(true);
  };

  const mascots = content.mascots.filter((m) => m.active);
  const heroReels = content.hero.mascots.media.filter((m) => m.active);

  return (
    <>
      <SEO
        title="Mascot Entertainment & Kids Characters"
        description="Delightful mascot character entries, Disney favourites, superhero mascots, and inflatable dancing pandas by Cakes By Shiddat in Haryana."
        path="/mascots"
      />
      <Navbar />

      <main className="bg-[#fffdfa] pt-36 sm:pt-40">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#fff5ee] via-[#fff9f4] to-[#fffdfa] py-16 sm:py-20 border-b border-[#f0dfd7]">
          <div className="container-custom text-center max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fdeee4] border border-[#ecd8cc] text-xs uppercase tracking-[4px] font-bold text-[#c99a7d] mb-4">
              <span>🧸</span>
              <span>Magical Moments For Kids</span>
            </span>

            <h1
              className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#3a2d28] tracking-tight leading-tight"
              style={{ fontFamily: 'Playfair Display' }}
            >
              Joyful Mascots & Live Magic
            </h1>

            <p className="mt-6 text-base sm:text-lg text-[#8a7a72] leading-relaxed max-w-2xl mx-auto">
              Bring your child’s favourite characters to life! Our professional mascot performers create viral dance entries, photo memories, and heartwarming hugs.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => openConsultation('Mascot Package Booking')}
                className="rounded-full bg-[#d7a88c] hover:bg-[#c99a7d] text-white px-8 py-3.5 font-medium shadow-md transition hover:scale-105"
              >
                Book Mascot For Party
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500 text-emerald-700 hover:bg-emerald-50 px-6 py-3.5 text-sm font-medium transition"
              >
                <FaWhatsapp className="text-xl text-[#25D366]" />
                <span>Instant WhatsApp Inquiry</span>
              </a>
            </div>
          </div>
        </section>

        {/* VIRAL REELS SHOWCASE SECTION */}
        <section className="py-20 sm:py-28 bg-[#fffaf6]">
          <div className="container-custom">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[4px] text-[#c99a7d] font-bold">Watch The Joy</span>
              <h2
                className="text-4xl sm:text-5xl text-[#3a2d28] font-bold mt-2"
                style={{ fontFamily: 'Playfair Display' }}
              >
                Live Mascot Reels & Energy
              </h2>
              <p className="text-[#8a7a72] mt-3 max-w-xl mx-auto">
                See our mascots in action dancing, meeting children, and leading unforgettable birthday entrances.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {heroReels.map((reel) => (
                <div
                  key={reel.id}
                  className="rounded-[36px] overflow-hidden border border-[#eedcd2] shadow-xl bg-[#241920]"
                >
                  <SmartMedia
                    url={reel.url}
                    type="instagram"
                    title={reel.title}
                    aspectRatio="aspect-[9/14]"
                    className="w-full h-full"
                  />
                  <div className="p-5 bg-[#fffaf6] border-t border-[#f0dfd7]">
                    <h4 className="text-base font-bold text-[#3a2d28]" style={{ fontFamily: 'Playfair Display' }}>
                      {reel.title}
                    </h4>
                    <button
                      onClick={() => openConsultation(reel.title)}
                      className="mt-3 text-xs uppercase tracking-wider text-[#d7a88c] hover:text-[#b88566] font-bold flex items-center gap-1.5"
                    >
                      Book this mascot act →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DETAILED MASCOT CHARACTERS & PACKAGES */}
        <section className="py-20 sm:py-28 bg-[#fffdfa] border-t border-[#f0dfd7]">
          <div className="container-custom">
            <div className="text-center mb-16 sm:mb-20">
              <span className="text-xs uppercase tracking-[4px] text-[#c99a7d] font-bold">Character Options</span>
              <h2
                className="text-4xl sm:text-5xl text-[#3a2d28] font-bold mt-2"
                style={{ fontFamily: 'Playfair Display' }}
              >
                Meet Our Mascot Friends
              </h2>
              <p className="text-[#8a7a72] mt-3 max-w-xl mx-auto">
                Handcrafted premium costumes with warm, engaging performers tailored for every celebration theme.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 lg:gap-10">
              {mascots.map((mascot) => (
                <div
                  key={mascot.id}
                  className="group flex flex-col justify-between rounded-[40px] border border-[#f0dfd7] bg-[#fffaf6] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={mascot.image}
                        alt={mascot.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-[#3a2d28] shadow-md">
                        {mascot.tagline}
                      </div>
                    </div>

                    <div className="p-7 sm:p-8">
                      <h3
                        className="text-3xl font-bold text-[#3a2d28] group-hover:text-[#d7a88c] transition-colors"
                        style={{ fontFamily: 'Playfair Display' }}
                      >
                        {mascot.name}
                      </h3>
                      <p className="mt-3 text-[#8a7a72] leading-relaxed text-sm">
                        {mascot.description}
                      </p>

                      {/* Features */}
                      <div className="mt-6 pt-5 border-t border-[#f0dfd7]">
                        <span className="text-xs uppercase tracking-wider text-[#b89a89] font-bold block mb-2">
                          Performance Highlights:
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          {mascot.features.map((feat, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-[#523d34]">
                              <span className="text-[#d7a88c]">★</span>
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Popular for pills */}
                      {mascot.popularFor && (
                        <div className="mt-5 flex flex-wrap gap-1.5">
                          {mascot.popularFor.map((tag, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-full bg-[#fdeee4] text-[#805f50] text-[11px] font-semibold"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-7 sm:p-8 pt-0">
                    <button
                      onClick={() => openConsultation(mascot.name)}
                      className="w-full rounded-full bg-[#d7a88c] hover:bg-[#c99a7d] text-white font-medium py-3.5 shadow-md transition hover:scale-105 text-sm"
                    >
                      Book {mascot.name}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST & QUALITY HIGHLIGHTS */}
        <section className="py-20 bg-gradient-to-r from-[#3a2630] to-[#25181f] text-white">
          <div className="container-custom">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                <FaShieldAlt className="text-4xl text-[#d7a88c] mx-auto mb-3" />
                <h4 className="text-lg font-bold font-serif">Sanitized Costumes</h4>
                <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                  Every plush costume is dry-cleaned, sanitized, and child-safe before every event.
                </p>
              </div>
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                <FaSmile className="text-4xl text-[#d7a88c] mx-auto mb-3" />
                <h4 className="text-lg font-bold font-serif">Trained Performers</h4>
                <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                  Energetic dancers and patient actors who know how to engage shy toddlers and excited crowds.
                </p>
              </div>
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                <FaStar className="text-4xl text-[#d7a88c] mx-auto mb-3" />
                <h4 className="text-lg font-bold font-serif">Punctual & Reliable</h4>
                <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                  Arrives 30 minutes in advance of your cake cutting to guarantee a grand on-time entry.
                </p>
              </div>
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                <FaHeart className="text-4xl text-[#d7a88c] mx-auto mb-3" />
                <h4 className="text-lg font-bold font-serif">Cherished Memories</h4>
                <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                  Unforgettable photo-ops with parents, grandparents, and children that last forever.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Unified Consultation Modal */}
      <InquiryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialService={selectedMascot}
      />
    </>
  );
};

export default MascotsPage;
