import { Link } from "react-router-dom";
import { useState } from 'react';
import { InquiryModal } from '../InquiryModal';

const BookingCTA = () => {
  const [open, setOpen] = useState(false);
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white">
      <div className="container-custom">
        <div className="bg-[#3a2d28] rounded-[32px] sm:rounded-[48px] p-8 sm:p-12 lg:p-16 text-center shadow-xl">
          <p className="uppercase tracking-[4px] sm:tracking-[5px] text-[#d7a88c] font-semibold text-xs sm:text-sm">
            Let's Celebrate Together
          </p>

          <h2
            className="text-3xl sm:text-5xl lg:text-6xl text-white mt-4 sm:mt-6 font-bold leading-tight"
            style={{
              fontFamily: "Playfair Display",
            }}
          >
            Let's Create Your Dream Celebration
          </h2>

          <p className="max-w-2xl mx-auto mt-4 sm:mt-6 text-gray-300 text-sm sm:text-base leading-relaxed">
            Whether it's a birthday, wedding, baby shower, anniversary, or corporate event — we're here to make it unforgettable.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mt-8 sm:mt-10">
            <button
              onClick={() => setOpen(true)}
              className="w-full sm:w-auto bg-[#d7a88c] hover:bg-[#c99a7d] text-white px-8 py-3.5 sm:py-4 rounded-full font-medium text-sm sm:text-base transition shadow-md hover:scale-105 cursor-pointer"
            >
              Book Consultation
            </button>

            <Link
              to="/gallery"
              className="w-full sm:w-auto border border-white text-white hover:bg-white hover:text-[#3a2d28] px-8 py-3.5 sm:py-4 rounded-full font-medium text-sm sm:text-base transition text-center"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </div>
      <InquiryModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
};

export default BookingCTA;
