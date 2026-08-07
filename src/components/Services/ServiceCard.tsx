interface ServiceCardProps {
  title: string;
  image: string;
}

const ServiceCard = ({ title, image }: ServiceCardProps) => {
  return (
    <div className="group cursor-pointer">
      <div className="bg-white rounded-[28px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        
        <div className="overflow-hidden">
          <img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            className="h-64 w-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>

        <div className="p-6 text-center">
          <h3
            className="text-2xl text-[#3a2d28]"
            style={{
              fontFamily: "Playfair Display",
            }}
          >
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
