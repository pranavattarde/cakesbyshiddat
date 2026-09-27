interface FounderCardProps {
  name: string;
  role: string;
  image: string;
}

const FounderCard = ({
  name,
  role,
  image,
}: FounderCardProps) => {
  return (
    <div className="bg-white rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-lg border border-[#f0dfd7]">
      <img
        src={image}
        alt={name}
        loading="lazy"
        decoding="async"
        className="h-72 sm:h-80 md:h-[380px] lg:h-[400px] w-full object-cover"
      />

      <div className="p-6 sm:p-8 text-center">
        <h3
          className="text-2xl sm:text-3xl font-bold text-[#3a2d28]"
          style={{
            fontFamily: "Playfair Display",
          }}
        >
          {name}
        </h3>

        <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-[#d7a88c] font-medium">
          {role}
        </p>
      </div>
    </div>
  );
};

export default FounderCard;
