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
    <div className="bg-white rounded-[32px] overflow-hidden shadow-lg">
      <img
        src={image}
        alt={name}
        loading="lazy"
        decoding="async"
        className="h-[400px] w-full object-cover"
      />

      <div className="p-8 text-center">
        <h3
          className="text-3xl text-[#3a2d28]"
          style={{
            fontFamily: "Playfair Display",
          }}
        >
          {name}
        </h3>

        <p className="mt-2 text-[#d7a88c]">
          {role}
        </p>
      </div>
    </div>
  );
};
export default FounderCard;
