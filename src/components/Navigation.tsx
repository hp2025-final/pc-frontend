'use client';

import { useState } from 'react';
import Link from 'next/link';

const NAV_CATEGORIES = [
  { name: 'Processors', slug: 'cpus' },
  { name: 'Motherboards', slug: 'motherboards' },
  { name: 'Graphics', slug: 'gpus' },
  { name: 'RAM', slug: 'ram' },
  { name: 'Storage', slug: 'storage' },
  { name: 'PSU', slug: 'power-supplies' },
  { name: 'Cases', slug: 'pc-cases' },
];

const ALL_CATEGORIES = [
  ...NAV_CATEGORIES,
  { name: 'Coolers', slug: 'cpu-coolers' },
  { name: 'Laptops', slug: 'laptops' },
  { name: 'Monitors', slug: 'monitors' },
  { name: 'Prebuilt PCs', slug: 'prebuilt-pcs' },
  { name: 'Peripherals', slug: 'peripherals' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      style={{
        background: '#fff',
        borderBottom: '2px solid #000',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Top Bar */}
      <div
        className="nav-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '60px',
          width: '100%',
          padding: '0 16px',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1, flexShrink: 0 }}>
          <span style={{
            fontFamily: 'var(--font-pixel), monospace',
            fontSize: '13px',
            fontWeight: '400',
            color: '#000',
            letterSpacing: '-0.02em',
          }}>
            PC WALA
          </span>
          <span style={{
            fontFamily: 'var(--font-pixel), monospace',
            fontSize: '9px',
            color: '#555',
            letterSpacing: '0.08em',
            marginTop: '2px',
          }}>
            ONLINE
          </span>
        </Link>

        {/* Desktop Main Categories */}
        <div className="desktop-categories" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexGrow: 1, justifyContent: 'center' }}>
          {NAV_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '11px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: '#000',
                textDecoration: 'none',
                transition: 'all 0.1s',
                padding: '4px 8px',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#000';
                (e.currentTarget as HTMLElement).style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = '#000';
              }}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Right Actions (Search + WhatsApp + Mobile Menu) */}
        <div className="right-actions-container" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <Link
            href="/search"
            className="search-btn"
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontWeight: '700',
              textTransform: 'uppercase',
              color: '#000',
              textDecoration: 'none',
              border: '2px solid transparent',
              transition: 'all 0.1s',
              display: 'flex',
              alignItems: 'center',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = '#000';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
            }}
          >
            <span className="search-icon">⌕</span>
            <span className="search-text">Search</span>
          </Link>

          <a
            href={`https://wa.me/923423355119`}
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-btn whatsapp-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
            }}
          >
            <span className="whatsapp-icon">▶</span>
            <span className="whatsapp-text">WhatsApp</span>
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              background: 'none',
              border: '2px solid #000',
              padding: '6px 8px',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '14px',
              lineHeight: 1,
              color: '#000',
            }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMenuOpen && (
        <div className="mobile-menu-content" style={{
          borderTop: '2px solid #000',
          background: '#fff',
          padding: '16px',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{
              fontFamily: 'var(--font-pixel), monospace',
              fontSize: '9px',
              color: '#888',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '8px 0 4px',
              borderBottom: '1px solid #000',
              marginBottom: '8px',
            }}>
              All Categories
            </div>
            {ALL_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={() => setIsMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '12px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  padding: '10px 12px',
                  color: '#000',
                  borderLeft: '3px solid transparent',
                  transition: 'all 0.1s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderLeftColor = '#000';
                  (e.currentTarget as HTMLElement).style.background = '#f0f0f0';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderLeftColor = 'transparent';
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Responsive Styles */}
      <style>{`
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        /* Desktop Defaults */
        .desktop-categories { display: flex; }
        .mobile-menu-btn { display: none; }
        .mobile-menu-content { display: none; }
        
        .search-btn {
          font-size: 11px;
          letter-spacing: 0.06em;
          padding: 8px 14px;
        }
        .search-icon {
          font-size: 14px;
          margin-right: 4px;
        }
        .search-text { display: inline; }

        .whatsapp-btn {
          font-size: 10px;
          padding: 8px 14px;
        }
        .whatsapp-icon {
          margin-right: 4px;
        }
        .whatsapp-text { display: inline; }

        /* Mobile Overrides */
        @media (max-width: 850px) {
          .nav-container {
            padding: 0 10px !important;
          }
          .desktop-categories { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .mobile-menu-content { display: block; }
          
          .right-actions-container {
            gap: 4px !important;
          }
          
          /* Search icon only on mobile */
          .search-btn {
            padding: 4px 6px !important;
            border: 2px solid transparent !important;
          }
          .search-text { display: none; }
          .search-icon { margin-right: 0; font-size: 18px; font-weight: bold; }

          /* WhatsApp text button on mobile */
          .whatsapp-btn {
            padding: 6px 6px !important;
            font-size: 8px !important;
          }
          .whatsapp-icon { font-size: 8px; margin-right: 2px; }
          
          .mobile-menu-btn {
            padding: 4px 6px !important;
            font-size: 14px !important;
          }
        }
        
        @media (max-width: 360px) {
          .whatsapp-text { display: none; }
          .whatsapp-icon { margin-right: 0; font-size: 12px; }
        }
      `}</style>
    </nav>
  );
}
