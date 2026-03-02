import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import { woo } from '@/lib/woocommerce';
import { formatPriceRange, getEffectivePrice, getBrandName, getWarrantyPeriod } from '@/lib/utils';
import CategoryIcon from '@/components/CategoryIcon';
import CategoryFilters from '@/components/CategoryFilters';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    page?: string;
    sort?: string;
    brand?: string;
    min_price?: string;
    max_price?: string;
  }>;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pcwalaonline.com';

// ISR: revalidate every 60 minutes
export const revalidate = 3600;

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await woo.getCategoryBySlug(slug);

  if (!category) {
    return { title: 'Category Not Found' };
  }

  const canonicalUrl = `${SITE_URL}/category/${slug}`;
  const title = `${category.name} — Buy in Pakistan | PC Wala Online`;
  const description = category.description
    || `Shop ${category.name} at PC Wala Online Pakistan. ${category.count} products available at competitive prices in PKR. Order via WhatsApp for fast delivery.`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'PC Wala Online',
      type: 'website',
    },
  };
}

// Parse sort param into orderby/order for WC API
function parseSortParam(sort: string | undefined): { orderby: 'date' | 'price'; order: 'asc' | 'desc' } {
  switch (sort) {
    case 'date_asc': return { orderby: 'date', order: 'asc' };
    case 'price_desc': return { orderby: 'price', order: 'desc' };
    case 'price_asc': return { orderby: 'price', order: 'asc' };
    default: return { orderby: 'date', order: 'desc' };
  }
}

// Generate pagination page numbers
function getPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | '...')[] = [1];

  if (current > 3) {
    pages.push('...');
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push('...');
  }

  pages.push(total);

  return pages;
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const page = parseInt(sp.page || '1');
  const perPage = 40;

  // Parse sort/filter params
  const { orderby, order } = parseSortParam(sp.sort);
  const brandFilter = sp.brand || '';
  const minPrice = sp.min_price || '';
  const maxPrice = sp.max_price || '';

  // Fetch category
  const category = await woo.getCategoryBySlug(slug);
  if (!category) {
    notFound();
  }

  // Fetch products with metadata (total, totalPages)
  const { products, totalPages } = await woo.getProductsWithMeta({
    page,
    per_page: perPage,
    orderby: orderby as 'date' | 'price',
    order,
    category: category.id.toString(),
    min_price: minPrice ? parseFloat(minPrice) : undefined,
    max_price: maxPrice ? parseFloat(maxPrice) : undefined,
  });

  // Filter by brand client-side (WC doesn't have native brand filter in basic API)
  const filteredProducts = brandFilter
    ? products.filter((p) => {
      const pBrand = getBrandName(p);
      return pBrand.toLowerCase() === brandFilter.toLowerCase();
    })
    : products;

  // Extract unique brands from current page products for filter options
  const allBrands = [...new Set(products.map((p) => getBrandName(p)).filter(Boolean))].sort();

  // Build base URL for pagination links (preserving filters)
  const buildPageUrl = (pageNum: number) => {
    const params = new URLSearchParams();
    if (pageNum > 1) params.set('page', pageNum.toString());
    if (sp.sort) params.set('sort', sp.sort);
    if (brandFilter) params.set('brand', brandFilter);
    if (minPrice) params.set('min_price', minPrice);
    if (maxPrice) params.set('max_price', maxPrice);
    const qs = params.toString();
    return `/category/${slug}${qs ? `?${qs}` : ''}`;
  };

  const pageNumbers = getPageNumbers(page, totalPages);
  const canonicalUrl = `${SITE_URL}/category/${slug}`;

  // ─── BreadcrumbList JSON-LD ─────────────────────────────────
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: category.name,
        item: canonicalUrl,
      },
    ],
  };

  // ─── ItemList JSON-LD (product listing) ─────────────────────
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: category.name,
    url: canonicalUrl,
    numberOfItems: filteredProducts.length,
    itemListElement: filteredProducts.map((product, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: `${SITE_URL}/product/${product.slug}`,
      name: product.name,
    })),
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      {/* Category Header */}
      <div style={{
        borderBottom: '2px solid #000',
        background: '#000',
        color: '#fff',
        padding: '32px 16px',
      }}>
        <div className="container-retro">
          {/* Breadcrumb */}
          <nav className="breadcrumb" style={{ color: '#aaa', marginBottom: '16px' }}>
            <Link href="/" style={{ color: '#aaa' }}>HOME</Link>
            <span className="breadcrumb-sep">&gt;</span>
            <span style={{ color: '#fff' }}>{category.name.toUpperCase()}</span>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ opacity: 0.9, filter: 'invert(1)' }}>
              <CategoryIcon slug={slug} size={36} color="#000" />
            </div>
            <div>
              <h1 style={{
                fontFamily: 'var(--font-pixel), monospace',
                fontSize: 'clamp(13px, 3vw, 20px)',
                color: '#fff',
                marginBottom: '6px',
                letterSpacing: '-0.01em',
              }}>
                {category.name.toUpperCase()}
              </h1>
              <p style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '11px',
                color: '#aaa',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}>
                {category.count} product{category.count !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-retro" style={{ paddingTop: '24px', paddingBottom: '64px' }}>

        {/* Filters & Sort */}
        <Suspense fallback={null}>
          <CategoryFilters
            brands={allBrands}
            currentSort={sp.sort || 'date_desc'}
            currentBrand={brandFilter}
            currentMinPrice={minPrice}
            currentMaxPrice={maxPrice}
          />
        </Suspense>

        {filteredProducts.length > 0 ? (
          <>
            {/* Products Grid */}
            <div style={{
              display: 'grid',
              gap: '8px',
              marginBottom: '32px',
            }} className="cat-products-grid">
              {filteredProducts.map((product) => {
                const effectivePrice = getEffectivePrice(product);
                const priceRange = formatPriceRange(effectivePrice);
                const inStock = product.stock_status === 'instock';
                const brand = getBrandName(product);
                const warranty = getWarrantyPeriod(product);

                return (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className="product-card"
                    style={{ textDecoration: 'none' }}
                  >
                    {/* Image */}
                    <div className="product-card-image">
                      <span className={`pixel-tag ${inStock ? '' : 'pixel-tag-gray'}`} style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        zIndex: 10,
                        fontSize: '9px',
                        padding: '4px 6px',
                        boxShadow: 'none'
                      }}>
                        {inStock ? 'IN STOCK' : 'OUT OF STOCK'}
                      </span>
                      {product.images.length > 0 ? (
                        <img
                          src={product.images[0].src}
                          alt={product.images[0].alt || product.name}
                          loading="lazy"
                          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', padding: '16px' }}
                        />
                      ) : (
                        <div style={{
                          width: '100%', height: '100%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: '#f0f0f0',
                        }}>
                          <CategoryIcon slug={slug} size={40} color="#ccc" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="product-card-body">
                      <h3 className="product-card-title">{product.name}</h3>

                      {(brand || warranty) && (
                        <span style={{
                          fontFamily: 'var(--font-mono), monospace',
                          fontSize: '10px',
                          color: '#888',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                        }}>
                          {[brand, warranty].filter(Boolean).join(' | ')}
                        </span>
                      )}

                      <div className="price-range price-range-sm">{priceRange}</div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Numbered Pagination */}
            {totalPages > 1 && (
              <nav aria-label="Pagination" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '4px',
                flexWrap: 'wrap',
              }}>
                {/* Previous */}
                {page > 1 && (
                  <Link
                    href={buildPageUrl(page - 1)}
                    className="pg-btn"
                    aria-label="Previous page"
                  >
                    ‹
                  </Link>
                )}

                {/* Page Numbers */}
                {pageNumbers.map((pn, idx) =>
                  pn === '...' ? (
                    <span key={`ellipsis-${idx}`} className="pg-ellipsis">…</span>
                  ) : (
                    <Link
                      key={pn}
                      href={buildPageUrl(pn)}
                      className={`pg-btn ${pn === page ? 'pg-current' : ''}`}
                      aria-current={pn === page ? 'page' : undefined}
                    >
                      {pn}
                    </Link>
                  )
                )}

                {/* Next */}
                {page < totalPages && (
                  <Link
                    href={buildPageUrl(page + 1)}
                    className="pg-btn"
                    aria-label="Next page"
                  >
                    ›
                  </Link>
                )}
              </nav>
            )}

            <style>{`
            .cat-products-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            @media (min-width: 600px)  { .cat-products-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
            @media (min-width: 900px)  { .cat-products-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
            @media (min-width: 1200px) { .cat-products-grid { grid-template-columns: repeat(5, minmax(0, 1fr)); } }

            /* Pagination Styles */
            .pg-btn {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              min-width: 36px;
              height: 36px;
              padding: 0 10px;
              border: 2px solid #000;
              background: #fff;
              color: #000;
              font-family: var(--font-mono), monospace;
              font-size: 12px;
              font-weight: 700;
              text-decoration: none;
              transition: all 0.1s;
              cursor: pointer;
            }
            .pg-btn:hover {
              background: #000;
              color: #fff;
              transform: translate(-1px, -1px);
              box-shadow: 2px 2px 0px #000;
            }
            .pg-current {
              background: #000 !important;
              color: #fff !important;
              cursor: default;
              box-shadow: 2px 2px 0px rgba(0,0,0,0.3);
            }
            .pg-ellipsis {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              min-width: 28px;
              height: 36px;
              font-family: var(--font-mono), monospace;
              font-size: 14px;
              color: #888;
              user-select: none;
            }
            @media (max-width: 480px) {
              .pg-btn {
                min-width: 32px;
                height: 32px;
                font-size: 11px;
                padding: 0 6px;
              }
            }
          `}</style>
          </>
        ) : (
          <div style={{
            border: '2px solid #000',
            padding: '64px 24px',
            textAlign: 'center',
          }}>
            <div style={{ marginBottom: '16px' }}>
              <CategoryIcon slug={slug} size={48} color="#ccc" />
            </div>
            <h2 style={{
              fontFamily: 'var(--font-pixel), monospace',
              fontSize: '12px',
              marginBottom: '12px',
              color: '#000',
            }}>
              {brandFilter || minPrice ? 'NO MATCHING PRODUCTS' : 'COMING SOON'}
            </h2>
            <p style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '12px',
              color: '#888',
              marginBottom: '24px',
            }}>
              {brandFilter || minPrice
                ? 'Try adjusting your filters to find what you\'re looking for.'
                : 'No products in this category yet. We\'re stocking up!'}
            </p>
            {(brandFilter || minPrice) ? (
              <Link href={`/category/${slug}`} className="pixel-btn">
                ✕ CLEAR FILTERS
              </Link>
            ) : (
              <Link href="/" className="pixel-btn">
                ← BACK TO HOME
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
