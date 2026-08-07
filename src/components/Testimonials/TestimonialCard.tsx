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
    <div className="bg-white rounded-[32px] p-8 shadow-lg">
      <div className="flex gap-1 text-[#d4af37] mb-6">
        {[...Array(rating)].map((_, i) => (
          <FaStar key={i} />
        ))}
      </div>

      <p className="text-[#8a7a72] leading-8">
        "{review}"
      </p>

      <div className="mt-8">
        <h4 className="font-semibold text-[#3a2d28]">
          {name}
        </h4>

        <p className="text-sm text-[#d7a88c]">
          {event}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;