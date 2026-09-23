import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

interface ServiceCardProps {
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, subtitle, image, link = '/events' }) => {
  return (
    <Link to={link} className="group block focus:outline-none">
      <div className="h-full flex flex-col bg-[#fffaf6] rounded-[32px] overflow-hidden border border-[#edd7cb] shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        <div className="relative overflow-hidden aspect-[16/11]">
          <img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
          <div>
            {subtitle && (
              <span className="text-[11px] uppercase tracking-[3px] text-[#c99a7d] font-bold block mb-1">
                {subtitle}
              </span>
            )}
            <h3
              className="text-2xl font-bold text-[#3a2d28] group-hover:text-[#d7a88c] transition-colors"
              style={{ fontFamily: 'Playfair Display' }}
            >
              {title}
            </h3>
          </div>

          <div className="mt-5 pt-4 border-t border-[#f2e2d8] flex items-center justify-between text-sm font-semibold text-[#8a7a72] group-hover:text-[#d7a88c] transition-colors">
            <span>Explore Experience</span>
            <div className="w-8 h-8 rounded-full bg-[#fdeee4] group-hover:bg-[#d7a88c] group-hover:text-white text-[#d7a88c] flex items-center justify-center transition-all group-hover:translate-x-1 shadow-sm">
              <FaArrowRight className="text-xs" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
