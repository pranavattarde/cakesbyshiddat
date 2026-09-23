import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

interface EventCardProps {
  title: string;
  category: string;
  image: string;
  link?: string;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  category,
  image,
  link = '/events',
}) => {
  return (
    <Link to={link} className="group relative block overflow-hidden rounded-[36px] shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 focus:outline-none">
      <div className="aspect-[16/11] sm:aspect-[4/3] w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity group-hover:from-black/90" />

      {/* Top category pill */}
      <div className="absolute top-6 left-6 z-10">
        <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold uppercase tracking-[3px]">
          {category}
        </span>
      </div>

      {/* Bottom title & CTA */}
      <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 flex items-end justify-between z-10 text-white">
        <div>
          <h3
            className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-pink-200 transition-colors"
            style={{ fontFamily: "Playfair Display" }}
          >
            {title}
          </h3>
          <span className="text-xs uppercase tracking-[2px] text-pink-200/90 font-medium mt-1 inline-block">
            View Experience & Styling Details
          </span>
        </div>

        <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-md group-hover:bg-[#d7a88c] text-white flex items-center justify-center transition-all group-hover:scale-110 shadow-md">
          <FaArrowRight className="text-sm" />
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
