/**
 * Master Price Catalog Backup & Toggle
 *
 * All original rupee prices mentioned across the website are backed up here safely.
 * To toggle prices on/off across the website, simply change SHOW_RUPEE_PRICES.
 *
 * - Set to `false`: Hides all rupee amounts and displays "Price on Request" / "Custom Quote on Request".
 * - Set to `true`: Immediately rolls back and restores all original rupee prices across the site.
 */
export const SHOW_RUPEE_PRICES = false;

export interface PriceRecord {
  slug: string;
  category: string;
  startingPrice: string;
  currency: string;
  notes?: string;
}

export const ORIGINAL_PRICE_CATALOG: Record<string, PriceRecord> = {
  'luxury-cakes': {
    slug: 'luxury-cakes',
    category: 'Luxury Cakes',
    startingPrice: '₹3,500',
    currency: 'INR',
    notes: 'Starting price for multi-tier luxury cakes with edible gold and customized art.',
  },
  'birthday-cakes': {
    slug: 'birthday-cakes',
    category: 'Birthday Cakes',
    startingPrice: '₹1,200',
    currency: 'INR',
    notes: 'Starting price for 1-tier artisan birthday cakes.',
  },
  'anniversary-cakes': {
    slug: 'anniversary-cakes',
    category: 'Anniversary Cakes',
    startingPrice: '₹1,500',
    currency: 'INR',
    notes: 'Starting price for heart-shaped and floral anniversary cakes.',
  },
  'engagement-cakes': {
    slug: 'engagement-cakes',
    category: 'Engagement Cakes',
    startingPrice: '₹2,200',
    currency: 'INR',
    notes: 'Starting price for ring-box and floral cascade engagement cakes.',
  },
  'wedding-cakes': {
    slug: 'wedding-cakes',
    category: 'Wedding Cakes',
    startingPrice: '₹4,500',
    currency: 'INR',
    notes: 'Starting price for 2-3 tier wedding statement cakes.',
  },
  'retirement-cakes': {
    slug: 'retirement-cakes',
    category: 'Retirement Cakes',
    startingPrice: '₹1,600',
    currency: 'INR',
    notes: 'Starting price for career and milestone retrospective cakes.',
  },
  'roka-cakes': {
    slug: 'roka-cakes',
    category: 'Roka Cakes',
    startingPrice: '₹1,800',
    currency: 'INR',
    notes: 'Starting price for auspicious traditional fusion cakes.',
  },
  'decoration-cakes': {
    slug: 'decoration-cakes',
    category: 'Decoration Cakes',
    startingPrice: '₹2,000',
    currency: 'INR',
    notes: 'Starting price for gravity-defying and structural themed cakes.',
  },
};

/**
 * Helper to get price display string according to SHOW_RUPEE_PRICES setting.
 * If SHOW_RUPEE_PRICES is false, returns fallbackText (defaults to 'Custom Quote on Request').
 */
export function getCategoryPriceDisplay(slug: string, fallbackText = 'Custom Quote on Request'): string {
  if (!SHOW_RUPEE_PRICES) {
    return fallbackText;
  }
  return ORIGINAL_PRICE_CATALOG[slug]?.startingPrice || fallbackText;
}
