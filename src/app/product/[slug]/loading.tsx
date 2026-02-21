/**
 * Product page loading skeleton
 */
export default function ProductLoading() {
    return (
        <div style={{ minHeight: '100vh', background: '#fff' }}>

            {/* Breadcrumb Skeleton */}
            <div className="container-retro" style={{ paddingTop: '24px' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                    <div className="skeleton-block" style={{ width: '50px', height: '12px' }} />
                    <div className="skeleton-block" style={{ width: '80px', height: '12px' }} />
                    <div className="skeleton-block" style={{ width: '140px', height: '12px' }} />
                </div>
            </div>

            {/* Product Layout Skeleton */}
            <div className="container-retro" style={{ paddingBottom: '64px' }}>
                <div style={{
                    display: 'grid',
                    gap: '32px',
                    gridTemplateColumns: '1fr',
                }} className="skel-product-layout">

                    {/* Image Gallery Skeleton */}
                    <div>
                        <div className="skeleton-block" style={{
                            aspectRatio: '1',
                            width: '100%',
                            maxWidth: '500px',
                            border: '2px solid #eee',
                        }} />
                        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="skeleton-block" style={{
                                    width: '60px', height: '60px', border: '2px solid #eee',
                                }} />
                            ))}
                        </div>
                    </div>

                    {/* Product Info Skeleton */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div className="skeleton-block" style={{ width: '80px', height: '20px' }} />
                        <div className="skeleton-block" style={{ width: '100%', height: '24px' }} />
                        <div className="skeleton-block" style={{ width: '70%', height: '24px' }} />
                        <div className="skeleton-block" style={{ width: '120px', height: '18px' }} />
                        <div className="skeleton-block" style={{ width: '180px', height: '28px', marginTop: '8px' }} />
                        <div className="skeleton-block" style={{ width: '200px', height: '42px', marginTop: '8px' }} />

                        {/* Specs skeleton */}
                        <div style={{ marginTop: '24px' }}>
                            <div className="skeleton-block" style={{ width: '120px', height: '14px', marginBottom: '12px' }} />
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                    <div className="skeleton-block" style={{ width: '40%', height: '14px' }} />
                                    <div className="skeleton-block" style={{ width: '60%', height: '14px' }} />
                                </div>
                            ))}
                        </div>
                    </div>
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
                    <span className="cursor-blink">LOADING SPECS</span>
                </div>
            </div>

            <style>{`
        @media (min-width: 768px) {
          .skel-product-layout { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
        </div>
    );
}
