'use client';

import { useState } from 'react';
import { WooProduct } from '@/lib/woocommerce';
import { formatPrice } from '@/lib/utils';

interface WhatsAppButtonProps {
  product: WooProduct;
}

export default function WhatsAppButton({ product }: WhatsAppButtonProps) {
  const [showToast, setShowToast] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER || '+923423355119';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pcwalaonline.com';
  
  // Create WhatsApp message
  const message = `${product.name} (SKU:${product.sku || product.id}) — ${siteUrl}/product/${product.slug} — Price: ${formatPrice(product.price)}. I'm interested.`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${waNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;

  const handleWhatsAppClick = () => {
    // Analytics event (if GA4 is configured)
    if (typeof window !== 'undefined') {
      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      w.gtag?.('event', 'whatsapp_click', {
        custom_map: {
          product_id: product.id,
          product_name: product.name,
          sku: product.sku || product.id,
          price: product.price,
          category: product.categories.length > 0 ? product.categories[0].name : 'Unknown',
          page_url: typeof window !== 'undefined' ? window.location.href : '',
        },
      });
    }

    // Try to open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Show toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    } catch (error) {
      console.error('Failed to copy message:', error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Main WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors"
        disabled={product.stock_status !== 'instock'}
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.288"/>
        </svg>
        <span>
          {product.stock_status === 'instock' ? 'Order on WhatsApp' : 'Out of Stock'}
        </span>
      </button>

      {/* Copy Message Button (fallback) */}
      <button
        onClick={handleCopyMessage}
        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg text-sm transition-colors"
      >
        {copiedToClipboard ? 'Message Copied!' : 'Copy Message'}
      </button>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg max-w-sm z-50">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-green-200" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-medium">WhatsApp opened!</p>
              <p className="text-sm text-green-200">
                If WhatsApp didn&apos;t open, use the &quot;Copy Message&quot; button.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

