import { NextRequest, NextResponse } from 'next/server';
import { woo } from '@/lib/woocommerce';

/**
 * GET /api/search?q=...
 * Returns max 5 lightweight product results for live search
 */
export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') || '';

  if (q.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const products = await woo.getProducts({
      search: q,
      per_page: 5,
      page: 1,
      orderby: 'date',
      order: 'desc',
    });

    const results = products.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: p.price,
      regular_price: p.regular_price,
      sale_price: p.sale_price,
      stock_status: p.stock_status,
      image: p.images[0]?.src || null,
      brand: p.brands?.[0]?.name || '',
    }));

    return NextResponse.json(results);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json([], { status: 500 });
  }
}
