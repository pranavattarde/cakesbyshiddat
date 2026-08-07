import type {
  ContentPageInput,
  ContentSection,
} from "../services/content-pages.service";

function section(
  type: ContentSection["type"],
  title: string
): ContentSection {
  return {
    type,

    title,

    subtitle: "",

    description: "",

    mediaId: undefined,

    buttonText: "",

    buttonUrl: "",

    displayOrder: 0,

    active: true,

    items: [],
  };
}

export const PAGE_TEMPLATES: Record<
  string,
  ContentPageInput
> = {
  home: {
    slug: "home",

    title: "Home",

    subtitle: "",

    heroMediaId: null,

    heroMedia: null,

    seoTitle: "",

    seoDescription: "",

    published: true,

    displayOrder: 0,

    sections: [
      section("hero", "Hero"),
      section("cards", "Featured Products"),
      section("gallery", "Gallery"),
      section("cta", "Call To Action"),
    ],
  },

  about: {
    slug: "about",

    title: "About",

    subtitle: "",

    heroMediaId: null,

    heroMedia: null,

    seoTitle: "",

    seoDescription: "",

    published: true,

    displayOrder: 1,

    sections: [
      section("hero", "Hero"),
      section("text", "Our Story"),
      section("founders", "Meet the Founders"),
      section("cta", "Visit Us"),
    ],
  },

  services: {
    slug: "services",

    title: "Services",

    subtitle: "",

    heroMediaId: null,

    heroMedia: null,

    seoTitle: "",

    seoDescription: "",

    published: true,

    displayOrder: 2,

    sections: [
      section("hero", "Hero"),
      section("cards", "Services"),
    ],
  },

  events: {
    slug: "events",

    title: "Events",

    subtitle: "",

    heroMediaId: null,

    heroMedia: null,

    seoTitle: "",

    seoDescription: "",

    published: true,

    displayOrder: 3,

    sections: [
      section("hero", "Hero"),
      section("cards", "Packages"),
      section("gallery", "Past Events"),
    ],
  },

  gallery: {
    slug: "gallery",

    title: "Gallery",

    subtitle: "",

    heroMediaId: null,

    heroMedia: null,

    seoTitle: "",

    seoDescription: "",

    published: true,

    displayOrder: 4,

    sections: [
      section("hero", "Hero"),
      section("gallery", "Gallery"),
    ],
  },
  contact: {
    slug: "contact",
    title: "Contact Us",
    subtitle: "",
    heroMediaId: null,
    heroMedia: null,
    seoTitle: "",
    seoDescription: "",
    published: true,
    displayOrder: 5,
    sections: [
      section("hero", "Contact Us"),
      section("cards", "Get In Touch"),
      section("faq", "Frequently Asked Questions"),
      section("cta", "Let's Create Something Beautiful Together"),
    ],
  },
};
