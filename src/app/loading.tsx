/**
 * Homepage loading skeleton — matches the real homepage structure.
 */
export default function HomeLoading() {
    return (
        <div style={{ minHeight: '100vh', background: '#fff' }}>

            {/* Hero Skeleton */}
            <section className="scanline-bg" style={{
                background: '#fff',
                borderBottom: '3px solid #000',
                padding: '64px 16px 56px',
                textAlign: 'center',
            }}>
                <div className="container-retro" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="skeleton-block" style={{ width: '180px', height: '26px', marginBottom: '24px' }} />
                    <div className="skeleton-block" style={{ width: '280px', height: '36px', marginBottom: '16px' }} />
                    <div className="skeleton-block" style={{ width: '160px', height: '16px', marginBottom: '36px' }} />
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <div className="skeleton-block" style={{ width: '140px', height: '42px' }} />
                        <div className="skeleton-block" style={{ width: '160px', height: '42px' }} />
                    </div>
                </div>
            </section>

            <div className="container-retro" style={{ paddingTop: '48px', paddingBottom: '64px' }}>

                {/* Categories Skeleton */}
                <section style={{ marginBottom: '64px' }}>
                    <div style={{
                        display: 'grid',
                        gap: '12px',
                        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                    }} className="skel-cat-grid">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} style={{
                                border: '2px solid #eee',
                                padding: '20px 16px',
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '10px',
                            }}>
                                <div className="skeleton-block" style={{ width: '28px', height: '28px' }} />
                                <div className="skeleton-block" style={{ width: '80px', height: '12px' }} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Latest Arrivals Skeleton */}
                <section style={{ marginBottom: '64px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
                        <div className="skeleton-block" style={{ width: '180px', height: '18px' }} />
                        <div className="skeleton-block" style={{ width: '80px', height: '12px' }} />
                    </div>
                    <div style={{
                        display: 'grid',
                        gap: '8px',
                        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                    }} className="skel-prod-grid">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} style={{ border: '2px solid #eee', overflow: 'hidden' }}>
                                <div className="skeleton-block" style={{ aspectRatio: '1', width: '100%' }} />
                                <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <div className="skeleton-block" style={{ width: '100%', height: '12px' }} />
                                    <div className="skeleton-block" style={{ width: '60%', height: '12px' }} />
                                    <div className="skeleton-block" style={{ width: '80px', height: '14px' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Loading indicator text */}
            <div style={{
                position: 'fixed',
                bottom: '24px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 50,
            }}>
                <div style={{
                    background: '#000',
                    color: '#fff',
                    fontFamily: 'var(--font-pixel), monospace',
                    fontSize: '9px',
                    padding: '6px 16px',
                    letterSpacing: '0.1em',
                    border: '2px solid #000',
                    boxShadow: '2px 2px 0px rgba(0,0,0,0.3)',
                }}>
                    <span className="cursor-blink">LOADING</span>
                </div>
            </div>

            <style>{`
        .skel-cat-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .skel-prod-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        @media (min-width: 480px) { .skel-cat-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
        @media (min-width: 768px) {
          .skel-cat-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
          .skel-prod-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }
        @media (min-width: 1024px) {
          .skel-prod-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        }
      `}</style>
        </div>
    );
}
