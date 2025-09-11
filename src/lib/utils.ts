/**
 * Utility functions for the frontend
 */

/**
 * Format price with Pakistani Rupee currency and comma separators
 */
export function formatPrice(price: string | number): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (isNaN(numPrice)) {
    return 'Rs. 0';
  }

  // Format with commas (Pakistani number format)
  return `Rs. ${numPrice.toLocaleString('en-PK')}`;
}

/**
 * Get product attribute value by name
 */
export function getAttributeValue(attributes: Array<{ name: string; options: string[] }>, attributeName: string): string {
  const attr = attributes.find(a => 
    a.name.toLowerCase().includes(attributeName.toLowerCase())
  );
  return attr ? attr.options.join(', ') : '';
}

/**
 * Get brand name from product attributes or categories
 */
export function getBrandName(product: any): string {
  // Try to get from attributes first
  const brandFromAttr = getAttributeValue(product.attributes || [], 'brand');
  if (brandFromAttr) return brandFromAttr;

  // Try to get from brands array if available
  if (product.brands && product.brands.length > 0) {
    return product.brands[0].name;
  }

  return '';
}

/**
 * Get product condition (New/Used/Refurbished)
 */
export function getProductCondition(product: any): string {
  return getAttributeValue(product.attributes || [], 'condition') || 
         getAttributeValue(product.attributes || [], 'product condition') || 
         'New';
}

/**
 * Get warranty period
 */
export function getWarrantyPeriod(product: any): string {
  return getAttributeValue(product.attributes || [], 'warranty period') || 
         getAttributeValue(product.attributes || [], 'warranty') || 
         '';
}

/**
 * Get warranty type (International/Local)
 */
export function getWarrantyType(product: any): string {
  return getAttributeValue(product.attributes || [], 'warranty type') || '';
}

/**
 * Clean HTML from text (for short descriptions)
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}
