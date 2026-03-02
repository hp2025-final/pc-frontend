'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { MAIN_CATEGORIES, MEGA_SECTIONS } from '@/lib/constants';
import LiveSearch from '@/components/LiveSearch';

function NavItem({ item, countMap, countsLoaded, isMobile, onClick }: { item: { name: string, slug: string }, countMap: Record<string, number>, countsLoaded: boolean, isMobile?: boolean, onClick?: () => void }) {
  // If counts aren't loaded yet, assume 1 (active) so default state is active links
  const count = countsLoaded ? (countMap[item.slug] || 0) : 1;
  const isLive = count > 0;

  if (!isLive) {
    return (
      <div className={isMobile ? "mobile-nav-item disabled" : "nav-item disabled"}>
        {item.name}
        <span className="pixel-tag pixel-tag-gray" style={{ fontSize: '8px', padding: '2px 4px', marginLeft: '6px', boxShadow: 'none' }}>SOON</span>
      </div>
    );
  }

  return (
    <Link
      href={`/category/${item.slug}`}
      onClick={onClick}
      className={isMobile ? "mobile-nav-item" : "nav-item"}
    >
      {item.name}
    </Link>
  );
}

function MegaItem({ item, countMap, countsLoaded }: { item: { name: string, slug: string }, countMap: Record<string, number>, countsLoaded: boolean }) {
  // If counts aren't loaded yet, assume 1 (active)
  const count = countsLoaded ? (countMap[item.slug] || 0) : 1;
  const isLive = count > 0;

  if (!isLive) {
    return (
      <div className="mega-item disabled" style={{ display: 'flex', alignItems: 'center' }}>
        {item.name}
        <span className="pixel-tag pixel-tag-gray" style={{ fontSize: '8px', padding: '2px 4px', marginLeft: '6px', boxShadow: 'none' }}>SOON</span>
      </div>
    );
  }

  return (
    <Link href={`/category/${item.slug}`} className="mega-item">
      {item.name}
    </Link>
  );
}

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [countsLoaded, setCountsLoaded] = useState(false);
  const [catCountMap, setCatCountMap] = useState<Record<string, number>>({});

  useEffect(() => {
    // Fetch counts from the API route (runs once on client mount)
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        setCatCountMap(data);
        setCountsLoaded(true);
      })
      .catch((err) => {
        console.error('Failed to load category counts', err);
        // Even on error, set loaded to true so default active state completes
        setCountsLoaded(true);
      });
  }, []);

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
        <div className="desktop-categories" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexGrow: 1, justifyContent: 'center' }}>
          {MAIN_CATEGORIES.map((cat) => (
            <NavItem key={cat.slug} item={cat} countMap={catCountMap} countsLoaded={countsLoaded} />
          ))}

          {/* Mega Menu Trigger */}
          <div className="mega-menu-trigger" style={{ padding: '4px 8px' }}>
            <div className="nav-item" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
              MORE <span style={{ fontSize: '8px' }}>▼</span>
            </div>

            {/* Mega Menu Content */}
            <div className="mega-menu-content">
              {MEGA_SECTIONS.map((section) => (
                <div key={section.title} className="mega-section">
                  <h3 className="mega-section-title">{section.title}</h3>
                  <div className="mega-section-list">
                    {section.items.map((item) => (
                      <MegaItem key={item.slug} item={item} countMap={catCountMap} countsLoaded={countsLoaded} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Actions (Search + WhatsApp + Mobile Menu) */}
        <div className="right-actions-container" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <LiveSearch />

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
          position: 'absolute',
          top: '60px',
          left: 0,
          right: 0,
          borderBottom: '2px solid #000',
          background: '#fff',
          padding: '16px',
          maxHeight: 'calc(100vh - 60px)',
          overflowY: 'auto',
          zIndex: 99,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div className="mobile-section-title" style={{ marginTop: 0 }}>Main Categories</div>
            {MAIN_CATEGORIES.map((cat) => (
              <NavItem key={cat.slug} item={cat} countMap={catCountMap} countsLoaded={countsLoaded} isMobile onClick={() => setIsMenuOpen(false)} />
            ))}

            {MEGA_SECTIONS.map((section) => (
              <div key={section.title} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div className="mobile-section-title">{section.title}</div>
                {section.items.map((item) => (
                  <NavItem key={item.slug} item={item} countMap={catCountMap} countsLoaded={countsLoaded} isMobile onClick={() => setIsMenuOpen(false)} />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Responsive Styles */}
      <style>{`
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }
        
        .nav-item {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #000;
          text-decoration: none;
          transition: all 0.1s;
          padding: 6px 8px; /* Slightly larger padding for hit area */
          display: flex;
          align-items: center;
        }
        .nav-item:not(.disabled):hover {
          background: #000;
          color: #fff;
        }
        .nav-item.disabled {
          color: #aaa;
          cursor: not-allowed;
        }
        .nav-item.disabled:hover {
          background: transparent;
          color: #aaa;
        }

        /* Mega menu trigger */
        .mega-menu-trigger {
          position: relative;
        }
        .mega-menu-content {
          display: none;
          position: fixed;
          top: 62px;
          left: 50%;
          transform: translateX(-50%);
          width: 900px;
          max-width: 95vw;
          background: #fff;
          border: 2px solid #000;
          padding: 32px;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          z-index: 101;
          box-shadow: 6px 6px 0px rgba(0,0,0,1);
        }
        .mega-menu-trigger:hover .mega-menu-content {
          display: grid;
        }
        /* Create an invisible bridge to prevent hover loss */
        .mega-menu-trigger::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          height: 10px;
          background: transparent;
          display: none;
        }
        .mega-menu-trigger:hover::after {
          display: block;
        }
        
        .mega-section-title {
          font-family: var(--font-pixel), monospace;
          font-size: 10px;
          color: #000;
          border-bottom: 2px solid #000;
          padding-bottom: 8px;
          margin-bottom: 16px;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .mega-section-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .mega-item {
          color: #555;
          font-size: 12px;
          text-decoration: none;
          font-family: var(--font-mono), monospace;
          display: flex;
          align-items: center;
          transition: color 0.1s;
        }
        .mega-item:not(.disabled):hover {
          color: #000;
          text-decoration: underline;
        }
        .mega-item.disabled {
          color: #bbb;
          cursor: not-allowed;
        }

        /* Desktop Defaults */
        .desktop-categories { display: flex; }
        .mobile-menu-btn { display: none; }

        .whatsapp-btn {
          font-size: 10px;
          padding: 8px 14px;
        }
        .whatsapp-icon {
          margin-right: 4px;
        }
        .whatsapp-text { display: inline; }

        /* Mobile specific styles inside the opened menu */
        .mobile-nav-item {
          font-family: var(--font-mono), monospace;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          padding: 10px 12px;
          color: #000;
          border-left: 3px solid transparent;
          transition: all 0.1s;
          text-decoration: none;
          display: flex;
          align-items: center;
        }
        .mobile-nav-item:not(.disabled):hover {
          border-left-color: #000;
          background: #f0f0f0;
        }
        .mobile-nav-item.disabled {
          color: #aaa;
          cursor: not-allowed;
        }

        .mobile-section-title {
          font-family: var(--font-pixel), monospace;
          font-size: 9px;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 12px 0 4px;
          border-bottom: 1px solid #eee;
          margin-bottom: 4px;
          margin-top: 12px;
        }

        /* Mobile Overrides */
        @media (min-width: 951px) {
          .mobile-menu-content { display: none !important; }
        }
        @media (max-width: 950px) {
          .desktop-categories { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        
        @media (max-width: 850px) {
          .nav-container {
            padding: 0 10px !important;
          }
          
          .right-actions-container {
            gap: 4px !important;
          }

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
