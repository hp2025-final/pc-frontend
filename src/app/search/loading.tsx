/**
 * Search page loading skeleton
 */
export default function SearchLoading() {
    return (
        <div style={{ minHeight: '100vh', background: '#fff' }}>

            {/* Search Header Skeleton */}
            <div style={{
                borderBottom: '2px solid #000',
                padding: '32px 16px',
                background: '#000',
            }}>
                <div className="container-retro">
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                        <div className="skeleton-block skeleton-dark" style={{ width: '50px', height: '12px' }} />
                        <div className="skeleton-block skeleton-dark" style={{ width: '80px', height: '12px' }} />
                    </div>
                    <div className="skeleton-block skeleton-dark" style={{ width: '220px', height: '20px', marginBottom: '8px' }} />
                    <div className="skeleton-block skeleton-dark" style={{ width: '120px', height: '12px' }} />
                </div>
            </div>

            {/* Search Form + Results Skeleton */}
            <div className="container-retro" style={{ paddingTop: '32px', paddingBottom: '64px' }}>

                {/* Search input skeleton */}
                <div style={{ marginBottom: '32px', border: '2px solid #eee', height: '48px' }} className="skeleton-block" />

                {/* Results skeleton */}
                <div style={{
                    display: 'grid',
                    gap: '8px',
                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                }} className="skel-search-grid">
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
            </div>

            {/* Loading indicator */}
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
                    <span className="cursor-blink">SEARCHING</span>
                </div>
            </div>

            <style>{`
        .skel-search-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        @media (min-width: 600px) { .skel-search-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
        @media (min-width: 900px) { .skel-search-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
        @media (min-width: 1200px) { .skel-search-grid { grid-template-columns: repeat(5, minmax(0, 1fr)); } }
      `}</style>
        </div>
    );
}
