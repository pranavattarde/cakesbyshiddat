export interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'instagram' | 'youtube';
  url: string;
  thumbnail?: string;
  title: string;
  description?: string;
  duration?: number; // for images (defaults to 4s) or fallback
  displayOrder: number;
  active: boolean;
}

export interface ServiceCategory {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  badge?: string;
  coverImage: string;
  media: MediaItem[];
  features?: string[];
  startingPrice?: string;
  displayOrder: number;
  active: boolean;
}

export interface OtherServiceItem {
  id: string;
  slug: string;
  title: string;
  icon?: string;
  description: string;
  image: string;
  highlights: string[];
  displayOrder: number;
  active: boolean;
}

export interface MascotItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  reels?: string[];
  features: string[];
  popularFor: string[];
  displayOrder: number;
  active: boolean;
}

export interface SiteContentData {
  hero: {
    cakes: {
      title: string;
      subtitle: string;
      ctaText: string;
      ctaLink: string;
      media: MediaItem[];
    };
    events: {
      title: string;
      subtitle: string;
      ctaText: string;
      ctaLink: string;
      media: MediaItem[];
    };
    mascots: {
      title: string;
      subtitle: string;
      ctaText: string;
      ctaLink: string;
      media: MediaItem[];
    };
  };
  cakeCategories: ServiceCategory[];
  eventCategories: ServiceCategory[];
  otherServices: OtherServiceItem[];
  mascots: MascotItem[];
}

const STORAGE_KEY = 'cbs_site_content_data_v1';

export const INITIAL_SITE_CONTENT: SiteContentData = {
  hero: {
    cakes: {
      title: 'Luxury Cakes',
      subtitle: 'Artisanal Handcrafted Perfection',
      ctaText: 'Explore Cakes',
      ctaLink: '/cakes',
      media: [
        {
          id: 'cake-hero-1',
          type: 'image',
          url: 'https://res.cloudinary.com/n8ql5bui/image/upload/v1790159987/Screenshot_2026-09-23_160928_mebssm.png',
          title: 'Royal Luxury Multi-Tier Cake',
          duration: 4,
          displayOrder: 1,
          active: true,
        },
        {
          id: 'cake-hero-2',
          type: 'image',
          url: 'https://res.cloudinary.com/n8ql5bui/image/upload/v1790159863/Screenshot_2026-09-23_160155_kqa9f5.png',
          title: 'Elegance Floral Celebration Cake',
          duration: 4,
          displayOrder: 2,
          active: true,
        },
        {
          id: 'cake-hero-3',
          type: 'image',
          url: 'https://res.cloudinary.com/n8ql5bui/image/upload/v1790159863/Screenshot_2026-09-23_155903_m47cow.png',
          title: 'Gourmet Handcrafted Delight',
          duration: 4,
          displayOrder: 3,
          active: true,
        },
      ],
    },
    events: {
      title: 'Grand Celebrations',
      subtitle: 'Unforgettable Event Planning',
      ctaText: 'View Events',
      ctaLink: '/events',
      media: [
        {
          id: 'event-hero-1',
          type: 'instagram',
          url: 'https://www.instagram.com/reel/Dbs8kcTz-KK/',
          title: 'Magical Wedding Entrance & Stage Decor',
          duration: 10,
          displayOrder: 1,
          active: true,
        },
        {
          id: 'event-hero-2',
          type: 'instagram',
          url: 'https://www.instagram.com/reel/DdgPRRUTQni/',
          title: 'Grand Birthday Celebration Setup',
          duration: 10,
          displayOrder: 2,
          active: true,
        },
        {
          id: 'event-hero-3',
          type: 'instagram',
          url: 'https://www.instagram.com/reel/DdlXXc_zeIT/',
          title: 'Luxury Baby Shower & Welcome Home',
          duration: 10,
          displayOrder: 3,
          active: true,
        },
        {
          id: 'event-hero-4',
          type: 'instagram',
          url: 'https://www.instagram.com/reel/DdW1GcSzU7M/',
          title: 'Royal Anniversary Celebration Dinner',
          duration: 10,
          displayOrder: 4,
          active: true,
        },
      ],
    },
    mascots: {
      title: 'Kids & Mascots',
      subtitle: 'Joyful Mascot Entertainment',
      ctaText: 'Discover Mascots',
      ctaLink: '/mascots',
      media: [
        {
          id: 'mascot-hero-1',
          type: 'instagram',
          url: 'https://www.instagram.com/reel/DW0PYulsxu9/',
          title: 'Cartoon Mascot Celebration Dance',
          duration: 10,
          displayOrder: 1,
          active: true,
        },
        {
          id: 'mascot-hero-2',
          type: 'instagram',
          url: 'https://www.instagram.com/reel/DdiOtOGzqz1/',
          title: 'Kids Party Mascot Fun & Photos',
          duration: 10,
          displayOrder: 2,
          active: true,
        },
        {
          id: 'mascot-hero-3',
          type: 'instagram',
          url: 'https://www.instagram.com/reel/DdbgPJNzs-w/',
          title: 'Grand Mascot Entry at Birthday Bash',
          duration: 10,
          displayOrder: 3,
          active: true,
        },
      ],
    },
  },
  cakeCategories: [
    {
      id: 'luxury-cakes',
      slug: 'luxury-cakes',
      title: 'Luxury Cakes',
      badge: 'Signature',
      subtitle: 'Opulent Multi-Tier Designs with 24K Edible Gold & Fresh Florals',
      description: 'Our crown jewel creations designed for prestigious weddings, grand receptions, and VIP milestones. Handcrafted by master bakers with customized architectural designs.',
      coverImage: 'https://res.cloudinary.com/n8ql5bui/image/upload/v1790159987/Screenshot_2026-09-23_160928_mebssm.png',
      startingPrice: '₹3,500',
      features: ['24k Edible Gold Accents', 'Custom Fondant Sculpting', 'Exotic Flavor Combinations', 'Temperature Controlled Delivery'],
      displayOrder: 1,
      active: true,
      media: [
        {
          id: 'lux-1',
          type: 'image',
          url: 'https://res.cloudinary.com/n8ql5bui/image/upload/v1790159987/Screenshot_2026-09-23_160928_mebssm.png',
          title: 'Grand Royal Tier Cake',
          displayOrder: 1,
          active: true,
        },
        {
          id: 'lux-2',
          type: 'image',
          url: 'https://res.cloudinary.com/n8ql5bui/image/upload/v1790159863/Screenshot_2026-09-23_160155_kqa9f5.png',
          title: 'Floral Cascade Luxe Cake',
          displayOrder: 2,
          active: true,
        },
      ],
    },
    {
      id: 'wedding-cakes',
      slug: 'wedding-cakes',
      title: 'Wedding Cakes',
      subtitle: 'Memorable Centerpieces for Your Special Day',
      description: 'Elegant multi-tier wedding cakes customized to match your wedding floral palette, theme, and couple story.',
      coverImage: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d',
      startingPrice: '₹2,800',
      features: ['Couple initials embossing', 'Custom sugar flowers', 'Tasting sessions available', 'Venue setup coordination'],
      displayOrder: 2,
      active: true,
      media: [],
    },
    {
      id: 'birthday-cakes',
      slug: 'birthday-cakes',
      title: 'Birthday Cakes',
      subtitle: 'Celebrate Every Milestone With Flavor & Fun',
      description: 'From whimsical first birthday smash cakes to modern geometric milestone cakes for all ages.',
      coverImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
      startingPrice: '₹1,200',
      features: ['Eggless options available', 'Theme customization', 'Pinata and pull-up cakes', 'Rich chocolate ganache'],
      displayOrder: 3,
      active: true,
      media: [],
    },
    {
      id: 'anniversary-cakes',
      slug: 'anniversary-cakes',
      title: 'Anniversary Cakes',
      subtitle: 'Commemorating Love Stories & Milestones',
      description: 'Romantic floral designs, silver and golden jubilee themes, and personalized photo frames.',
      coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc',
      startingPrice: '₹1,400',
      features: ['Red velvet with cream cheese', 'Heart & vintage piping', 'Golden jubilee accents', 'Midnight delivery available'],
      displayOrder: 4,
      active: true,
      media: [],
    },
    {
      id: 'engagement-cakes',
      slug: 'engagement-cakes',
      title: 'Engagement Cakes',
      subtitle: 'Cherished Beginnings & Ring Ceremonies',
      description: 'Sophisticated pastel tones, edible ring box toppers, and delicate lace patterns celebrating your promise.',
      coverImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
      startingPrice: '₹2,000',
      features: ['Ring topper integration', 'Pastel watercolor finishes', 'Hand-painted details', 'Premium packaging'],
      displayOrder: 5,
      active: true,
      media: [],
    },
    {
      id: 'roka-cakes',
      slug: 'roka-cakes',
      title: 'Roka Cakes',
      subtitle: 'Traditional Joy Blended with Modern Elegance',
      description: 'Auspicious festive designs featuring saffron creams, pista cardamom infusions, and royal maroon or gold accents.',
      coverImage: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84',
      startingPrice: '₹1,600',
      features: ['Indian fusion flavours', 'Traditional blessings lettering', 'Pure vegetarian preparation', 'Gold leaf highlights'],
      displayOrder: 6,
      active: true,
      media: [],
    },
    {
      id: 'retirement-cakes',
      slug: 'retirement-cakes',
      title: 'Retirement Cakes',
      subtitle: 'Honoring Years of Dedication & Success',
      description: 'Thoughtful personalized cakes celebrating careers in armed forces, education, healthcare, and corporate leadership.',
      coverImage: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3',
      startingPrice: '₹1,500',
      features: ['Profession emblem sculpting', 'Custom farewell messages', 'Elegant dignified color schemes', 'Large gathering sizes'],
      displayOrder: 7,
      active: true,
      media: [],
    },
    {
      id: 'decoration-cakes',
      slug: 'decoration-cakes',
      title: 'Decoration Cakes',
      subtitle: 'Theme-Centric Art Pieces for Photo Perfection',
      description: 'Interactive cakes with working fairy lights, spinning elements, acrylic toppers, and dramatic textures.',
      coverImage: 'https://res.cloudinary.com/n8ql5bui/image/upload/v1790159863/Screenshot_2026-09-23_155903_m47cow.png',
      startingPrice: '₹1,800',
      features: ['3D fondant figurines', 'Mirror glaze finishes', 'Geometric origami chocolate', 'Custom prop coordination'],
      displayOrder: 8,
      active: true,
      media: [],
    },
  ],
  eventCategories: [
    {
      id: 'wedding-events',
      slug: 'wedding-events',
      title: 'Wedding Events',
      badge: 'Grand',
      subtitle: 'Complete Wedding Stage, Floral Mandap & Luxury Decor',
      description: 'From intimate Haldi and Mehendi setups to awe-inspiring Varmala stages and grand wedding receptions, we handle complete decoration and styling.',
      coverImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
      features: ['Designer Mandap & Stage Styling', 'Imported Exotic Floral Art', 'Thematic Entry Walkways & Lighting', 'Couple Seating & Photo Booths'],
      displayOrder: 1,
      active: true,
      media: [
        {
          id: 'ev-reels-1',
          type: 'instagram',
          url: 'https://www.instagram.com/reel/Dbs8kcTz-KK/',
          title: 'Wedding Decor Highlights',
          displayOrder: 1,
          active: true,
        },
      ],
    },
    {
      id: 'birthday-celebrations',
      slug: 'birthday-celebrations',
      title: 'Birthday Celebrations',
      subtitle: 'Themed Birthdays from 1st Year Smash to Grand 50th Galas',
      description: 'Custom balloon arches, neon backdrops, theme setups (Jungle, Barbie, Space, Superhero), lighting, and full entertainment.',
      coverImage: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84',
      features: ['Custom Themed Balloon Styling', 'Personalized 3D Cutouts & Backdrops', 'LED Neon Signboards', 'Kids Activity & Fun Stations'],
      displayOrder: 2,
      active: true,
      media: [
        {
          id: 'ev-reels-2',
          type: 'instagram',
          url: 'https://www.instagram.com/reel/DdgPRRUTQni/',
          title: 'Birthday Bash Decor',
          displayOrder: 1,
          active: true,
        },
      ],
    },
    {
      id: 'baby-shower',
      slug: 'baby-shower',
      title: 'Baby Shower',
      subtitle: 'Welcoming New Blessings with Tender Pastel Elegance',
      description: 'Gentle pastel palettes, teddy bear motifs, floral clouds, hot air balloon themes, and photo corners for mom-to-be.',
      coverImage: 'https://images.unsplash.com/photo-1513151233558-d860c5398176',
      features: ['Pastel & Gold Balloon Garland', 'Mom-to-be Throne Seating', 'Cradle Decoration & Floral Ring', 'Keepsake Guest Wishing Tree'],
      displayOrder: 3,
      active: true,
      media: [
        {
          id: 'ev-reels-3',
          type: 'instagram',
          url: 'https://www.instagram.com/reel/DdlXXc_zeIT/',
          title: 'Baby Shower Setup Reel',
          displayOrder: 1,
          active: true,
        },
      ],
    },
    {
      id: 'anniversary-celebrations',
      slug: 'anniversary-celebrations',
      title: 'Anniversary Celebrations',
      subtitle: 'Romantic Candlelight & Elegant Jubilee Setups',
      description: 'Intimate terrace candle-light dinners, floral arches, cabaret lighting, and milestone 25th / 50th family celebration banquets.',
      coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc',
      features: ['Fairy Light Canopy & Candle Avenues', 'Memory Photo Wall / Chandelier', 'Acoustic Music Coordination', 'Signature Cake Cutting Stage'],
      displayOrder: 4,
      active: true,
      media: [
        {
          id: 'ev-reels-4',
          type: 'instagram',
          url: 'https://www.instagram.com/reel/DdW1GcSzU7M/',
          title: 'Anniversary Celebration Reel',
          displayOrder: 1,
          active: true,
        },
      ],
    },
    {
      id: 'retirement-celebrations',
      slug: 'retirement-celebrations',
      title: 'Retirement Celebrations',
      subtitle: 'Prestigious Milestones Honoring a Life of Achievement',
      description: 'Dignified stage backdrops, ceremonial podium setups, golden jubilee themes, and personalized photo retrospective galleries.',
      coverImage: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=2000',
      features: ['Dignified Stage & Floral Framing', 'Career Retrospective Display Board', 'Customized Memento / Trophy Table', 'Audio-Visual Tribute Setup'],
      displayOrder: 5,
      active: true,
      media: [],
    },
    {
      id: 'engagement-celebrations',
      slug: 'engagement-celebrations',
      title: 'Engagement Celebrations',
      subtitle: 'The First Spark of Forever — Romantic Ring Ceremonies',
      description: 'Chic floral rings, botanical arches, personalized neon couple hashtags, and fairy-lit walkways for the perfect engagement.',
      coverImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
      features: ['Ring Exchange Stage & Floral Ring', 'Couple Hashtag Neon Backdrop', 'Dry Ice & Cold Pyro Entry Effects', 'Grand Guest Welcome Board'],
      displayOrder: 6,
      active: true,
      media: [],
    },
  ],
  otherServices: [
    {
      id: 'entertainment',
      slug: 'entertainment',
      title: 'Live Entertainment',
      icon: '🎵',
      description: 'Live acoustic bands, professional DJs, dhol players, and cultural performers to keep your guests energized throughout the celebration.',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
      highlights: ['Professional sound & stage setup', 'Curated playlists & live requests', 'Dynamic lighting integration'],
      displayOrder: 1,
      active: true,
    },
    {
      id: 'games',
      slug: 'games',
      title: 'Party Games & Hosts',
      icon: '🎯',
      description: 'Engaging interactive party games, quizzes, team challenges, and fun competitions for kids and adults alike.',
      image: 'https://images.unsplash.com/photo-1511882150382-421056c89033',
      highlights: ['Customized games according to age group', 'Fun prizes & giveaways included', 'Dedicated energetic activity master'],
      displayOrder: 2,
      active: true,
    },
    {
      id: 'anchor',
      slug: 'anchor',
      title: 'Professional Anchor / Emcee',
      icon: '🎤',
      description: 'Charismatic bilingual event anchors who keep the ceremony flowing smoothly, engage the audience, and ensure unforgettable memories.',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2',
      highlights: ['Custom script & itinerary planning', 'Bilingual (Hindi / English / Punjabi)', 'Special couple & family engagement'],
      displayOrder: 3,
      active: true,
    },
    {
      id: 'tattoo-artist',
      slug: 'tattoo-artist',
      title: 'Tattoo & Glitter Art',
      icon: '🎨',
      description: 'Safe, dermatologically tested temporary airbrush, glitter, and bio-friendly henna tattoo artists loved by children and young guests.',
      image: 'https://images.unsplash.com/photo-1562962230-16e4623d36e6',
      highlights: ['Skin-safe hypoallergenic glitter & colors', 'Over 100+ creative stencil designs', 'Instant quick application'],
      displayOrder: 4,
      active: true,
    },
    {
      id: 'magician',
      slug: 'magician',
      title: 'Magic & Illusion Show',
      icon: '🪄',
      description: 'Spellbinding close-up sleight of hand, stage illusions, and comic magic shows that leave both young and old in awe.',
      image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5',
      highlights: ['Interactive 45-minute stage show', 'Special birthday child illusion trick', 'Kid-friendly comedy & wonder'],
      displayOrder: 5,
      active: true,
    },
    {
      id: 'venue',
      slug: 'venue',
      title: 'Venue Selection & Styling',
      icon: '🏛️',
      description: 'Assistance in selecting and coordinating scenic banquet halls, lush farmhouses, rooftop cafes, or bespoke indoor venues across Haryana.',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
      highlights: ['Partner rates with top venues', 'Capacity & layout mapping', 'Power backup & logistics management'],
      displayOrder: 6,
      active: true,
    },
    {
      id: 'sfx',
      slug: 'sfx',
      title: 'SFX & Cold Pyro Effects',
      icon: '✨',
      description: 'Cold firework sparklers, heavy dry-ice fog clouds for couple entries, confetti blasters, and snow machines for dramatic photo moments.',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
      highlights: ['100% smokeless & indoor-safe cold pyro', 'Dense low-lying dry ice clouds', 'Remote synchronized firing'],
      displayOrder: 7,
      active: true,
    },
    {
      id: 'return-gifts',
      slug: 'return-gifts',
      title: 'Custom Return Gifts & Favors',
      icon: '🎁',
      description: 'Customized gift hampers, artisanal brownies & macaron boxes, personalized stationery, eco-friendly plants, and custom-packaged favor kits.',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48',
      highlights: ['Custom ribbon branding with name', 'Fresh edible handcrafted treats', 'Eco-friendly sustainable packaging'],
      displayOrder: 8,
      active: true,
    },
    {
      id: 'custom-service',
      slug: 'custom-service',
      title: 'Book Other / Customizable Service',
      icon: '⭐',
      description: 'Have a unique vision or specialized requirement not listed above? Describe what you envision and our creative team will design a tailor-made package for you.',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d',
      highlights: ['100% bespoke planning & pricing', 'Direct consultation with our founders', 'Zero limitations on creativity'],
      displayOrder: 9,
      active: true,
    },
  ],
  mascots: [
    {
      id: 'mickey-minnie',
      slug: 'mickey-minnie',
      name: 'Mickey & Minnie Mascots',
      tagline: 'Timeless Disney Magic',
      description: 'Premium plush character mascots that dance, greet guests at the entrance, pose for memorable photographs, and assist in the cake-cutting celebration.',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
      features: ['Grand Entry Walk', 'Cake Cutting Celebration Assist', 'Photo Booth Sessions', 'Kids Dance & Game Interaction'],
      popularFor: ['1st Birthdays', 'Toddler Parties', 'Carnival Celebrations'],
      reels: [
        'https://www.instagram.com/reel/DW0PYulsxu9/',
        'https://www.instagram.com/reel/DdiOtOGzqz1/',
      ],
      displayOrder: 1,
      active: true,
    },
    {
      id: 'superheroes',
      slug: 'superheroes',
      name: 'Superhero Mascots',
      tagline: 'Action-Packed Hero Entries',
      description: 'Spiderman, Batman, and Iron Man heroic entries featuring dramatic theme music, poses, agility moves, and interactive martial arts or games.',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401',
      features: ['Action Stunt Entries', 'Hero Training Fun for Kids', 'Theme Music Soundtracks', 'Exclusive Birthday Champion Photo Session'],
      popularFor: ['Kids Birthdays', 'School Events', 'Mall Activations'],
      reels: [
        'https://www.instagram.com/reel/DdbgPJNzs-w/',
      ],
      displayOrder: 2,
      active: true,
    },
    {
      id: 'teddy-bear',
      slug: 'teddy-bear',
      name: 'Giant Pastel Teddy Bear Mascots',
      tagline: 'Warm Hugs & Baby Shower Delight',
      description: 'Gentle, oversized pastel blue and blush pink fluffy teddy bears ideal for baby showers, gender reveals, and first birthday celebrations.',
      image: 'https://images.unsplash.com/photo-1558877385-81a1c7e67d72',
      features: ['Cradle Entrance Accompaniment', 'Warm Hugs & Warm Welcome Host', 'Aesthetic Pastel Photo Moments', 'Soft Movement & Child-Safe Fabrics'],
      popularFor: ['Baby Showers', 'Welcome Home Baby', 'Princess Themed Birthdays'],
      reels: [
        'https://www.instagram.com/reel/DW0PYulsxu9/',
      ],
      displayOrder: 3,
      active: true,
    },
    {
      id: 'dancing-panda',
      slug: 'dancing-panda',
      name: 'Inflatable Dancing Panda & Mirror Man',
      tagline: 'Energetic Dance Floor Igniters',
      description: 'High-energy giant 8-foot inflatable dancing panda and mirror-costume entertainers that bring viral dance floor excitement to sangeets and parties.',
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d',
      features: ['8-Foot Inflatable Giant Stature', 'Bhangra & Bollywood Dance Routines', 'Unstoppable Energy & Crowd Engagement', 'LED & Reflective Mirror Suits'],
      popularFor: ['Wedding Sangeet', 'Cocktail Nights', 'Milestone Birthday Bashes'],
      reels: [
        'https://www.instagram.com/reel/DdiOtOGzqz1/',
        'https://www.instagram.com/reel/DdbgPJNzs-w/',
      ],
      displayOrder: 4,
      active: true,
    },
  ],
};

export const siteContentService = {
  get: (): SiteContentData => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as SiteContentData;
        return {
          ...INITIAL_SITE_CONTENT,
          ...parsed,
          hero: {
            ...INITIAL_SITE_CONTENT.hero,
            ...(parsed.hero || {}),
          },
        };
      }
    } catch (e) {
      console.warn('Failed to load stored site content, using initial content', e);
    }
    return INITIAL_SITE_CONTENT;
  },

  save: (data: SiteContentData): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent('cbs_site_content_updated', { detail: data }));
    } catch (e) {
      console.error('Failed to save site content to localStorage', e);
    }
  },

  reset: (): SiteContentData => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('cbs_site_content_updated', { detail: INITIAL_SITE_CONTENT }));
    } catch (e) {
      console.error('Failed to reset site content', e);
    }
    return INITIAL_SITE_CONTENT;
  },
};
