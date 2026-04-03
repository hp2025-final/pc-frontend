import Link from 'next/link';
import { WooProduct } from '@/lib/woocommerce';
import ProductCard from './ProductCard';

interface HomeProductSectionProps {
  id?: string;
  title: string;
  products: WooProduct[];
  viewAllLink: string;
  emptyMessage?: string;
  columns?: number;
  className?: string;
}

export default function HomeProductSection({
  id,
  title,
  products,
  viewAllLink,
  emptyMessage = "No products yet. Check back soon.",
  columns = 4,
  className = "",
}: HomeProductSectionProps) {
  const gridClass = `products-grid-${title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <section id={id} className={className} style={{ marginBottom: '64px', scrollMarginTop: '80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
        <h2 className="section-title" style={{ marginBottom: 0, borderBottom: 'none' }}>{`// ${title}`}</h2>
        <Link
          href={viewAllLink}
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

      {products.length > 0 ? (
        <div style={{
          display: 'grid',
          gap: '8px',
        }} className={`products-grid ${gridClass}`}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div style={{
          border: '2px solid #000',
          padding: '48px 24px',
          textAlign: 'center',
        }}>
          <p style={{ fontFamily: 'var(--font-pixel), monospace', fontSize: '11px', color: '#888' }}>
            {emptyMessage}
          </p>
        </div>
      )}

      {/* Dynamic Grid Column CSS */}
      <style>{`
        .${gridClass} { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        @media (min-width: 768px)  { .${gridClass} { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
        @media (min-width: 1024px) { .${gridClass} { grid-template-columns: repeat(${columns}, minmax(0, 1fr)); } }
      `}</style>
    </section>
  );
}
