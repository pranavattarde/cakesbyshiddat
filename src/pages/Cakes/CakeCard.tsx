interface CakeCardProps {
  image: string;
  title: string;
  category: string;
}

const CakeCard = ({
  image,
  title,
  category,
}: CakeCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-[32px]">
      <img
        src={image}
        alt={title}
        loading="lazy"
        decoding="async"
        className="h-[400px] w-full object-cover transition duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <div className="absolute bottom-0 p-6 text-white">
        <p className="text-sm uppercase tracking-[3px]">
          {category}
        </p>

        <h3
          className="text-2xl mt-2"
          style={{
            fontFamily: "Playfair Display",
          }}
        >
          {title}
        </h3>
      </div>
    </div>
  );
};

export default CakeCard;
