import { Link } from "react-router-dom";
import { useState } from 'react';
import { InquiryModal } from '../InquiryModal';

const BookingCTA = () => {
  const [open, setOpen] = useState(false);
  return (
    <section className="py-32 bg-white">
      <div className="container-custom">

        <div className="bg-[#3a2d28] rounded-[48px] p-16 text-center">

          <p className="uppercase tracking-[5px] text-[#d7a88c]">
            Let's Celebrate Together
          </p>

          <h2
            className="text-5xl md:text-6xl text-white mt-6"
            style={{
              fontFamily: "Playfair Display",
            }}
          >
            Let's Create Your Dream Celebration
          </h2>

          <p className="max-w-2xl mx-auto mt-8 text-gray-300">
            Whether it's a birthday, wedding, baby shower,
            anniversary, or corporate event — we're here
            to make it unforgettable.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-10">

            <button onClick={() => setOpen(true)} className="bg-[#d7a88c] text-white px-8 py-4 rounded-full">
              Book Consultation
            </button>

            <Link to="/gallery" className="border border-white text-white px-8 py-4 rounded-full">
              View Gallery
            </Link>

          </div>

        </div>

      </div>
    <InquiryModal open={open} onClose={() => setOpen(false)} /></section>
  );
};

export default BookingCTA;
