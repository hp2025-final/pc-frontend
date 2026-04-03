import { NextResponse } from 'next/server';
import { woo } from '@/lib/woocommerce';
import { 
  getBrandName, 
  getProductCondition, 
  getEffectivePrice, 
  stripHtml 
} from '@/lib/utils';

/**
 * Meta Catalog Data Feed (Google Merchant Center Format)
 * This route generates an XML feed that can be used by Meta Commerce Manager
 * to sync products for Facebook and Instagram shopping.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pcwalaonline.com';

// Use Node.js runtime for large WooCommerce fetches
export const runtime = 'nodejs';
// Revalidate daily
export const revalidate = 86400;


export async function GET() {
  try {
    // 1. Fetch all products (full data)
    const products = await woo.getAllProductsForFeed();


    // 2. Map to Google Merchant Center XML Format
    const items = products.map((product) => {
      const priceVal = getEffectivePrice(product);
      
      // Determine condition for Meta (new, refurbished, used)
      const rawCondition = getProductCondition(product).toLowerCase();
      let metaCondition = 'new';
      if (rawCondition.includes('used') || rawCondition.includes('pre-owned') || rawCondition.includes('second')) {
        metaCondition = 'used';
      } else if (rawCondition.includes('refurbished')) {
        metaCondition = 'refurbished';
      }

      // Fallback brand as requested
      const brand = getBrandName(product) || 'PC Wala Online';
      
      // Clean up description
      const description = product.short_description || product.description || `${product.name} available at PC Wala Online Pakistan`;
      const cleanDescription = stripHtml(description).substring(0, 5000);

      // Meta requires absolute URLs
      const productUrl = `${SITE_URL}/product/${product.slug}`;
      const imageUrl = product.images?.[0]?.src || '';

      return `
    <item>
      <g:id>${product.id}</g:id>
      <g:title><![CDATA[${product.name}]]></g:title>
      <g:description><![CDATA[${cleanDescription}]]></g:description>
      <g:link>${productUrl}</g:link>
      <g:image_link>${imageUrl}</g:image_link>
      <g:condition>${metaCondition}</g:condition>
      <g:availability>${product.stock_status === 'instock' ? 'in stock' : 'out of stock'}</g:availability>
      <g:price>${priceVal} PKR</g:price>
      <g:brand><![CDATA[${brand}]]></g:brand>
      ${product.sku ? `<g:gtin>${product.sku}</g:gtin>` : ''}
    </item>`;
    }).join('');

    // 3. Assemble full RSS feed
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>PC Wala Online - Product Catalog</title>
    <link>${SITE_URL}</link>
    <description>Your one-stop shop for Gaming PCs, Laptops, CPUs, GPUs and more in Pakistan.</description>
    ${items}
  </channel>
</rss>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 's-maxage=86400, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('Error generating Meta data feed:', error);
    return new NextResponse(
      '<?xml version="1.0"?><error>Failed to generate feed. Please check server logs.</error>', 
      { status: 500, headers: { 'Content-Type': 'application/xml' } }
    );
  }
}
