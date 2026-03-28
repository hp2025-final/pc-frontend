import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { woo } from '@/lib/woocommerce';
import WhatsAppButton from '@/components/WhatsAppButton';
import ProductGallery from '@/components/ProductGallery';
import TrackViewContent from '@/components/analytics/TrackViewContent';
import {
  formatPrice, getEffectivePrice, getBrandName,
  getProductCondition, getWarrantyPeriod, getWarrantyType,
  getAvailabilitySchema, stripHtml,
} from '@/lib/utils';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pcwalaonline.com';

// ISR: revalidate every 30 minutes
export const revalidate = 1800;

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await woo.getProductBySlug(slug);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  const effectivePrice = getEffectivePrice(product);
  const priceDisplay = formatPrice(effectivePrice);
  const brand = getBrandName(product);
  const inStock = product.stock_status === 'instock';
  const canonicalUrl = `${SITE_URL}/product/${slug}`;

  // SEO-optimized title: "Product Name — Rs. X Price in Pakistan | PC Wala Online"
  const title = `${product.name} — ${priceDisplay} Price in Pakistan | PC Wala Online`;

  // Rich meta description with brand, price, stock, and call-to-action
  const descParts = [
    `Buy ${product.name}`,
    brand ? `by ${brand}` : '',
    `for ${priceDisplay} in Pakistan.`,
    inStock ? 'In Stock.' : 'Currently out of stock.',
    'Order via WhatsApp for fast delivery. Genuine parts, competitive prices — PC Wala Online.',
  ].filter(Boolean);
  const description = descParts.join(' ');

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.name} — ${priceDisplay} in Pakistan`,
      description,
      url: canonicalUrl,
      siteName: 'PC Wala Online',
      type: 'website',
      images: product.images.length > 0
        ? product.images.map(img => ({
          url: img.src,
          alt: `${product.name} - Buy in Pakistan at PC Wala Online`,
        }))
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} — ${priceDisplay}`,
      description,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await woo.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const effectivePrice = getEffectivePrice(product);
  const priceText = formatPrice(effectivePrice);
  const inStock = product.stock_status === 'instock';
  const brand = getBrandName(product);
  const condition = getProductCondition(product);
  const warranty = getWarrantyPeriod(product);
  const warrantyType = getWarrantyType(product);
  const numericPrice = typeof effectivePrice === "string" ? parseFloat(effectivePrice) : effectivePrice;
  const canonicalUrl = `${SITE_URL}/product/${slug}`;

  // ─── Product JSON-LD (Schema.org) ───────────────────────────
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images.map(img => img.src),
    description: product.short_description
      ? stripHtml(product.short_description)
      : product.description
        ? stripHtml(product.description).substring(0, 300)
        : `${product.name} available at PC Wala Online Pakistan`,
    url: canonicalUrl,
    ...(brand && { brand: { '@type': 'Brand', name: brand } }),
    ...(product.sku && { sku: product.sku }),
    ...(product.categories.length > 0 && { category: product.categories[0].name }),
    offers: !isNaN(numericPrice) && numericPrice > 0
      ? {
        '@type': 'Offer',
        price: numericPrice,
        priceCurrency: 'PKR',
        availability: getAvailabilitySchema(product.stock_status),
        seller: { '@type': 'Organization', name: 'PC Wala Online' },
        url: canonicalUrl,
      }
      : {
        '@type': 'Offer',
        priceCurrency: 'PKR',
        availability: getAvailabilitySchema(product.stock_status),
        seller: { '@type': 'Organization', name: 'PC Wala Online' },
        url: canonicalUrl,
      },
  };

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
      ...(product.categories.length > 0
        ? [{
          '@type': 'ListItem',
          position: 2,
          name: product.categories[0].name,
          item: `${SITE_URL}/category/${product.categories[0].slug}`,
        }]
        : []),
      {
        '@type': 'ListItem',
        position: product.categories.length > 0 ? 3 : 2,
        name: product.name,
        item: canonicalUrl,
      },
    ],
  };

  const viewContentData = {
    content_name: product.name,
    content_category: product.categories.length > 0 ? product.categories[0].name : 'Uncategorized',
    content_ids: [product.sku || product.slug],
    content_type: 'product',
    value: !isNaN(numericPrice) ? numericPrice : 0,
    currency: 'PKR',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <TrackViewContent data={viewContentData} />
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="container-retro" style={{ paddingTop: '24px', paddingBottom: '64px' }}>

        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link href="/">HOME</Link>
          {product.categories.length > 0 && (
            <>
              <span className="breadcrumb-sep">&gt;</span>
              <Link href={`/category/${product.categories[0].slug}`}>
                {product.categories[0].name.toUpperCase()}
              </Link>
            </>
          )}
          <span className="breadcrumb-sep">&gt;</span>
          <span style={{ color: '#000', fontWeight: 700 }}>
            {product.name.length > 30 ? product.name.substring(0, 30) + '...' : product.name}
          </span>
        </nav>

        {/* Main product grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '0',
          border: '2px solid #000',
        }} className="product-detail-grid">

          {/* Left: Image Gallery */}
          <div style={{
            position: 'relative',
          }} className="product-detail-image">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right: Details */}
          <div style={{ padding: '24px' }}>

            {/* Stock Tag */}
            <div style={{ marginBottom: '12px' }}>
              <span className={`pixel-tag ${inStock ? '' : 'pixel-tag-gray'}`} style={{ fontSize: '9px' }}>
                {inStock ? '● IN STOCK' : '○ OUT OF STOCK'}
              </span>
            </div>

            {/* Product Name */}
            <h1 style={{
              fontFamily: 'var(--font-mono), monospace',
              fontWeight: '700',
              fontSize: 'clamp(14px, 3vw, 20px)',
              lineHeight: 1.4,
              marginBottom: '16px',
              color: '#000',
            }}>
              {product.name}
            </h1>

            {/* Price — hero element */}
            <div style={{
              border: '2px solid #000',
              padding: '16px',
              marginBottom: '20px',
              background: '#f9f9f9',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '10px',
                color: '#888',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '6px',
              }}>
                Price
              </div>
              <div style={{
                fontFamily: 'var(--font-pixel), monospace',
                fontSize: 'clamp(10px, 2.5vw, 14px)',
                color: '#000',
                letterSpacing: '-0.01em',
                lineHeight: 1.5,
              }}>
                {priceText}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '10px',
                color: '#888',
                marginTop: '6px',
              }}>
                Final price confirmed on WhatsApp
              </div>
            </div>

            {/* Quick Info Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              marginBottom: '20px',
            }}>
              {brand && (
                <div style={{ borderLeft: '3px solid #000', paddingLeft: '10px' }}>
                  <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', color: '#888', textTransform: 'uppercase', marginBottom: '2px' }}>Brand</div>
                  <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '12px', fontWeight: '700' }}>{brand}</div>
                </div>
              )}
              <div style={{ borderLeft: '3px solid #000', paddingLeft: '10px' }}>
                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', color: '#888', textTransform: 'uppercase', marginBottom: '2px' }}>Condition</div>
                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '12px', fontWeight: '700' }}>{condition}</div>
              </div>
              {warranty && (
                <div style={{ borderLeft: '3px solid #000', paddingLeft: '10px' }}>
                  <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', color: '#888', textTransform: 'uppercase', marginBottom: '2px' }}>Warranty</div>
                  <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '12px', fontWeight: '700' }}>{warranty}</div>
                </div>
              )}
              {warrantyType && (
                <div style={{ borderLeft: '3px solid #000', paddingLeft: '10px' }}>
                  <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', color: '#888', textTransform: 'uppercase', marginBottom: '2px' }}>Warranty Type</div>
                  <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '12px', fontWeight: '700' }}>{warrantyType}</div>
                </div>
              )}
              {product.sku && (
                <div style={{ borderLeft: '3px solid #000', paddingLeft: '10px' }}>
                  <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', color: '#888', textTransform: 'uppercase', marginBottom: '2px' }}>SKU</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }}>{product.sku}</div>
                </div>
              )}
            </div>

            {/* Short Description */}
            {product.short_description && (
              <div
                className="prose-retro"
                style={{ marginBottom: '20px', paddingLeft: '12px', borderLeft: '3px solid #e0e0e0' }}
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
            )}

            {/* WhatsApp Button */}
            <WhatsAppButton product={product} />
          </div>
        </div>

        {/* Specifications Table */}
        {product.attributes.length > 0 && (
          <div style={{ marginTop: '32px' }}>
            <h2 className="section-title">{"// Specifications"}</h2>
            <table className="spec-table">
              <tbody>
                {product.attributes.map((attr, index) => (
                  <tr key={`${attr.id}-${attr.name}-${index}`}>
                    <td>{attr.name}</td>
                    <td>{attr.options.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Full Description */}
        {product.description && (
          <div style={{ marginTop: '32px' }}>
            <h2 className="section-title">{"// Description"}</h2>
            <div
              className="prose-retro"
              style={{
                border: '2px solid #000',
                padding: '24px',
              }}
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        )}

        {/* Back Link */}
        <div style={{ marginTop: '32px' }}>
          {product.categories.length > 0 ? (
            <Link href={`/category/${product.categories[0].slug}`} className="pixel-btn pixel-btn-outline">
              ← Back to {product.categories[0].name}
            </Link>
          ) : (
            <Link href="/" className="pixel-btn pixel-btn-outline">
              ← Back to Home
            </Link>
          )}
        </div>
      </div>

      {/* Sticky WhatsApp button on mobile */}
      <WhatsAppButton product={product} variant="sticky" />

      <style>{`
        @media (min-width: 768px) {
          .product-detail-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .product-detail-image {
            border-bottom: none !important;
            border-right: 2px solid #000;
            min-height: 480px !important;
          }
        }
      `}</style>
    </div>
  );
}
