/**
 * Single source of truth for feed catalogue (showcase grid + browse table + detail modal).
 */

export interface FeedNutrients {
  protein: string
  fiber: string
  moisture: string
  energy: string
}

export type FeedCategory =
  | 'concentrate'
  | 'mineral'
  | 'calf'
  | 'buffalo'
  | 'silage'
  | 'supplement'

export interface FeedShowcase {
  cardTitle: string
  cardDescription: string
  badge: string
  /** Tailwind background class for the bag tag */
  badgeBgClass: string
  brandLine: string
  variant: string
  weightKg: number
  bagPreset: 1 | 2 | 3 | 4 | 5 | 6
  priceInr: number
  priceSuffix: string
  stars: number
  reviewCount: number
  category: FeedCategory
}

/** Hero image area gradients (matches mock `.feed-img.bag-*`) */
export const FEED_BAG_PRESET_GRADIENT: Record<FeedShowcase['bagPreset'], string> = {
  1: 'bg-gradient-to-br from-[#fef0d4] to-[#f9d97a]',
  2: 'bg-gradient-to-br from-[#dff7e7] to-[#7ce0a8]',
  3: 'bg-gradient-to-br from-[#fde2cf] to-[#ee9b6c]',
  4: 'bg-gradient-to-br from-[#e0eef9] to-[#a4cfee]',
  5: 'bg-gradient-to-br from-[#f4d5e2] to-[#cc789f]',
  6: 'bg-gradient-to-br from-[#e2dfa9] to-[#a3a14a]',
}

export interface FeedProduct {
  id: number
  name: string
  description: string
  image: string
  nutrients: FeedNutrients
  additionalInfo: string
  /** When set, product appears in the hero marketplace grid */
  showcase?: FeedShowcase
}

export const FEED_PRODUCTS: FeedProduct[] = [
  {
    id: 1,
    name: 'DairyMax Concentrate',
    description: '22% protein cattle feed for peak lactation. Boosts yield up to 18%.',
    image:
      'https://5.imimg.com/data5/SELLER/Default/2022/7/RU/AX/AH/321009/multi-grain-cattle-feed-1--500x500.jpg',
    nutrients: { protein: '22%', fiber: '12%', moisture: '10%', energy: '2.2 Mcal/kg' },
    additionalInfo:
      'High-yield concentrate for lactating cattle. Vet-reviewed formula with balanced bypass protein and energy for sustained milk production.',
    showcase: {
      cardTitle: 'DairyMax Concentrate',
      cardDescription: '22% protein cattle feed for peak lactation. Boosts yield up to 18%.',
      badge: 'BEST SELLER',
      badgeBgClass: 'bg-dk-green-800',
      brandLine: 'DairyMax',
      variant: 'High Yield Concentrate',
      weightKg: 50,
      bagPreset: 1,
      priceInr: 1440,
      priceSuffix: '/ 50kg',
      stars: 4.9,
      reviewCount: 218,
      category: 'concentrate',
    },
  },
  {
    id: 2,
    name: 'GreenStart Calf Feed',
    description: 'Pellet feed for calves 1–6 months. Builds rumen, improves growth.',
    image: 'https://www.hubbardfeeds.com/sites/default/files/2020-09/shutterstock_385260625_1200x628.jpg',
    nutrients: { protein: '18%', fiber: '14%', moisture: '11%', energy: '1.8 Mcal/kg' },
    additionalInfo:
      'Starter pellets designed for young ruminants. Supports rumen development and steady daily gain.',
    showcase: {
      cardTitle: 'GreenStart Calf Feed',
      cardDescription: 'Pellet feed for calves 1–6 months. Builds rumen, improves growth.',
      badge: 'ORGANIC',
      badgeBgClass: 'bg-dk-green-700',
      brandLine: 'GreenStart',
      variant: 'Calf Starter',
      weightKg: 25,
      bagPreset: 2,
      priceInr: 980,
      priceSuffix: '/ 25kg',
      stars: 4.8,
      reviewCount: 142,
      category: 'calf',
    },
  },
  {
    id: 3,
    name: 'MineralPlus Booster',
    description: 'Calcium, phosphorus, zinc. Prevents deficiency, boosts fertility.',
    image: 'https://i.ebayimg.com/images/g/2s0AAOSw0IlmTXhK/s-l1600.webp',
    nutrients: { protein: '0%', fiber: '0%', moisture: '10%', energy: '0 Mcal/kg' },
    additionalInfo:
      'Complete mineral supplement for dairy herds. Helps prevent subclinical deficiencies and supports reproduction.',
    showcase: {
      cardTitle: 'MineralPlus Booster',
      cardDescription: 'Calcium, phosphorus, zinc. Prevents deficiency, boosts fertility.',
      badge: 'VET PICK',
      badgeBgClass: 'bg-[#c4521a]',
      brandLine: 'MineralPlus',
      variant: 'Mineral Mix',
      weightKg: 10,
      bagPreset: 3,
      priceInr: 720,
      priceSuffix: '/ 10kg',
      stars: 4.9,
      reviewCount: 86,
      category: 'mineral',
    },
  },
  {
    id: 4,
    name: 'BuffPro Cattle Feed',
    description: 'Specialised concentrate for buffalo. Higher fat content for richer milk.',
    image:
      'https://eu-images.contentstack.com/v3/assets/blte5a51c2d28bbcc9c/blt8117f606858a5744/64871945cfda7d0b32aea78c/Hay_20Bale_0.jpg?width=700&auto=webp&quality=80&disable=upscale',
    nutrients: { protein: '20%', fiber: '11%', moisture: '10%', energy: '2.1 Mcal/kg' },
    additionalInfo:
      'Buffalo-specific energy and protein balance. Suitable for high-fat milk production systems.',
    showcase: {
      cardTitle: 'BuffPro Cattle Feed',
      cardDescription: 'Specialised concentrate for buffalo. Higher fat content for richer milk.',
      badge: 'BUFFALO',
      badgeBgClass: 'bg-[#345d80]',
      brandLine: 'BuffPro',
      variant: 'Buffalo Feed',
      weightKg: 50,
      bagPreset: 4,
      priceInr: 1520,
      priceSuffix: '/ 50kg',
      stars: 4.7,
      reviewCount: 96,
      category: 'buffalo',
    },
  },
  {
    id: 5,
    name: 'RuminBoost Probiotic',
    description: 'Improves digestion, reduces bloat, boosts immunity. Daily dose powder.',
    image: 'https://www.labudde.com/wp-content/uploads/LaBudde-Premium-Screened-Shredded-Beet-Pulp-980x693.jpg',
    nutrients: { protein: '9%', fiber: '20%', moisture: '15%', energy: '1.3 Mcal/kg' },
    additionalInfo:
      'Digestive support blend with probiotic actives. Use as a top-dress on existing ration.',
    showcase: {
      cardTitle: 'RuminBoost Probiotic',
      cardDescription: 'Improves digestion, reduces bloat, boosts immunity. Daily dose powder.',
      badge: 'PROBIOTIC',
      badgeBgClass: 'bg-[#b8345c]',
      brandLine: 'RuminBoost',
      variant: 'Digestive Aid',
      weightKg: 5,
      bagPreset: 5,
      priceInr: 480,
      priceSuffix: '/ 5kg',
      stars: 4.8,
      reviewCount: 64,
      category: 'supplement',
    },
  },
  {
    id: 6,
    name: 'FreshSilage Bale',
    description: 'Year-round green fodder. Vacuum-packed, lasts 12 months. Free delivery.',
    image: 'https://www.agrifarming.in/wp-content/uploads/2015/11/Green-Fodder1.jpg',
    nutrients: { protein: '5%', fiber: '20%', moisture: '80%', energy: '0.5 Mcal/kg' },
    additionalInfo:
      'Maize silage bale format for easy storage and ration mixing. Ideal for smallholder dairies.',
    showcase: {
      cardTitle: 'FreshSilage Bale',
      cardDescription: 'Year-round green fodder. Vacuum-packed, lasts 12 months. Free delivery.',
      badge: 'SILAGE',
      badgeBgClass: 'bg-[#5e4515]',
      brandLine: 'FreshSilage',
      variant: 'Maize Silage',
      weightKg: 30,
      bagPreset: 6,
      priceInr: 540,
      priceSuffix: '/ 30kg',
      stars: 4.9,
      reviewCount: 178,
      category: 'silage',
    },
  },
]

export function feedProductsWithShowcase(): FeedProduct[] {
  return FEED_PRODUCTS
}
