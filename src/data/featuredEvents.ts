export interface FeaturedEventItem {
  id: number;
  title: string;
  category: string;
  image: string;
  link: string;
}

export const featuredEvents: FeaturedEventItem[] = [
  {
    id: 1,
    title: "Wedding Events",
    category: "Luxury Events",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
    link: "/events#wedding-events",
  },
  {
    id: 2,
    title: "Birthday Celebrations",
    category: "Themed Parties",
    image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84",
    link: "/events#birthday-celebrations",
  },
  {
    id: 3,
    title: "Baby Shower Themes",
    category: "Pastel Elegance",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176",
    link: "/events#baby-shower",
  },
  {
    id: 4,
    title: "Anniversary Celebrations",
    category: "Romantic Celebrations",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
    link: "/events#anniversary-celebrations",
  },
  {
    id: 5,
    title: "Retirement Celebrations",
    category: "Milestone Honors",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=2000",
    link: "/events#retirement-celebrations",
  },
  {
    id: 6,
    title: "Engagement Celebrations",
    category: "Ring Ceremonies",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    link: "/events#engagement-celebrations",
  },
];