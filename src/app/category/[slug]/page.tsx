import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { woo } from '@/lib/woocommerce';
import { formatPriceRange, getEffectivePrice, getBrandName, getWarrantyPeriod } from '@/lib/utils';
import CategoryIcon from '@/components/CategoryIcon';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

// ISR: revalidate every 60 minutes
export const revalidate = 3600;

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await woo.getCategoryBySlug(slug);

  if (!category) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${category.name} — PC Wala Online`,
    description: category.description || `Shop ${category.name} at PC Wala Online. Competitive prices, WhatsApp ordering.`,
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = parseInt(pageParam || '1');
  const perPage = 40;

  // Fetch category first, then use its ID directly to avoid double-fetch
  const category = await woo.getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await woo.getProductsByCategory(slug, {
    page,
    per_page: perPage,
    orderby: 'date',
    order: 'desc',
  }, category.id);

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>

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

      <div className="container-retro" style={{ paddingTop: '32px', paddingBottom: '64px' }}>

        {products.length > 0 ? (
          <>
            {/* Products Grid */}
            <div style={{
              display: 'grid',
              gap: '8px',
              marginBottom: '32px',
            }} className="cat-products-grid">
              {products.map((product) => {
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

            {/* Pagination */}
            {products.length === perPage && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                {page > 1 && (
                  <Link
                    href={`/category/${slug}?page=${page - 1}`}
                    className="pixel-btn pixel-btn-outline"
                  >
                    ← PREV PAGE
                  </Link>
                )}
                <Link
                  href={`/category/${slug}?page=${page + 1}`}
                  className="pixel-btn"
                >
                  NEXT PAGE →
                </Link>
              </div>
            )}

            <style>{`
            .cat-products-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            @media (min-width: 600px)  { .cat-products-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
            @media (min-width: 900px)  { .cat-products-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
            @media (min-width: 1200px) { .cat-products-grid { grid-template-columns: repeat(5, minmax(0, 1fr)); } }
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
              COMING SOON
            </h2>
            <p style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '12px',
              color: '#888',
              marginBottom: '24px',
            }}>
              No products in this category yet. We&apos;re stocking up!
            </p>
            <Link href="/" className="pixel-btn">
              ← BACK TO HOME
            </Link>
          </div>
        )}
      </div>
    </div >
  );
}
