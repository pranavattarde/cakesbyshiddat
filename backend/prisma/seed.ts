import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();
const imageUrls = ['https://images.unsplash.com/photo-1535254973040-607b474cb50d', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587', 'https://images.unsplash.com/photo-1519225421980-715cb0215aed', 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84', 'https://images.unsplash.com/photo-1513151233558-d860c5398176', 'https://images.unsplash.com/photo-1517841905240-472988babdf9', 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc', 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3', 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=2000', 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=800'];

async function mediaIds(): Promise<Record<string, string>> {
  const result: Record<string, string> = {};
  for (const [index, secureUrl] of imageUrls.entries()) {
    const existing = await prisma.media.findFirst({ where: { secureUrl } });
    const media = existing ?? await prisma.media.upsert({ where: { publicId: `legacy-homepage-${index}` }, update: { secureUrl, url: secureUrl }, create: { publicId: `legacy-homepage-${index}`, url: secureUrl, secureUrl, width: 0, height: 0, format: 'jpg', bytes: 0, folder: 'legacy-homepage', alt: 'Cakes By Shiddat homepage' } });
    result[secureUrl] = media.id;
  }
  return result;
}

async function seedHome(): Promise<void> {
  const media = await mediaIds();
  const page = await prisma.page.upsert({ where: { slug: 'home' }, update: { title: 'Luxury Cakes & Celebrations', subtitle: 'Custom cakes and beautifully planned celebrations by Cakes By Shiddat in Haryana.', seoTitle: 'Luxury Cakes & Celebrations', seoDescription: 'Custom cakes and beautifully planned celebrations by Cakes By Shiddat in Haryana.', published: true, displayOrder: 0, heroMediaId: media[imageUrls[0]] }, create: { slug: 'home', title: 'Luxury Cakes & Celebrations', subtitle: 'Custom cakes and beautifully planned celebrations by Cakes By Shiddat in Haryana.', seoTitle: 'Luxury Cakes & Celebrations', seoDescription: 'Custom cakes and beautifully planned celebrations by Cakes By Shiddat in Haryana.', published: true, displayOrder: 0, heroMediaId: media[imageUrls[0]] } });
  await prisma.pageSection.deleteMany({ where: { pageId: page.id } });
  const section = async (data: Parameters<typeof prisma.pageSection.create>[0]['data']) => prisma.pageSection.create({ data });
  await section({ pageId: page.id, type: 'hero', title: 'Luxury Cakes & Celebrations', subtitle: 'Crafted With Love', description: 'Custom cakes and beautifully planned celebrations by Cakes By Shiddat in Haryana.', buttonText: 'Book Consultation', buttonUrl: '/contact', mediaId: media[imageUrls[0]], displayOrder: 0, items: { create: [{ title: 'Explore Gallery', subtitle: '', description: '', link: '/gallery', displayOrder: 0 }, { title: '1500+', subtitle: '', description: 'Events Completed', displayOrder: 1 }, { title: '1000+', subtitle: '', description: 'Happy Clients', displayOrder: 2 }, { title: '5★', subtitle: '', description: 'Customer Rating', displayOrder: 3 }] } });
  await section({ pageId: page.id, type: 'cards', title: 'Crafted With Love & Shiddat', subtitle: 'Our Services', description: 'From luxury cakes to complete event experiences, we make every celebration unforgettable.', displayOrder: 1, items: { create: [['Luxury Cakes', imageUrls[1]], ['Wedding Events', imageUrls[2]], ['Birthday Celebrations', imageUrls[3]], ['Baby Shower Themes', imageUrls[4]], ['Mascot Services', imageUrls[5]], ['Anniversary Celebrations', imageUrls[6]]].map(([title, url], displayOrder) => ({ title, subtitle: '', description: '', mediaId: media[url], displayOrder })) } });
  await section({ pageId: page.id, type: 'text', title: 'Crafting Celebrations With Shiddat', subtitle: 'About Us', description: 'Founded in 2022 by Navdeep Dua and Chitraa Dua, Cakes By Shiddat began as a passionate home bakery dedicated to creating memorable moments through handcrafted cakes.', buttonText: 'Learn More', buttonUrl: '/about', displayOrder: 2, items: { create: [['2022', 'Home Bakery Launch'], ['2023', 'Custom Cake Studio'], ['2024', 'Event Decoration Services'], ['2025', 'Mascot Experiences'], ['Today', 'Complete Celebration Management']].map(([subtitle, title], displayOrder) => ({ title, subtitle, description: '', displayOrder })) } });
  await section({ pageId: page.id, type: 'cards', title: 'Creating Moments Worth Remembering', subtitle: 'Event Experiences', description: 'From intimate celebrations to grand events, we transform every occasion into an unforgettable experience.', buttonText: 'View All Events', buttonUrl: '/events', displayOrder: 3, items: { create: [['Birthday Celebrations', 'Events', imageUrls[3]], ['Baby Shower Themes', 'Decorations', imageUrls[4]], ['Wedding Decorations', 'Luxury Events', imageUrls[2]], ['Anniversary Celebrations', 'Celebrations', imageUrls[6]]].map(([title, subtitle, url], displayOrder) => ({ title, subtitle, description: '', mediaId: media[url], displayOrder })) } });
  await section({ pageId: page.id, type: 'timeline', title: 'Crafting Memories Since 2022', subtitle: 'CELEBRATIONS IN NUMBERS', description: 'Every cake, every decoration, and every event is crafted with care, creativity, and attention to detail.', displayOrder: 4, items: { create: [['1500+', 'Events Completed'], ['1000+', 'Happy Clients'], ['4+', 'Years Experience'], ['5★', 'Customer Rating']].map(([title, description], displayOrder) => ({ title, subtitle: '', description, displayOrder })) } });
  await section({ pageId: page.id, type: 'founders', title: 'The Hearts Behind The Celebrations', subtitle: 'Meet Our Founders', description: 'What started as a home bakery in 2022 has evolved into a complete celebration management brand driven by passion, creativity, and a commitment to making every moment unforgettable.', buttonText: 'Learn More About Us', buttonUrl: '/about', displayOrder: 5, items: { create: [{ title: 'Navdeep Dua', subtitle: 'Founder', description: '', mediaId: media[imageUrls[5]], displayOrder: 0 }, { title: 'Chitraa Dua', subtitle: 'Co-Founder', description: '', mediaId: media[imageUrls[7]], displayOrder: 1 }] } });
  await section({ pageId: page.id, type: 'faq', title: 'Stories From Our Celebrations', subtitle: 'Client Love', description: 'Every celebration tells a story. Here are a few words from families and clients who trusted us with their special moments.', displayOrder: 6, items: { create: [['Priya Sharma', 'Birthday Celebration', 'The cake was absolutely stunning and tasted amazing. The decorations exceeded our expectations and made the celebration unforgettable.'], ['Rahul Verma', 'Baby Shower', 'Everything was managed perfectly from start to finish. The team was professional, creative, and very responsive.'], ['Simran Kaur', 'Anniversary Celebration', 'Beautiful decorations, delicious cake, and incredible attention to detail. Highly recommended!']].map(([title, subtitle, description], displayOrder) => ({ title, subtitle, description, displayOrder })) } });
  await section({ pageId: page.id, type: 'gallery', title: 'Moments We Loved Creating', subtitle: 'Latest Celebrations', description: 'A glimpse into some of our recent celebrations, cakes, and unforgettable memories.', displayOrder: 7, items: { create: [imageUrls[2], imageUrls[0], imageUrls[3], imageUrls[6], imageUrls[1], imageUrls[4]].map((url, displayOrder) => ({ title: '', subtitle: '', description: '', mediaId: media[url], displayOrder })) } });
  await section({ pageId: page.id, type: 'cta', title: "Let's Create Your Dream Celebration", subtitle: "Let's Celebrate Together", description: "Whether it's a birthday, wedding, baby shower, anniversary, or corporate event — we're here to make it unforgettable.", buttonText: 'Book Consultation', buttonUrl: '/contact', displayOrder: 8, items: { create: [{ title: 'View Gallery', subtitle: '', description: '', link: '/gallery', displayOrder: 0 }] } });
}

async function seedAbout(): Promise<void> {
  const media = await mediaIds();
  const page = await prisma.page.upsert({ where: { slug: 'about' }, update: { title: 'About Us', subtitle: 'Meet the team and story behind Cakes By Shiddat.', seoTitle: 'About Us', seoDescription: 'Meet the team and story behind Cakes By Shiddat.', published: true, displayOrder: 1, heroMediaId: media[imageUrls[8]] }, create: { slug: 'about', title: 'About Us', subtitle: 'Meet the team and story behind Cakes By Shiddat.', seoTitle: 'About Us', seoDescription: 'Meet the team and story behind Cakes By Shiddat.', published: true, displayOrder: 1, heroMediaId: media[imageUrls[8]] } });
  await prisma.pageSection.deleteMany({ where: { pageId: page.id } });
  const section = async (data: Parameters<typeof prisma.pageSection.create>[0]['data']) => prisma.pageSection.create({ data });
  await section({ pageId: page.id, type: 'hero', title: 'Creating Beautiful Memories Since 2022', subtitle: 'Home / About Us', description: 'From handcrafted cakes to complete celebration experiences, Cakes By Shiddat has been turning special moments into unforgettable memories with creativity, passion, and love.', buttonText: 'Get In Touch', buttonUrl: '/contact', mediaId: media[imageUrls[8]], displayOrder: 0, items: { create: [{ title: 'Explore Gallery', subtitle: '', description: '', link: '/gallery', displayOrder: 0 }] } });
  await section({ pageId: page.id, type: 'text', title: 'From A Home Bakery To A Celebration Brand', subtitle: 'OUR STORY', description: 'Cakes By Shiddat was founded in 2022 by Navdeep Dua and Chitra Dua with a simple vision — creating unforgettable memories through handcrafted cakes and heartfelt celebrations.\n\nWhat started as a passionate home bakery quickly gained the trust of families and clients who loved our attention to detail, creativity, and personal touch.\n\nAs demand grew, so did our vision. We expanded beyond cakes into event decorations, themed celebrations, mascot experiences, anniversary setups, baby showers, wedding planning, and complete event management.\n\nToday, Cakes By Shiddat proudly helps families, couples, and businesses across Haryana create moments that are remembered for a lifetime.', mediaId: media[imageUrls[9]], displayOrder: 1, items: { create: [{ title: '2022', subtitle: 'Founded', description: '', displayOrder: 0 }, { title: '1500+', subtitle: 'Celebrations', description: '', displayOrder: 1 }, { title: '1000+', subtitle: 'Happy Clients', description: '', displayOrder: 2 }, { title: '', subtitle: '', description: '', mediaId: media[imageUrls[7]], displayOrder: 3 }, { title: '', subtitle: '', description: '', mediaId: media[imageUrls[2]], displayOrder: 4 }] } });
  await section({ pageId: page.id, type: 'cards', title: 'Driven By Passion & Purpose', subtitle: 'OUR PURPOSE', description: 'Every celebration we create is guided by our commitment to quality, creativity, and unforgettable experiences.', displayOrder: 2, items: { create: [{ title: 'Our Mission', subtitle: '🎯', description: 'To create unforgettable celebrations through beautifully crafted cakes, exceptional decorations, creative experiences, and personalized event management that brings people together and creates lifelong memories.', displayOrder: 0 }, { title: 'Our Vision', subtitle: '✨', description: "To become Haryana's most trusted celebration management brand by continuously delivering innovative experiences, premium quality, and memorable moments that exceed expectations.", displayOrder: 1 }] } });
  await section({ pageId: page.id, type: 'timeline', title: 'Our Journey', subtitle: 'TIMELINE', description: 'From a home bakery to complete celebration management.', displayOrder: 3, items: { create: [['2022', 'Home Bakery Launch'], ['2023', 'Custom Cake Studio'], ['2024', 'Event Decoration Services'], ['2025', 'Mascot Experiences'], ['Today', 'Complete Celebration Management']].map(([subtitle, title], displayOrder) => ({ title, subtitle, description: '', displayOrder })) } });
  await section({ pageId: page.id, type: 'founders', title: 'The Hearts Behind Cakes By Shiddat', subtitle: 'MEET THE FOUNDERS', description: 'What began as a passion for creating memorable celebrations has grown into a trusted brand dedicated to turning special moments into lifelong memories.', displayOrder: 4, items: { create: [{ title: 'Navdeep Dua', subtitle: 'Founder', description: 'Leading the vision and growth of Cakes By Shiddat, Navdeep focuses on delivering exceptional experiences and ensuring every celebration is executed flawlessly.', displayOrder: 0 }, { title: 'Chitraa Dua', subtitle: 'Co-Founder', description: 'The creative force behind Cakes By Shiddat, Chitraa brings imagination, artistry, and attention to detail to every cake and celebration.', displayOrder: 1 }] } });
  await section({ pageId: page.id, type: 'cards', title: 'Creating Celebrations That Matter', subtitle: 'WHY CHOOSE US', description: 'We combine creativity, quality, and experience to deliver celebrations that leave lasting memories.', displayOrder: 5, items: { create: [['🎂', 'Custom Designed Cakes', 'Unique handcrafted cakes tailored to every celebration.'], ['🎉', 'Complete Event Management', 'From planning to execution, we handle every detail.'], ['🎈', 'Decoration Experts', 'Elegant setups designed to match your celebration theme.'], ['🧸', 'Mascot Experiences', 'Interactive mascot services loved by children and families.'], ['⭐', 'Premium Quality', 'Attention to detail and high-quality standards in everything we create.'], ['❤️', 'Personalized Experience', 'Every celebration is customized around your vision and preferences.']].map(([subtitle, title, description], displayOrder) => ({ title, subtitle, description, displayOrder })) } });
  await section({ pageId: page.id, type: 'cta', title: "Let's Create Your Next Beautiful Celebration", subtitle: "Let's Celebrate Together", description: "Whether it's a birthday, wedding, baby shower, anniversary, corporate event, or a custom cake, we're ready to bring your vision to life.", buttonText: 'Book Consultation', buttonUrl: '/contact', displayOrder: 6, items: { create: [{ title: 'View Gallery', subtitle: '', description: '', link: '/gallery', displayOrder: 0 }] } });
}

async function seedServices(): Promise<void> {
  const media = await mediaIds();

  const page = await prisma.page.upsert({
    where: { slug: 'services' },
    update: {
      title: 'Our Services',
      subtitle: 'Luxury cakes, decorations and complete celebration management.',
      seoTitle: 'Our Services',
      seoDescription: 'Explore premium cakes, event decorations, mascots and celebration services by Cakes By Shiddat.',
      published: true,
      displayOrder: 2,
      heroMediaId: media[imageUrls[1]],
    },
    create: {
      slug: 'services',
      title: 'Our Services',
      subtitle: 'Luxury cakes, decorations and complete celebration management.',
      seoTitle: 'Our Services',
      seoDescription: 'Explore premium cakes, event decorations, mascots and celebration services by Cakes By Shiddat.',
      published: true,
      displayOrder: 2,
      heroMediaId: media[imageUrls[1]],
    },
  });

  await prisma.pageSection.deleteMany({
    where: { pageId: page.id },
  });

  const section = async (
    data: Parameters<typeof prisma.pageSection.create>[0]['data'],
  ) => prisma.pageSection.create({ data });

  await section({
    pageId: page.id,
    type: 'hero',
    title: 'Everything You Need For The Perfect Celebration',
    subtitle: 'Home / Services',
    description:
      'From handcrafted luxury cakes to complete event planning and premium decorations, Cakes By Shiddat delivers unforgettable celebrations tailored to your vision.',
    buttonText: 'Book Consultation',
    buttonUrl: '/contact',
    mediaId: media[imageUrls[1]],
    displayOrder: 0,
    items: {
      create: [
        {
          title: 'Explore Gallery',
          subtitle: '',
          description: '',
          link: '/gallery',
          displayOrder: 0,
        },
      ],
    },
  });

  await section({
    pageId: page.id,
    type: 'cards',
    title: 'Our Premium Services',
    subtitle: 'WHAT WE OFFER',
    description:
      'Every celebration is designed with creativity, quality, and attention to every detail.',
    displayOrder: 1,
    items: {
      create: [
        ['Luxury Custom Cakes', 'Handcrafted Cakes', imageUrls[1]],
        ['Birthday Decorations', 'Theme Celebrations', imageUrls[3]],
        ['Wedding Decorations', 'Luxury Events', imageUrls[2]],
        ['Baby Shower Setups', 'Elegant Themes', imageUrls[4]],
        ['Mascot Services', 'Kids Entertainment', imageUrls[5]],
        ['Anniversary Celebrations', 'Romantic Experiences', imageUrls[6]],
      ].map(([title, subtitle, url], displayOrder) => ({
        title,
        subtitle,
        description: '',
        mediaId: media[url],
        displayOrder,
      })),
    },
  });

  await section({
    pageId: page.id,
    type: 'cards',
    title: 'Why Families Choose Cakes By Shiddat',
    subtitle: 'OUR PROMISE',
    description:
      'We combine premium quality, creative designs and professional execution to create memorable celebrations.',
    displayOrder: 2,
    items: {
      create: [
        [
          'Premium Quality',
          'Only high-quality ingredients and premium decoration materials.',
        ],
        [
          'Customized Designs',
          'Every cake and event is designed around your preferences.',
        ],
        [
          'Professional Team',
          'Experienced professionals managing every detail of your celebration.',
        ],
        [
          'On-Time Delivery',
          'Reliable execution with timely setup and delivery.',
        ],
        [
          'Affordable Luxury',
          'Luxury experiences designed for different budgets.',
        ],
        [
          'Complete Celebration',
          'One destination for cakes, décor, entertainment and planning.',
        ],
      ].map(([title, description], displayOrder) => ({
        title,
        subtitle: '',
        description,
        displayOrder,
      })),
    },
  });

  await section({
    pageId: page.id,
    type: 'timeline',
    title: 'Our Celebration Process',
    subtitle: 'HOW WE WORK',
    description:
      'A simple and transparent process that ensures every celebration exceeds expectations.',
    displayOrder: 3,
    items: {
      create: [
        ['01', 'Consultation'],
        ['02', 'Planning & Design'],
        ['03', 'Creation & Preparation'],
        ['04', 'Delivery & Setup'],
        ['05', 'Celebrate'],
      ].map(([subtitle, title], displayOrder) => ({
        title,
        subtitle,
        description: '',
        displayOrder,
      })),
    },
  });

  await section({
    pageId: page.id,
    type: 'cta',
    title: 'Ready To Plan Your Celebration?',
    subtitle: "Let's Celebrate Together",
    description:
      'Share your ideas with us and let our team create a celebration your family will always remember.',
    buttonText: 'Contact Us',
    buttonUrl: '/contact',
    displayOrder: 4,
    items: {
      create: [
        {
          title: 'View Gallery',
          subtitle: '',
          description: '',
          link: '/gallery',
          displayOrder: 0,
        },
      ],
    },
  });
}

async function seedEvents(): Promise<void> {
  const media = await mediaIds();

  const page = await prisma.page.upsert({
    where: { slug: 'events' },
    update: {
      title: 'Our Events',
      subtitle: 'Beautiful celebrations crafted with creativity and love.',
      seoTitle: 'Our Events',
      seoDescription:
        'Explore birthdays, weddings, anniversaries, baby showers and premium event experiences by Cakes By Shiddat.',
      published: true,
      displayOrder: 3,
      heroMediaId: media[imageUrls[2]],
    },
    create: {
      slug: 'events',
      title: 'Our Events',
      subtitle: 'Beautiful celebrations crafted with creativity and love.',
      seoTitle: 'Our Events',
      seoDescription:
        'Explore birthdays, weddings, anniversaries, baby showers and premium event experiences by Cakes By Shiddat.',
      published: true,
      displayOrder: 3,
      heroMediaId: media[imageUrls[2]],
    },
  });

  await prisma.pageSection.deleteMany({
    where: { pageId: page.id },
  });

  const section = async (
    data: Parameters<typeof prisma.pageSection.create>[0]['data'],
  ) => prisma.pageSection.create({ data });

  await section({
    pageId: page.id,
    type: 'hero',
    title: 'Celebrations Designed Around Your Story',
    subtitle: 'Home / Events',
    description:
      'Every celebration deserves a unique experience. From intimate family gatherings to grand luxury events, we design memorable moments that last forever.',
    buttonText: 'Book Your Event',
    buttonUrl: '/contact',
    mediaId: media[imageUrls[2]],
    displayOrder: 0,
    items: {
      create: [
        {
          title: 'View Gallery',
          subtitle: '',
          description: '',
          link: '/gallery',
          displayOrder: 0,
        },
      ],
    },
  });

  await section({
    pageId: page.id,
    type: 'cards',
    title: 'Celebrations We Specialize In',
    subtitle: 'EVENT CATEGORIES',
    description:
      'Thoughtfully planned celebrations tailored for every milestone in life.',
    displayOrder: 1,
    items: {
      create: [
        ['Birthday Celebrations', 'Luxury Themes', imageUrls[3]],
        ['Wedding Celebrations', 'Elegant Weddings', imageUrls[2]],
        ['Baby Shower Events', 'Memorable Moments', imageUrls[4]],
        ['Anniversary Celebrations', 'Romantic Setups', imageUrls[6]],
        ['Corporate Events', 'Professional Experiences', imageUrls[8]],
        ['Private Celebrations', 'Customized Events', imageUrls[9]],
      ].map(([title, subtitle, url], displayOrder) => ({
        title,
        subtitle,
        description: '',
        mediaId: media[url],
        displayOrder,
      })),
    },
  });

  await section({
    pageId: page.id,
    type: 'cards',
    title: 'What Every Event Includes',
    subtitle: 'OUR EXPERIENCE',
    description:
      'Every event is carefully planned to provide a stress-free and unforgettable celebration.',
    displayOrder: 2,
    items: {
      create: [
        [
          'Theme Planning',
          'Personalized concepts designed around your celebration.',
        ],
        [
          'Premium Decorations',
          'Elegant décor with attention to every detail.',
        ],
        [
          'Custom Cakes',
          'Beautiful handcrafted cakes matching your event theme.',
        ],
        [
          'Entertainment',
          'Mascots and fun experiences for children and families.',
        ],
        [
          'Photography Ready',
          'Picture-perfect setups for lifelong memories.',
        ],
        [
          'Complete Coordination',
          'Professional management from planning to execution.',
        ],
      ].map(([title, description], displayOrder) => ({
        title,
        subtitle: '',
        description,
        displayOrder,
      })),
    },
  });

  await section({
    pageId: page.id,
    type: 'timeline',
    title: 'From Idea To Celebration',
    subtitle: 'OUR PROCESS',
    description:
      'We guide you through every stage to ensure your event is exactly how you imagined it.',
    displayOrder: 3,
    items: {
      create: [
        ['01', 'Consultation'],
        ['02', 'Concept & Theme'],
        ['03', 'Planning'],
        ['04', 'Execution'],
        ['05', 'Celebrate'],
      ].map(([subtitle, title], displayOrder) => ({
        title,
        subtitle,
        description: '',
        displayOrder,
      })),
    },
  });

  await section({
    pageId: page.id,
    type: 'gallery',
    title: 'Featured Celebrations',
    subtitle: 'OUR RECENT EVENTS',
    description:
      'Take a glimpse at some of the memorable celebrations created by Cakes By Shiddat.',
    displayOrder: 4,
    items: {
      create: [
        imageUrls[2],
        imageUrls[3],
        imageUrls[4],
        imageUrls[6],
        imageUrls[1],
        imageUrls[8],
      ].map((url, displayOrder) => ({
        title: '',
        subtitle: '',
        description: '',
        mediaId: media[url],
        displayOrder,
      })),
    },
  });

  await section({
    pageId: page.id,
    type: 'cta',
    title: "Let's Create Your Dream Event",
    subtitle: "Let's Celebrate Together",
    description:
      'Whether it is a birthday, wedding, baby shower or anniversary, our team is ready to bring your vision to life.',
    buttonText: 'Contact Us',
    buttonUrl: '/contact',
    displayOrder: 5,
    items: {
      create: [
        {
          title: 'Explore Gallery',
          subtitle: '',
          description: '',
          link: '/gallery',
          displayOrder: 0,
        },
      ],
    },
  });
}

async function seedGallery(): Promise<void> {
  const media = await mediaIds();

  const page = await prisma.page.upsert({
    where: { slug: 'gallery' },
    update: {
      title: 'Gallery',
      subtitle: 'A showcase of our beautiful creations and celebrations.',
      seoTitle: 'Gallery',
      seoDescription:
        'Browse handcrafted cakes, luxury decorations and memorable celebrations by Cakes By Shiddat.',
      published: true,
      displayOrder: 4,
      heroMediaId: media[imageUrls[0]],
    },
    create: {
      slug: 'gallery',
      title: 'Gallery',
      subtitle: 'A showcase of our beautiful creations and celebrations.',
      seoTitle: 'Gallery',
      seoDescription:
        'Browse handcrafted cakes, luxury decorations and memorable celebrations by Cakes By Shiddat.',
      published: true,
      displayOrder: 4,
      heroMediaId: media[imageUrls[0]],
    },
  });

  await prisma.pageSection.deleteMany({
    where: { pageId: page.id },
  });

  const section = async (
    data: Parameters<typeof prisma.pageSection.create>[0]['data'],
  ) => prisma.pageSection.create({ data });

  await section({
    pageId: page.id,
    type: 'hero',
    title: 'Our Celebration Gallery',
    subtitle: 'Home / Gallery',
    description:
      'Explore a collection of handcrafted cakes, elegant decorations and unforgettable celebrations created with passion and creativity.',
    buttonText: 'Book Your Celebration',
    buttonUrl: '/contact',
    mediaId: media[imageUrls[0]],
    displayOrder: 0,
    items: {
      create: [
        {
          title: 'Contact Us',
          subtitle: '',
          description: '',
          link: '/contact',
          displayOrder: 0,
        },
      ],
    },
  });

  await section({
    pageId: page.id,
    type: 'gallery',
    title: 'Featured Moments',
    subtitle: 'OUR LATEST WORK',
    description:
      'Every celebration reflects our commitment to creativity, elegance and attention to detail.',
    displayOrder: 1,
    items: {
      create: [
        imageUrls[0],
        imageUrls[1],
        imageUrls[2],
        imageUrls[3],
        imageUrls[4],
        imageUrls[5],
        imageUrls[6],
        imageUrls[7],
        imageUrls[8],
      ].map((url, displayOrder) => ({
        title: '',
        subtitle: '',
        description: '',
        mediaId: media[url],
        displayOrder,
      })),
    },
  });

  await section({
    pageId: page.id,
    type: 'cards',
    title: 'Our Specialties',
    subtitle: 'WHAT YOU WILL FIND',
    description:
      'A glimpse into the wide variety of celebrations and experiences we create.',
    displayOrder: 2,
    items: {
      create: [
        [
          'Luxury Cakes',
          'Handcrafted premium cakes for every occasion.',
        ],
        [
          'Birthday Themes',
          'Creative birthday decorations and customized setups.',
        ],
        [
          'Wedding Celebrations',
          'Elegant décor designed for your special day.',
        ],
        [
          'Baby Showers',
          'Beautiful pastel themes and memorable experiences.',
        ],
        [
          'Anniversary Setups',
          'Romantic celebrations crafted with elegance.',
        ],
        [
          'Mascot Experiences',
          'Fun-filled moments loved by children and families.',
        ],
      ].map(([title, description], displayOrder) => ({
        title,
        subtitle: '',
        description,
        displayOrder,
      })),
    },
  });

  await section({
    pageId: page.id,
    type: 'timeline',
    title: 'Celebrations In Numbers',
    subtitle: 'OUR JOURNEY',
    description:
      'Our gallery represents years of passion, creativity and unforgettable memories.',
    displayOrder: 3,
    items: {
      create: [
        ['1500+', 'Events Completed'],
        ['1000+', 'Happy Clients'],
        ['4+', 'Years Of Creativity'],
        ['5★', 'Customer Rating'],
      ].map(([title, description], displayOrder) => ({
        title,
        subtitle: '',
        description,
        displayOrder,
      })),
    },
  });

  await section({
    pageId: page.id,
    type: 'cta',
    title: 'Ready To Create Beautiful Memories?',
    subtitle: "Let's Celebrate Together",
    description:
      'Share your ideas with us and let Cakes By Shiddat transform them into an unforgettable celebration.',
    buttonText: 'Book Consultation',
    buttonUrl: '/contact',
    displayOrder: 4,
    items: {
      create: [
        {
          title: 'View Services',
          subtitle: '',
          description: '',
          link: '/services',
          displayOrder: 0,
        },
      ],
    },
  });
}
async function seedContact(): Promise<void> {
  const media = await mediaIds();

  const page = await prisma.page.upsert({
    where: { slug: 'contact' },
    update: {
      title: 'Contact Us',
      subtitle: "Let's plan your next celebration together.",
      seoTitle: 'Contact Us',
      seoDescription:
        'Get in touch with Cakes By Shiddat for luxury cakes, event decorations and complete celebration management.',
      published: true,
      displayOrder: 5,
      heroMediaId: media[imageUrls[9]],
    },
    create: {
      slug: 'contact',
      title: 'Contact Us',
      subtitle: "Let's plan your next celebration together.",
      seoTitle: 'Contact Us',
      seoDescription:
        'Get in touch with Cakes By Shiddat for luxury cakes, event decorations and complete celebration management.',
      published: true,
      displayOrder: 5,
      heroMediaId: media[imageUrls[9]],
    },
  });

  await prisma.pageSection.deleteMany({
    where: { pageId: page.id },
  });

  const section = async (
    data: Parameters<typeof prisma.pageSection.create>[0]['data'],
  ) => prisma.pageSection.create({ data });

  await section({
    pageId: page.id,
    type: 'hero',
    title: "Let's Create Something Beautiful Together",
    subtitle: 'Home / Contact',
    description:
      'Whether you are planning a birthday, wedding, baby shower, anniversary or any special occasion, our team is here to help bring your vision to life.',
    buttonText: 'Book Consultation',
    buttonUrl: '#contact-form',
    mediaId: media[imageUrls[9]],
    displayOrder: 0,
    items: {
      create: [
        {
          title: 'Explore Gallery',
          subtitle: '',
          description: '',
          link: '/gallery',
          displayOrder: 0,
        },
      ],
    },
  });

  await section({
    pageId: page.id,
    type: 'cards',
    title: 'Get In Touch',
    subtitle: 'CONTACT INFORMATION',
    description:
      'Reach out through your preferred method and we will get back to you as soon as possible.',
    displayOrder: 1,
    items: {
      create: [
        {
          title: 'Phone',
          subtitle: 'Call Us',
          description: '+91 XXXXXXXXXX',
          displayOrder: 0,
        },
        {
          title: 'WhatsApp',
          subtitle: 'Quick Support',
          description: '+91 XXXXXXXXXX',
          displayOrder: 1,
        },
        {
          title: 'Email',
          subtitle: 'Write To Us',
          description: 'hello@cakesbyshiddat.com',
          displayOrder: 2,
        },
        {
          title: 'Location',
          subtitle: 'Visit Us',
          description: 'Kurukshetra, Haryana',
          displayOrder: 3,
        },
      ],
    },
  });

  await section({
    pageId: page.id,
    type: 'text',
    title: 'Why Contact Cakes By Shiddat?',
    subtitle: 'WE ARE HERE TO HELP',
    description:
      'From choosing the perfect cake to planning a complete celebration, our experienced team will guide you through every step. We believe every celebration deserves personalized attention and premium service.',
    displayOrder: 2,
    items: {
      create: [
        {
          title: 'Custom Cake Consultation',
          subtitle: '',
          description: '',
          displayOrder: 0,
        },
        {
          title: 'Event Planning',
          subtitle: '',
          description: '',
          displayOrder: 1,
        },
        {
          title: 'Theme Decoration',
          subtitle: '',
          description: '',
          displayOrder: 2,
        },
        {
          title: 'Quick Response',
          subtitle: '',
          description: '',
          displayOrder: 3,
        },
      ],
    },
  });

  await section({
    pageId: page.id,
    type: 'faq',
    title: 'Frequently Asked Questions',
    subtitle: 'COMMON QUESTIONS',
    description:
      'Here are a few questions our customers frequently ask before booking their celebration.',
    displayOrder: 3,
    items: {
      create: [
        {
          title: 'How early should I book?',
          subtitle: '',
          description:
            'We recommend booking at least 7–14 days in advance for the best availability.',
          displayOrder: 0,
        },
        {
          title: 'Do you create custom themes?',
          subtitle: '',
          description:
            'Yes, every cake and decoration can be customized according to your requirements.',
          displayOrder: 1,
        },
        {
          title: 'Do you provide complete event management?',
          subtitle: '',
          description:
            'Yes, we offer end-to-end celebration planning including cakes, décor and entertainment.',
          displayOrder: 2,
        },
        {
          title: 'Do you offer home delivery?',
          subtitle: '',
          description:
            'Delivery options are available depending on the location and event requirements.',
          displayOrder: 3,
        },
      ],
    },
  });

  await section({
    pageId: page.id,
    type: 'cta',
    title: "Let's Make Your Celebration Unforgettable",
    subtitle: "Let's Celebrate Together",
    description:
      'Share your ideas with us and our team will help you create memories that last a lifetime.',
    buttonText: 'Contact Now',
    buttonUrl: '#contact-form',
    displayOrder: 4,
    items: {
      create: [
        {
          title: 'View Services',
          subtitle: '',
          description: '',
          link: '/services',
          displayOrder: 0,
        },
      ],
    },
  });
}

async function main(): Promise<void> {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'ADMIN_EMAIL and ADMIN_PASSWORD environment variables are required',
    );
  }

  if (
    !(await prisma.user.findFirst({
      where: { role: UserRole.ADMIN },
    }))
  ) {
    await prisma.user.create({
      data: {
        name: 'Administrator',
        email,
        password: await bcrypt.hash(password, 12),
        role: UserRole.ADMIN,
      },
    });
  }

  await seedHome();
  await seedAbout();
  await seedServices();
  await seedEvents();
  await seedGallery();
  await seedContact();
}

main()
  .catch((error: unknown) => {
    console.error('Admin and content seed failed', error);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());
