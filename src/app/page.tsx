import Link from 'next/link';
import { woo } from '@/lib/woocommerce';
import CategoryIcon from '@/components/CategoryIcon';
import AnimatedText from '@/components/AnimatedText';
import ProductCard from '@/components/ProductCard';
import HomeProductSection from '@/components/HomeProductSection';
import { ALL_HOME_CATEGORIES } from '@/lib/constants';

// ISR: revalidate every 2 hours
export const revalidate = 7200;

export default async function HomePage() {
  const [
    wooCategories,
    usedLaptops,
    pcCases,
    gpus,
    motherboards,
    cpus,
    cooling,
    psu,
    storage,
    ram,
    keyboards,
    mice
  ] = await Promise.all([
    woo.getCategories({ per_page: 100 }),
    woo.getProductsByCategory('laptops', { per_page: 10, orderby: 'date', order: 'desc' }),
    woo.getProductsByCategory('pc-cases', { per_page: 10, orderby: 'date', order: 'desc' }),
    woo.getProductsByCategory('gpus', { per_page: 10, orderby: 'date', order: 'desc' }),
    woo.getProductsByCategory('motherboards', { per_page: 10, orderby: 'date', order: 'desc' }),
    woo.getProductsByCategory('cpus', { per_page: 10, orderby: 'date', order: 'desc' }),
    woo.getProductsByCategory('pc-cooling-systems', { per_page: 10, orderby: 'date', order: 'desc' }),
    woo.getProductsByCategory('power-supplies', { per_page: 10, orderby: 'date', order: 'desc' }),
    woo.getProductsByCategory('storage', { per_page: 10, orderby: 'date', order: 'desc' }),
    woo.getProductsByCategory('ram', { per_page: 10, orderby: 'date', order: 'desc' }),
    woo.getProductsByCategory('gaming-keyboards', { per_page: 10, orderby: 'date', order: 'desc' }),
    woo.getProductsByCategory('gaming-mouse', { per_page: 10, orderby: 'date', order: 'desc' }),
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
            <Link href="#shop-by-category" className="pixel-btn">
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
            {ALL_HOME_CATEGORIES.filter(cat => (catCountMap[cat.slug] ?? 0) > 0).map((cat) => {
              const count = catCountMap[cat.slug];
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


        {/* ──────────── WHY US ──────────── */}
        <section style={{ marginBottom: '64px' }}>
          <h2 className="section-title">{"// Why Choose Us"}</h2>
          <div style={{
            display: 'grid',
            gap: '12px',
          }} className="why-grid">
            {[
              { title: 'Genuine Parts', desc: 'Only authentic, verified components. No counterfeits.' },
              { title: 'WhatsApp Order', desc: 'Fast ordering via WhatsApp. Real humans reply fast.' },
              { title: 'Competitive Price', desc: 'Best market rates. Price shown upfront.' },
            ].map((item) => (
              <div key={item.title} className="pixel-box" style={{ padding: '24px' }}>
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

        {/* ──────────── USED LAPTOPS ──────────── */}
        <HomeProductSection
          id="used-laptops"
          title="Used Laptops"
          products={usedLaptops}
          viewAllLink="/category/laptops"
          columns={5}
        />

        {/* ──────────── PC CASES ──────────── */}
        <HomeProductSection
          id="pc-cases"
          title="PC Cases"
          products={pcCases}
          viewAllLink="/category/pc-cases"
          columns={5}
        />

        {/* ──────────── GRAPHICS CARDS ──────────── */}
        <HomeProductSection
          id="graphics-cards"
          title="Graphics Cards"
          products={gpus}
          viewAllLink="/category/gpus"
          columns={5}
        />

        {/* ──────────── MOTHERBOARDS ──────────── */}
        <HomeProductSection
          id="motherboards"
          title="Motherboards"
          products={motherboards}
          viewAllLink="/category/motherboards"
          columns={5}
        />

        {/* ──────────── PROCESSORS ──────────── */}
        <HomeProductSection
          id="processors"
          title="Processors"
          products={cpus}
          viewAllLink="/category/cpus"
          columns={5}
        />

        {/* ──────────── PC COOLING ──────────── */}
        <HomeProductSection
          id="pc-cooling"
          title="PC Cooling"
          products={cooling}
          viewAllLink="/category/pc-cooling-systems"
          columns={5}
        />

        {/* ──────────── PSU ──────────── */}
        <HomeProductSection
          id="psu"
          title="Power Supplies"
          products={psu}
          viewAllLink="/category/power-supplies"
          columns={5}
        />

        {/* ──────────── STORAGE ──────────── */}
        <HomeProductSection
          id="storage"
          title="Storage"
          products={storage}
          viewAllLink="/category/storage"
          columns={5}
        />

        {/* ──────────── RAM ──────────── */}
        <HomeProductSection
          id="ram"
          title="PC RAM"
          products={ram}
          viewAllLink="/category/ram"
          columns={5}
        />

        {/* ──────────── GAMING KEYBOARDS ──────────── */}
        <HomeProductSection
          id="keyboards"
          title="Gaming Keyboards"
          products={keyboards}
          viewAllLink="/category/gaming-keyboards"
          columns={5}
        />

        {/* ──────────── GAMING MICE ──────────── */}
        <HomeProductSection
          id="mice"
          title="Gaming Mice"
          products={mice}
          viewAllLink="/category/gaming-mouse"
          columns={5}
        />

      </div>
    </div>
  );
}