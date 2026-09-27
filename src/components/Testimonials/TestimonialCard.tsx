import { FaStar } from "react-icons/fa";

interface TestimonialCardProps {
  name: string;
  event: string;
  review: string;
  rating: number;
}

const TestimonialCard = ({
  name,
  event,
  review,
  rating,
}: TestimonialCardProps) => {
  return (
    <div className="bg-[#fffdfa] rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all border border-[#f0dfd7] flex flex-col justify-between">
      <div>
        <div className="flex gap-1 text-[#d4af37] mb-4 sm:mb-6 text-sm sm:text-base">
          {[...Array(rating)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>

        <p className="text-[#8a7a72] leading-relaxed text-sm sm:text-base italic">
          "{review}"
        </p>
      </div>

      <div className="mt-6 sm:mt-8 pt-4 border-t border-[#f4e6de]">
        <h4 className="font-bold text-[#3a2d28] text-base sm:text-lg">
          {name}
        </h4>

        <p className="text-xs sm:text-sm text-[#d7a88c] font-medium mt-0.5">
          {event}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;