'use client';

import Link from 'next/link';

const WA_NUMBER = '923423355119';

const FOOTER_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'PC Cases', href: '/category/pc-cases' },
  { label: 'Motherboards', href: '/category/motherboards' },
  { label: 'Graphics Cards', href: '/category/gpus' },
  { label: 'Processors', href: '/category/cpus' },
  { label: 'Laptops', href: '/category/laptops' },
  { label: 'Search', href: '/search' },
];

const SUPPORT_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Warranty', href: '/warranty' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: '#000',
      color: '#fff',
      borderTop: '3px solid #000',
      marginTop: '64px',
    }}>
      {/* Main footer grid */}
      <div className="container-retro" style={{ padding: '48px 16px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>

          {/* Brand Column */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{
                fontFamily: 'var(--font-pixel), monospace',
                fontSize: '14px',
                color: '#fff',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}>
                PC WALA
              </div>
              <div style={{
                fontFamily: 'var(--font-pixel), monospace',
                fontSize: '9px',
                color: '#888',
                letterSpacing: '0.1em',
                marginTop: '4px',
              }}>
                ONLINE
              </div>
            </div>
            <p style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '11px',
              color: '#aaa',
              lineHeight: 1.7,
              maxWidth: '240px',
              marginBottom: '20px',
            }}>
              Pakistan&apos;s retro-cool PC parts store. Genuine components, competitive prices, delivered fast.
            </p>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '2px solid #fff',
                padding: '10px 16px',
                fontFamily: 'var(--font-pixel), monospace',
                fontSize: '9px',
                color: '#fff',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                transition: 'all 0.1s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#fff';
                (e.currentTarget as HTMLElement).style.color = '#000';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = '#fff';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              ORDER ON WHATSAPP
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <div style={{
              fontFamily: 'var(--font-pixel), monospace',
              fontSize: '9px',
              color: '#888',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '14px',
              paddingBottom: '8px',
              borderBottom: '1px solid #333',
            }}>
              Shop
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '11px',
                      color: '#aaa',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      transition: 'color 0.1s',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#aaa'; }}
                  >
                    › {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <div style={{
              fontFamily: 'var(--font-pixel), monospace',
              fontSize: '9px',
              color: '#888',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '14px',
              paddingBottom: '8px',
              borderBottom: '1px solid #333',
            }}>
              Support
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {SUPPORT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '11px',
                      color: '#aaa',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      transition: 'color 0.1s',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#aaa'; }}
                  >
                    › {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid #333',
          marginTop: '40px',
          paddingTop: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
        }}>
          <p style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '10px',
            color: '#555',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            © {currentYear} PC Wala Online. All rights reserved.
          </p>
          <p style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '10px',
            color: '#555',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            {'// Powered by Next.js'} &amp; WooCommerce
          </p>
        </div>
      </div>
    </footer>
  );
}
