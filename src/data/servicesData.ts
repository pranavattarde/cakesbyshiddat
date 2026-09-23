export interface ServiceItemData {
  title: string;
  subtitle?: string;
  image: string;
  link: string;
}

export const services: ServiceItemData[] = [
  {
    title: "Luxury Cakes",
    subtitle: "24K Gold & Multi-Tier Sculptures",
    image: "https://res.cloudinary.com/n8ql5bui/image/upload/v1790159987/Screenshot_2026-09-23_160928_mebssm.png",
    link: "/cakes?category=luxury-cakes#luxury-cakes",
  },
  {
    title: "Wedding Events",
    subtitle: "Grand Stages & Exotic Florals",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
    link: "/events#wedding-events",
  },
  {
    title: "Birthday Celebrations",
    subtitle: "Custom Themed Balloon Extravaganza",
    image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84",
    link: "/events#birthday-celebrations",
  },
  {
    title: "Baby Shower Themes",
    subtitle: "Delicate Pastels & Mother-to-be Thrones",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176",
    link: "/events#baby-shower",
  },
  {
    title: "Mascot Services",
    subtitle: "Interactive Character & Dance Shows",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    link: "/mascots",
  },
  {
    title: "Anniversary Celebrations",
    subtitle: "Romantic Candlelight & Golden Jubilees",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
    link: "/events#anniversary-celebrations",
  },
  {
    title: "Retirement Celebrations",
    subtitle: "Dignified Career Milestone Tributes",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=2000",
    link: "/events#retirement-celebrations",
  },
  {
    title: "Engagement Celebrations",
    subtitle: "Dreamy Ring Exchange Ceremonies",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    link: "/events#engagement-celebrations",
  },
];