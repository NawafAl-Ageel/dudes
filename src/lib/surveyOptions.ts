export const ITEM_OPTIONS = [
  "Oversized T-Shirt / تيشيرت أوفرسايز",
  "Compression T-Shirt / تيشيرت ضاغط",
  "Tank Top / تانك توب",
  "Shorts / شورت",
  "Joggers / بنطلون جوقر",
  "Hoodie / هودي",
  "Zip Jacket / جاكيت سحّاب",
  "Cap / كاب",
  "شيء آخر",
];

export const FACTOR_OPTIONS = [
  "جودة القماش",
  "التصميم",
  "المقاس (Fit)",
  "السعر",
  "سمعة البراند",
  "آراء الناس",
  "شيء آخر",
];

export const PRICE_OPTIONS = [
  "أقل من 80 ريال",
  "80–99 ريال",
  "100–119 ريال",
  "120–149 ريال",
  "أكثر من 150 ريال",
];

/**
 * Early responses were collected before item options became bilingual
 * ("Hoodie" vs "Hoodie / هودي"). Normalize legacy English-only values to
 * their current bilingual label so aggregation doesn't split one item
 * into two bars.
 */
export function normalizeItemLabel(raw: string): string {
  const match = ITEM_OPTIONS.find((opt) => opt.split(" / ")[0] === raw || opt === raw);
  return match ?? raw;
}
