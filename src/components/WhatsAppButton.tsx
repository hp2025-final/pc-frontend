'use client';

import { WooProduct } from '@/lib/woocommerce';
import { formatPrice, getEffectivePrice } from '@/lib/utils';

const WA_NUMBER = '923423355119';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pcwalaonline.com';

interface WhatsAppButtonProps {
  product: WooProduct;
  variant?: 'full' | 'sticky';
}

function buildWhatsAppMessage(product: WooProduct): string {
  const price = formatPrice(getEffectivePrice(product));
  const url = `${SITE_URL}/product/${product.slug}`;
  const msg = `Hi! I'm interested in:\n*${product.name}*\nPrice: ${price}\n${url}\n\nPlease confirm availability and final price.`;
  return encodeURIComponent(msg);
}

export default function WhatsAppButton({ product, variant = 'full' }: WhatsAppButtonProps) {
  const msg = buildWhatsAppMessage(product);
  const href = `https://wa.me/${WA_NUMBER}?text=${msg}`;

  const handleClick = () => {
    const effectivePrice = getEffectivePrice(product);
    const numericPrice = typeof effectivePrice === "string" ? parseFloat(effectivePrice) : effectivePrice;

    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'InitiateCheckout', {
        content_name: product.name,
        content_category: product.categories && product.categories.length > 0 ? product.categories[0].name : 'Uncategorized',
        content_ids: [product.sku || product.slug],
        contents: [{ id: product.sku || product.slug, quantity: 1 }],
        currency: 'PKR',
        value: !isNaN(numericPrice) ? numericPrice : 0,
      });
    }

    window.open(href, '_blank', 'noopener,noreferrer');
  };

  if (variant === 'sticky') {
    return (
      <div className="wa-sticky">
        <button
          onClick={handleClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 16px',
            background: '#000',
            color: '#fff',
            border: '2px solid #000',
            fontFamily: 'var(--font-pixel), monospace',
            fontSize: '8px',
            letterSpacing: '0.05em',
            cursor: 'pointer',
            boxShadow: '3px 3px 0 #000',
            textTransform: 'uppercase',
          }}
          aria-label="Order on WhatsApp"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
          ORDER NOW
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
      <button
        onClick={handleClick}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          padding: '16px 24px',
          background: '#000',
          color: '#fff',
          border: '2px solid #000',
          fontFamily: 'var(--font-pixel), monospace',
          fontSize: '10px',
          letterSpacing: '0.06em',
          cursor: 'pointer',
          boxShadow: '4px 4px 0 #555',
          textTransform: 'uppercase',
          transition: 'all 0.1s ease',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.background = '#fff';
          el.style.color = '#000';
          el.style.transform = 'translate(-2px,-2px)';
          el.style.boxShadow = '6px 6px 0 #000';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.background = '#000';
          el.style.color = '#fff';
          el.style.transform = 'translate(0,0)';
          el.style.boxShadow = '4px 4px 0 #555';
        }}
        aria-label="Order this product on WhatsApp"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
        </svg>
        ▶ ORDER ON WHATSAPP
      </button>
      <p style={{
        fontFamily: 'var(--font-mono), monospace',
        fontSize: '10px',
        color: '#888',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: '0.03em',
      }}>
        Fast reply · Genuine parts · WhatsApp ordering
      </p>
    </div>
  );
}
