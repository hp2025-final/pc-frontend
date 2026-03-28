import Link from 'next/link';
import { woo } from '@/lib/woocommerce';
import { formatPrice, getEffectivePrice, getBrandName, getWarrantyPeriod } from '@/lib/utils';
import CategoryIcon from '@/components/CategoryIcon';
import AnimatedText from '@/components/AnimatedText';
import { ALL_HOME_CATEGORIES } from '@/lib/constants';

// ISR: revalidate every 2 hours
export const revalidate = 7200;

export default async function HomePage() {
  const [wooCategories, latestProducts] = await Promise.all([
    woo.getCategories({ per_page: 100 }),
    woo.getProductsByCategory('latest-arrival', { per_page: 12, orderby: 'date', order: 'desc' }),
  ]);

  // Map WooCommerce category counts by slug
  const catCountMap: Record<string, number> = {};
  for (const c of wooCategories) {
    catCountMap[c.slug] = c.count;
  }

  // ─── Organization JSON-LD ──────────────────────────────────
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PC Wala Online',
    url: 'https://www.pcwalaonline.com',
    logo: 'https://www.pcwalaonline.com/favicon.ico',
    description: "Pakistan's #1 PC parts store. Shop GPUs, CPUs, Motherboards, Gaming Laptops & more at competitive prices.",
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+923423355119',
      contactType: 'sales',
      areaServed: 'PK',
      availableLanguage: ['English', 'Urdu'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'PK',
    },
  };

  // ─── WebSite JSON-LD with SearchAction ─────────────────────
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PC Wala Online',
    url: 'https://www.pcwalaonline.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.pcwalaonline.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      {/* ──────────── HERO ──────────── */}
      <section className="scanline-bg" style={{
        background: '#fff',
        borderBottom: '3px solid #000',
        padding: '64px 16px 56px',
        textAlign: 'center',
      }}>
        <div className="container-retro">
          <div style={{
            display: 'inline-block',
            border: '3px solid #000',
            padding: '6px 16px',
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '10px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            marginBottom: '24px',
            background: '#000',
            color: '#fff',
          }}>
            {'// LEVEL UP YOUR BUILD'}
          </div>

          <h1 style={{
            fontFamily: 'var(--font-pixel), monospace',
            fontSize: 'clamp(18px, 5vw, 36px)',
            lineHeight: 1.3,
            letterSpacing: '-0.02em',
            marginBottom: '16px',
            color: '#000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span>PC WALA</span>
            <AnimatedText words={['ONLINE', 'GAMING', 'PROFESSIONALS']} />
          </h1>

          <p className="cursor-blink" style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 'clamp(12px, 2.5vw, 16px)',
            color: '#555',
            marginBottom: '36px',
            letterSpacing: '0.02em',
          }}>
            GEAR UP. PLAY ON
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="#latest-arrivals" className="pixel-btn">
              ▶ Latest Arrivals
            </Link>
            <Link href="#shop-by-category" className="pixel-btn pixel-btn-outline">
              ▦ Shop by Category
            </Link>
          </div>
        </div>
      </section>

      <div className="container-retro" style={{ paddingTop: '48px', paddingBottom: '64px' }}>

        {/* ──────────── CATEGORIES ──────────── */}
        <section id="shop-by-category" style={{ marginBottom: '64px', scrollMarginTop: '80px' }}>
          <div style={{
            display: 'grid',
            gap: '12px',
          }}
            className="cat-grid"
          >
            {ALL_HOME_CATEGORIES.map((cat) => {
              const count = catCountMap[cat.slug] ?? 0;
              const isLive = count > 0;

              if (!isLive) {
                return (
                  <div
                    key={cat.slug}
                    className="category-tile category-tile-coming"
                    aria-label={`${cat.name} — coming soon`}
                  >
                    <CategoryIcon slug={cat.slug} size={28} color="#aaa" />
                    <span className="category-tile-name" style={{ color: '#aaa' }}>{cat.name}</span>
                    <span className="pixel-tag pixel-tag-gray" style={{ fontSize: '8px', padding: '2px 6px' }}>SOON</span>
                  </div>
                );
              }

              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="category-tile"
                  aria-label={`Shop ${cat.name} — ${count} products`}
                >
                  <CategoryIcon slug={cat.slug} size={28} color="#000" />
                  <span className="category-tile-name">{cat.name}</span>
                  <span className="category-tile-count">{count} items</span>
                </Link>
              );
            })}
          </div>

          <style>{`
            .cat-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            @media (min-width: 480px) { .cat-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
            @media (min-width: 768px) { .cat-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
            @media (min-width: 1024px) { .cat-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
          `}</style>
        </section>

        {/* ──────────── LATEST PRODUCTS ──────────── */}
        <section id="latest-arrivals" style={{ marginBottom: '64px', scrollMarginTop: '80px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
            <h2 className="section-title" style={{ marginBottom: 0, borderBottom: 'none' }}>{"// Latest Arrivals"}</h2>
            <Link
              href="/search"
              style={{
                fontFamily: 'var(--font-pixel), monospace',
                fontSize: '9px',
                color: '#000',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              VIEW ALL →
            </Link>
          </div>

          {latestProducts.length > 0 ? (
            <div style={{
              display: 'grid',
              gap: '8px',
            }} className="products-grid">
              {latestProducts.map((product) => {
                const effectivePrice = getEffectivePrice(product);
                const price = formatPrice(effectivePrice);
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
                          <CategoryIcon slug={product.categories[0]?.slug || ''} size={40} color="#ccc" />
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

                      <div className="price-range price-range-sm">{price}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div style={{
              border: '2px solid #000',
              padding: '48px 24px',
              textAlign: 'center',
            }}>
              <p style={{ fontFamily: 'var(--font-pixel), monospace', fontSize: '11px', color: '#888' }}>
                No products yet. Check back soon.
              </p>
            </div>
          )}

          <style>{`
            .products-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            @media (min-width: 600px)  { .products-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
            @media (min-width: 768px)  { .products-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
            @media (min-width: 1024px) { .products-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
          `}</style>
        </section>

        {/* ──────────── WHY US ──────────── */}
        <section>
          <h2 className="section-title">{"// Why Choose Us"}</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '12px',
          }} className="why-grid">
            {[
              { icon: '✓', title: 'Genuine Parts', desc: 'Only authentic, verified components. No counterfeits.' },
              { icon: '▶', title: 'WhatsApp Order', desc: 'Fast ordering via WhatsApp. Real humans reply fast.' },
              { icon: '⚡', title: 'Competitive Price', desc: 'Best market rates. Price shown upfront.' },
            ].map((item) => (
              <div key={item.title} className="pixel-box" style={{ padding: '24px' }}>
                <div style={{
                  fontFamily: 'var(--font-pixel), monospace',
                  fontSize: '20px',
                  marginBottom: '12px',
                  color: '#000',
                }}>
                  {item.icon}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-pixel), monospace',
                  fontSize: '10px',
                  marginBottom: '8px',
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                  color: '#000',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '12px',
                  color: '#555',
                  lineHeight: 1.6,
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <style>{`
            @media (min-width: 600px) { .why-grid { grid-template-columns: repeat(3, 1fr); } }
          `}</style>
        </section>

      </div>
    </div>
  );
}