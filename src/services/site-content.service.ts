import {
  mascotReel1,
  mascotReel2,
  mascotReel3,
  eventsReel1,
  eventsReel2,
  eventReel3,
  eventReel4,
} from '../assets/videos/index';
import { SHOW_RUPEE_PRICES, ORIGINAL_PRICE_CATALOG } from '../data/priceCatalogBackup';

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

const STORAGE_KEY = 'cbs_site_content_data_v2';

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
          type: 'video',
          url: eventsReel1,
          title: 'Grand Wedding Entrance & Floral Decor',
          duration: 12,
          displayOrder: 1,
          active: true,
        },
        {
          id: 'event-hero-2',
          type: 'video',
          url: eventsReel2,
          title: 'Grand Birthday Extravaganza & Setup',
          duration: 12,
          displayOrder: 2,
          active: true,
        },
        {
          id: 'event-hero-3',
          type: 'video',
          url: eventReel3,
          title: 'Luxury Baby Shower & Welcome Home Decor',
          duration: 12,
          displayOrder: 3,
          active: true,
        },
        {
          id: 'event-hero-4',
          type: 'video',
          url: eventReel4,
          title: 'Royal Anniversary & Milestone Celebration',
          duration: 12,
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
          type: 'video',
          url: mascotReel1,
          title: 'Dancing Mascot & Disney Entry',
          duration: 12,
          displayOrder: 1,
          active: true,
        },
        {
          id: 'mascot-hero-2',
          type: 'video',
          url: mascotReel2,
          title: 'Superhero & Mascot Party Energy',
          duration: 12,
          displayOrder: 2,
          active: true,
        },
        {
          id: 'mascot-hero-3',
          type: 'video',
          url: mascotReel3,
          title: 'Inflatable Dancing Panda Celebration',
          duration: 12,
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
      startingPrice: SHOW_RUPEE_PRICES ? ORIGINAL_PRICE_CATALOG['luxury-cakes']?.startingPrice : undefined,
      features: ['24k Edible Gold Accents', 'Custom Fondant Sculpting', 'Exotic Flavor Combinations', 'Temperature Controlled Delivery'],
      displayOrder: 1,
      active: true,
      media: [
        {
          id: 'lux-1',
          type: 'image',
          url: 'https://res.cloudinary.com/n8ql5bui/image/upload/v1790159987/Screenshot_2026-09-23_160928_mebssm.png',
          title: 'Royal Tiered Golden Cake',
          displayOrder: 1,
          active: true,
        },
        {
          id: 'lux-2',
          type: 'image',
          url: 'https://res.cloudinary.com/n8ql5bui/image/upload/v1790159863/Screenshot_2026-09-23_160155_kqa9f5.png',
          title: 'Botanical Floral Masterpiece',
          displayOrder: 2,
          active: true,
        },
      ],
    },
    {
      id: 'birthday-cakes',
      slug: 'birthday-cakes',
      title: 'Birthday Cakes',
      subtitle: 'Whimsical, Thematic & Milestone Celebrations',
      description: 'From kid themes to lavish 50th jubilees, custom crafted with pure love, rich chocolate ganache, and stunning figurines.',
      coverImage: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec',
      startingPrice: SHOW_RUPEE_PRICES ? ORIGINAL_PRICE_CATALOG['birthday-cakes']?.startingPrice : undefined,
      features: ['Personalized Name & Number Plaque', '100% Eggless Options Available', 'Custom Theme Modeling', 'Fresh Cream or Fondant Finish'],
      displayOrder: 2,
      active: true,
      media: [],
    },
    {
      id: 'anniversary-cakes',
      slug: 'anniversary-cakes',
      title: 'Anniversary Cakes',
      subtitle: 'Romantic Heart Shapes & Elegant Tiered Confections',
      description: 'Celebrate years of love with bespoke cakes detailed with sugar roses, macaron crowns, and shimmering pearl finishes.',
      coverImage: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136',
      startingPrice: SHOW_RUPEE_PRICES ? ORIGINAL_PRICE_CATALOG['anniversary-cakes']?.startingPrice : undefined,
      features: ['Romantic Fresh Rose Decor', 'Velvet Texture Finishing', 'Custom Love Calligraphy', 'Double-Flavor Tier Combinations'],
      displayOrder: 3,
      active: true,
      media: [],
    },
    {
      id: 'engagement-cakes',
      slug: 'engagement-cakes',
      title: 'Engagement Cakes',
      subtitle: 'Chic Modern Ring-Box & Ring-Ceremony Masterpieces',
      description: 'Mark the beginning of forever with glamorous engagement cakes designed with edible ring boxes, cascade florals, and gold foil accents.',
      coverImage: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b',
      startingPrice: SHOW_RUPEE_PRICES ? ORIGINAL_PRICE_CATALOG['engagement-cakes']?.startingPrice : undefined,
      features: ['Edible Velvet Ring Box', 'Monogram Initial Toppers', 'Delicate Pastel Palettes', 'Gold Leaf Accents'],
      displayOrder: 4,
      active: true,
      media: [],
    },
    {
      id: 'wedding-cakes',
      slug: 'wedding-cakes',
      title: 'Wedding Cakes',
      subtitle: 'Grand Statement Centerpieces for Your Special Day',
      description: 'Towering multi-tier works of art crafted to be the sweetest highlight of your wedding reception and cake-cutting ceremony.',
      coverImage: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      startingPrice: SHOW_RUPEE_PRICES ? ORIGINAL_PRICE_CATALOG['wedding-cakes']?.startingPrice : undefined,
      features: ['Up to 5 Tiers with Support Structure', 'Custom Flavor Per Tier', 'Venue Tasting & Setup Included', 'On-Site Florist Coordination'],
      displayOrder: 5,
      active: true,
      media: [],
    },
    {
      id: 'retirement-cakes',
      slug: 'retirement-cakes',
      title: 'Retirement Cakes',
      subtitle: 'Honoring Years of Dedication & New Beginnings',
      description: 'Thoughtful celebratory cakes customized with career motifs, hobby symbols, golden laurels, and heartfelt congratulations.',
      coverImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
      startingPrice: SHOW_RUPEE_PRICES ? ORIGINAL_PRICE_CATALOG['retirement-cakes']?.startingPrice : undefined,
      features: ['Custom Career Emblem Modeling', 'Formal Ribbon & Laurel Detailing', 'Choice of Premium Sponge Fillings', 'Express Delivery to Venue'],
      displayOrder: 6,
      active: true,
      media: [],
    },
    {
      id: 'roka-cakes',
      slug: 'roka-cakes',
      title: 'Roka Cakes',
      subtitle: 'Traditional Charm Meets Modern Elegance',
      description: 'Specially crafted for pre-wedding Roka ceremonies with auspicious motifs, golden touches, and fusion flavors like Rasmalai and Gulab Jamun.',
      coverImage: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f',
      startingPrice: SHOW_RUPEE_PRICES ? ORIGINAL_PRICE_CATALOG['roka-cakes']?.startingPrice : undefined,
      features: ['Traditional Fusion Flavors', 'Auspicious Kalash/Motif Design', 'Saffron & Pistachio Infusions', 'Gift Box Packaging'],
      displayOrder: 7,
      active: true,
      media: [],
    },
    {
      id: 'decoration-cakes',
      slug: 'decoration-cakes',
      title: 'Decoration Cakes',
      subtitle: 'Artistic Thematic Showstoppers for Unique Concepts',
      description: 'Artistic gravity-defying cakes, drip cakes, geometric marble designs, and sculpted fondant centerpieces for extraordinary themes.',
      coverImage: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187',
      startingPrice: SHOW_RUPEE_PRICES ? ORIGINAL_PRICE_CATALOG['decoration-cakes']?.startingPrice : undefined,
      features: ['Hand-Painted Art on Sugar', 'Geometric & Texture Techniques', 'LED & Sparkler Compatibilities', 'Zero Artificial Preservatives'],
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
          type: 'video',
          url: eventsReel1,
          title: 'Wedding Decor Highlights',
          duration: 12,
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
          type: 'video',
          url: eventsReel2,
          title: 'Birthday Bash Decor',
          duration: 12,
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
          type: 'video',
          url: eventReel3,
          title: 'Baby Shower Setup Reel',
          duration: 12,
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
          type: 'video',
          url: eventReel4,
          title: 'Anniversary Celebration Reel',
          duration: 12,
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
      media: [
        {
          id: 'ev-reels-5',
          type: 'video',
          url: eventsReel1,
          title: 'Retirement Gala Highlights',
          duration: 12,
          displayOrder: 1,
          active: true,
        },
      ],
    },
    {
      id: 'engagement-celebrations',
      slug: 'engagement-celebrations',
      title: 'Engagement Celebrations',
      subtitle: 'Glamorous Ring Ceremony Stages & Romantic Settings',
      description: 'Stunning LED ring backdrops, cascading pastel floral pillars, fog effects for couple entrance, and bespoke ring tray tables.',
      coverImage: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2000',
      features: ['Illuminated Ring Arch Backdrop', 'Cold Pyro & Dry Ice Couple Entry', 'Customized Ring Exchange Table', 'Personalized Hashtag Light Wall'],
      displayOrder: 6,
      active: true,
      media: [
        {
          id: 'ev-reels-6',
          type: 'video',
          url: eventsReel2,
          title: 'Engagement Setup Reel',
          duration: 12,
          displayOrder: 1,
          active: true,
        },
      ],
    },
  ],
  otherServices: [
    {
      id: 'entertainment',
      slug: 'entertainment',
      title: 'Live Entertainment & Artists',
      icon: '🎵',
      description: 'Electrifying live singers, instrumentalists, DJ artists, and dancers to keep your guests enthralled throughout the evening.',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745',
      highlights: ['Professional Sound & Console Setup', 'Custom Song Playlists', 'Sangeet & Party Choreography'],
      displayOrder: 1,
      active: true,
    },
    {
      id: 'games',
      slug: 'games',
      title: 'Interactive Party Games',
      icon: '🎯',
      description: 'Fun carnival game stalls, inflatable bounce houses, VR setups, and engaging host-led group activities for all ages.',
      image: 'https://images.unsplash.com/photo-1513159446162-54eb8bdaa79b',
      highlights: ['Fun Game Host & Assistants', 'Carnival Shooting & Ring Toss', 'Prizes & Token Rewards'],
      displayOrder: 2,
      active: true,
    },
    {
      id: 'anchor',
      slug: 'anchor',
      title: 'Professional Emcee & Anchor',
      icon: '🎤',
      description: 'Charismatic event hosts who guide the program seamlessly, engage the crowd with humor, and create memorable transitions.',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
      highlights: ['Bilingual & Multilingual Anchors', 'Interactive Ice-Breakers', 'Smooth Protocol Execution'],
      displayOrder: 3,
      active: true,
    },
    {
      id: 'tattoo-artist',
      slug: 'tattoo-artist',
      title: 'Kids Tattoo & Face Painting',
      icon: '🎨',
      description: 'Hypoallergenic skin-safe glitter tattoos, artistic face painting, and temporary airbrush body art for party guests.',
      image: 'https://images.unsplash.com/photo-1561055657-b9e0bf0fa360',
      highlights: ['100% Skin Safe FDA Approved Paints', 'Unlimited Designs for Children', 'Glitter & Glow-in-the-Dark Options'],
      displayOrder: 4,
      active: true,
    },
    {
      id: 'magician',
      slug: 'magician',
      title: 'Celebrity Magician & Illusionist',
      icon: '🎩',
      description: 'Astonishing sleight-of-hand close-up magic and grand stage illusions that leave children and adults amazed.',
      image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf',
      highlights: ['Interactive 45-Minute Stage Show', 'Floating Illusions & Sleight of Hand', 'Special Birthday Star Participation'],
      displayOrder: 5,
      active: true,
    },
    {
      id: 'venue',
      slug: 'venue',
      title: 'Venue Selection & Styling',
      icon: '🏰',
      description: 'Assistance in booking prestigious banquet halls, lush green lawns, boutique farmhouses, and terrace rooftops.',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
      highlights: ['Best Negotiated Rates', 'Layout & Floor Planning', 'Complete Logistics Coordination'],
      displayOrder: 6,
      active: true,
    },
    {
      id: 'sfx',
      slug: 'sfx',
      title: 'SFX & Special Effects',
      icon: '✨',
      description: 'Dramatic cold pyrotechnics, heavy low-fog dry ice clouds for cake cutting and couple dance, bubble machines, and CO2 jets.',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
      highlights: ['Cold Spark Machines (Fire-Safe)', 'Dancing on Clouds Dry Ice', 'Confetti Cannons & Balloon Drop'],
      displayOrder: 7,
      active: true,
    },
    {
      id: 'return-gifts',
      slug: 'return-gifts',
      title: 'Bespoke Favors & Return Gifts',
      icon: '🎁',
      description: 'Customized luxury gift hampers, personalized confection boxes, artisanal cookies, and memorable keepsake party favors.',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48',
      highlights: ['Custom Packaging with Guest Names', 'Fresh Gourmet Treats & Macarons', 'Thematic Hamper Ribbons & Tags'],
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
      reels: [mascotReel1, mascotReel2],
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
      reels: [mascotReel2],
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
      reels: [mascotReel1],
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
      reels: [mascotReel3, mascotReel1],
      displayOrder: 4,
      active: true,
    },
  ],
};

export const siteContentService = {
  get: (): SiteContentData => {
    try {
      // Clear legacy storage that had instagram links
      if (typeof window !== 'undefined') {
        const legacy = localStorage.getItem('cbs_site_content_data_v1');
        if (legacy) {
          localStorage.removeItem('cbs_site_content_data_v1');
        }
      }

      const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
      if (stored) {
        // If stored contains the old instagram links, refresh to INITIAL_SITE_CONTENT
        if (stored.includes('instagram.com/reel')) {
          localStorage.removeItem(STORAGE_KEY);
          return INITIAL_SITE_CONTENT;
        }

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
    } catch {
      // Fallback
    }
    return INITIAL_SITE_CONTENT;
  },

  save: (data: SiteContentData): void => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
    } catch {
      // Silent error
    }
  },

  update: (data: SiteContentData): void => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
    } catch {
      // Silent error
    }
  },

  reset: (): SiteContentData => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem('cbs_site_content_data_v1');
      }
    } catch {
      // Silent error
    }
    return INITIAL_SITE_CONTENT;
  },
};
