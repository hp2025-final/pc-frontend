import Link from 'next/link';
import { WooProduct } from '@/lib/woocommerce';
import { formatPrice, getEffectivePrice, getBrandName, getWarrantyPeriod } from '@/lib/utils';
import CategoryIcon from '@/components/CategoryIcon';

interface ProductCardProps {
  product: WooProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const effectivePrice = getEffectivePrice(product);
  const price = formatPrice(effectivePrice);
  const inStock = product.stock_status === 'instock';
  const brand = getBrandName(product);
  const warranty = getWarrantyPeriod(product);

  return (
    <Link
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
}
