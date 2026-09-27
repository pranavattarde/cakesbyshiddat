import React from 'react';
import { FaTimes, FaWhatsapp, FaPhoneAlt, FaClock, FaCheckCircle } from 'react-icons/fa';
import { useSettings } from '../hooks/useSettings';

interface InquiryModalProps {
  open: boolean;
  onClose: () => void;
  initialService?: string;
  isCustomService?: boolean;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  open,
  onClose,
  initialService = 'Luxury Cakes & Celebrations',
  isCustomService = false,
}) => {
  const { settings } = useSettings();

  if (!open) return null;

  const rawPhone = settings?.whatsapp || settings?.phone || '+91 9999999999';
  const cleanPhone = rawPhone.replace(/\D/g, '') || '919999999999';
  const displayPhone = settings?.phone || settings?.whatsapp || '+91 99999 99999';

  const serviceName = isCustomService
    ? 'Customized Celebration Planning'
    : initialService;

  const whatsappMessage = `Hi Cakes by Shiddat! I would like to book a consultation for ${serviceName}. Please share details, custom designs, and pricing.`;
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMessage)}`;
  const callUrl = `tel:${cleanPhone}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 backdrop-blur-md p-4 overflow-y-auto animate-fade-in"
      onMouseDown={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-[36px] border border-[#ebdcd3] bg-gradient-to-b from-[#fffdfa] via-[#fffaf6] to-[#fbf3ec] p-6 sm:p-10 shadow-2xl my-8 transition-all"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/90 border border-[#eddcd2] shadow-sm flex items-center justify-center text-[#554037] hover:bg-[#faede5] hover:text-[#d7a88c] transition cursor-pointer"
          aria-label="Close modal"
        >
          <FaTimes className="text-base" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fdeee4] border border-[#ecd7cb] text-[11px] font-bold uppercase tracking-[3px] text-[#c99a7d] mb-4">
            <span>✨</span>
            <span>Direct VIP Consultation</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl font-bold text-[#3a2d28] tracking-tight"
            style={{ fontFamily: 'Playfair Display' }}
          >
            Book Consultation
          </h2>

          <p className="mt-2 text-sm sm:text-base text-[#8a7a72] max-w-md mx-auto">
            Connect directly with our master bakers and event designers for{' '}
            <strong className="text-[#3a2d28] font-semibold">{serviceName}</strong>.
          </p>
        </div>

        {/* Two Clean Direct Actions: WhatsApp & Call ONLY */}
        <div className="space-y-4">
          {/* Primary Action: WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white p-5 shadow-lg shadow-[#25D366]/25 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl shrink-0 group-hover:rotate-6 transition-transform">
                <FaWhatsapp />
              </div>
              <div className="text-left flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg text-white">Chat on WhatsApp</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/25 px-2.5 py-0.5 rounded-full">
                    Instant Reply
                  </span>
                </div>
                <p className="text-xs text-white/90 mt-0.5">
                  Share reference photos, discuss custom themes & get instant pricing
                </p>
              </div>
            </div>
          </a>

          {/* Secondary Action: Direct Phone Call */}
          <a
            href={callUrl}
            className="group block w-full rounded-2xl bg-white hover:bg-[#fff5ee] border-2 border-[#d7a88c] text-[#3a2d28] p-5 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#fdeee4] flex items-center justify-center text-2xl text-[#d7a88c] shrink-0 group-hover:scale-110 transition-transform">
                <FaPhoneAlt />
              </div>
              <div className="text-left flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg text-[#3a2d28]">Call Us Directly</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#d7a88c]/15 text-[#b37957] px-2.5 py-0.5 rounded-full">
                    Direct Line
                  </span>
                </div>
                <p className="text-sm font-semibold text-[#c99a7d] mt-0.5">
                  {displayPhone}
                </p>
                <p className="text-[11px] text-[#8a7a72]">
                  Speak directly with our founder & celebration planner
                </p>
              </div>
            </div>
          </a>
        </div>

        {/* Reassurance & Timing Strip */}
        <div className="mt-8 pt-6 border-t border-[#ebdcd3] text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-xs text-[#7a675d] font-medium">
            <FaClock className="text-[#d7a88c]" />
            <span>Available 7 Days a Week • 9:00 AM – 9:00 PM</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-[#9c897f]">
            <span className="inline-flex items-center gap-1">
              <FaCheckCircle className="text-emerald-500 text-[10px]" /> 100% Handcrafted
            </span>
            <span className="inline-flex items-center gap-1">
              <FaCheckCircle className="text-emerald-500 text-[10px]" /> Custom Designs
            </span>
            <span className="inline-flex items-center gap-1">
              <FaCheckCircle className="text-emerald-500 text-[10px]" /> Express Delivery
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;
