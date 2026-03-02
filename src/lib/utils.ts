/**
 * Utility functions for the PC Wala Online frontend
 */

/**
 * Round to nearest 50 (for price ranges)
 */
function roundToNearest50(value: number): number {
  return Math.round(value / 50) * 50;
}

/**
 * Format a single price with Pakistani Rupee currency and comma separators
 */
export function formatPrice(price: string | number): string {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(numPrice)) return "Rs. 0";
  return `Rs. ${numPrice.toLocaleString("en-PK")}`;
}

/**
 * Format price as a ±15% range (universal rule)
 * WC price: Rs. 10,000 → display: "Rs. 8,500 – Rs. 11,500"
 */
export function formatPriceRange(price: string | number): string {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(numPrice) || numPrice <= 0) return "Price on request";

  const low = roundToNearest50(numPrice * 0.85);
  const high = roundToNearest50(numPrice * 1.15);

  const fmt = (n: number) => `Rs. ${n.toLocaleString("en-PK")}`;
  return `${fmt(low)} – ${fmt(high)}`;
}

/**
 * Get the effective price for a product (sale price or regular price)
 */
export function getEffectivePrice(product: {
  price: string;
  sale_price: string;
  regular_price: string;
}): string {
  if (product.sale_price && product.sale_price !== product.regular_price) {
    return product.sale_price;
  }
  return product.price || product.regular_price;
}

/**
 * Get product attribute value by name
 */
export function getAttributeValue(
  attributes: Array<{ name: string; options: string[] }>,
  attributeName: string
): string {
  const attr = attributes.find((a) =>
    a.name.toLowerCase().includes(attributeName.toLowerCase())
  );
  return attr ? attr.options.join(", ") : "";
}

/**
 * Product interface for utility functions
 */
interface ProductForUtils {
  attributes?: Array<{ name: string; options: string[] }>;
  brands?: Array<{ name: string }>;
}

/**
 * Get brand name from product attributes or categories
 */
export function getBrandName(product: ProductForUtils): string {
  const brandFromAttr = getAttributeValue(product.attributes || [], "brand");
  if (brandFromAttr) return brandFromAttr;

  if (product.brands && product.brands.length > 0) {
    return product.brands[0].name;
  }
  return "";
}

/**
 * Get product condition (New/Used/Refurbished)
 */
export function getProductCondition(product: ProductForUtils): string {
  return (
    getAttributeValue(product.attributes || [], "condition") ||
    getAttributeValue(product.attributes || [], "product condition") ||
    "New"
  );
}

/**
 * Get warranty period
 */
export function getWarrantyPeriod(product: ProductForUtils): string {
  return (
    getAttributeValue(product.attributes || [], "warranty period") ||
    getAttributeValue(product.attributes || [], "warranty") ||
    ""
  );
}

/**
 * Get warranty type (International/Local)
 */
export function getWarrantyType(product: ProductForUtils): string {
  return getAttributeValue(product.attributes || [], "warranty type") || "";
}

/**
 * Clean HTML from text
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}

// ─── SEO Utilities ───────────────────────────────────────────────

/**
 * Get numeric price range (low/high) for JSON-LD schema
 * Uses the same ±15% formula as formatPriceRange but returns raw numbers
 */
export function getPriceRange(price: string | number): { low: number; high: number } | null {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(numPrice) || numPrice <= 0) return null;
  return {
    low: Math.round(numPrice * 0.85 / 50) * 50,
    high: Math.round(numPrice * 1.15 / 50) * 50,
  };
}

/**
 * Get the lower price formatted for meta titles (e.g. "Rs. 120,700")
 */
export function getLowerPriceFormatted(price: string | number): string {
  const range = getPriceRange(price);
  if (!range) return "Price on request";
  return `Rs. ${range.low.toLocaleString("en-PK")}`;
}

/**
 * Map stock_status to schema.org availability URL
 */
export function getAvailabilitySchema(stockStatus: string): string {
  switch (stockStatus) {
    case "instock":
      return "https://schema.org/InStock";
    case "outofstock":
      return "https://schema.org/OutOfStock";
    case "onbackorder":
      return "https://schema.org/BackOrder";
    default:
      return "https://schema.org/InStock";
  }
}
