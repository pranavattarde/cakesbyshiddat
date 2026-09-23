import React from 'react';
import { useSiteContent } from '../../contexts/SiteContentContext';
import { FaArrowRight, FaMagic } from 'react-icons/fa';

interface OtherServicesSectionProps {
  onSelectService: (serviceName: string, isCustom?: boolean) => void;
}

export const OtherServicesSection: React.FC<OtherServicesSectionProps> = ({ onSelectService }) => {
  const { content } = useSiteContent();
  const services = content.otherServices.filter((s) => s.active);

  const standardServices = services.filter((s) => s.slug !== 'custom-service');
  const customService = services.find((s) => s.slug === 'custom-service') || {
    id: 'custom-service',
    slug: 'custom-service',
    title: 'Book Other / Customizable Service',
    description: 'Have a unique vision or customized requirement? Describe what you need and our creative planners will bring it to life.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d',
    highlights: ['100% Bespoke Planning', 'Tailor-Made Setups & Quotation', 'Dedicated Event Coordinator'],
    displayOrder: 99,
    active: true,
  };

  return (
    <section id="other-services" className="py-24 sm:py-32 bg-[#fffdfa] border-t border-[#f0dfd7]">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#fdeee4] border border-[#ecd8cc] text-xs uppercase tracking-[3px] font-bold text-[#c99a7d] mb-3">
            <span>✨</span>
            <span>Complete Celebration Management</span>
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#3a2d28]"
            style={{ fontFamily: 'Playfair Display' }}
          >
            Add-On & Specialized Services
          </h2>
          <p className="text-[#8a7a72] mt-4 text-base sm:text-lg leading-relaxed">
            Elevate your celebration with curated entertainment, master emcees, dramatic special effects, and personalized favors.
          </p>
        </div>

        {/* 8 Specialized Service Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {standardServices.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col justify-between bg-[#fffaf6] rounded-[32px] overflow-hidden border border-[#edd7cb] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#3a2d28] shadow-sm">
                    {service.icon || '✨'} {service.title}
                  </div>
                </div>

                <div className="p-6">
                  <h3
                    className="text-xl font-bold text-[#3a2d28] group-hover:text-[#d7a88c] transition-colors"
                    style={{ fontFamily: 'Playfair Display' }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#8a7a72] mt-2 line-clamp-3 leading-relaxed">
                    {service.description}
                  </p>

                  {service.highlights && (
                    <div className="mt-4 space-y-1.5 pt-3 border-t border-[#f2e2d8]">
                      {service.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-[#634e44]">
                          <span className="text-[#d7a88c]">✓</span>
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectService(service.title, false)}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-[#fdeee4] hover:bg-[#d7a88c] text-[#523d34] hover:text-white py-2.5 px-4 text-xs font-semibold transition"
                >
                  <span>Book {service.title}</span>
                  <FaArrowRight className="text-[10px]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CUSTOM SERVICE CALLOUT CARD */}
        <div className="mt-14 sm:mt-16 rounded-[40px] bg-gradient-to-r from-[#3a2630] via-[#2f1f28] to-[#25181f] text-white p-8 sm:p-14 relative overflow-hidden shadow-2xl border border-white/10">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#d7a88c]/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-[3px] text-[#e8be99] mb-3">
                <FaMagic className="text-amber-400" />
                <span>Bespoke Imagination</span>
              </span>
              <h3
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
                style={{ fontFamily: 'Playfair Display' }}
              >
                {customService.title}
              </h3>
              <p className="mt-4 text-gray-300 max-w-2xl text-base sm:text-lg leading-relaxed">
                {customService.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-4 text-xs sm:text-sm text-gray-200">
                <div className="flex items-center gap-2">
                  <span className="text-[#d7a88c]">✦</span>
                  <span>100% Customized Proposals</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#d7a88c]">✦</span>
                  <span>Direct Founder Consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#d7a88c]">✦</span>
                  <span>End-to-End Stress-Free Delivery</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={() => onSelectService('Book Other / Customizable Service', true)}
                className="rounded-full bg-gradient-to-r from-[#d7a88c] to-[#c99a7d] hover:brightness-110 text-white font-semibold px-8 py-4 shadow-lg text-center transition hover:scale-105"
              >
                Describe Your Requirement
              </button>
              <p className="text-center text-xs text-gray-400">
                No request is too grand or too unique.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OtherServicesSection;
