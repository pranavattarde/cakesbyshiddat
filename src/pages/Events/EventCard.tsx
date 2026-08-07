interface EventCardProps {
  title: string;
  category: string;
  image: string;
}

const EventCard = ({
  title,
  category,
  image,
}: EventCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-[36px]">
      <img
        src={image}
        alt={title}
        loading="lazy"
        decoding="async"
        className="h-[500px] w-full object-cover transition duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <div className="absolute bottom-0 left-0 p-8 text-white">
        <p className="uppercase tracking-[4px] text-sm">
          {category}
        </p>

        <h3
          className="text-3xl mt-3"
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

export default EventCard;
