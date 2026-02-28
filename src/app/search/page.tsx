import { Metadata } from 'next';
import Link from 'next/link';
import { woo } from '@/lib/woocommerce';
import { formatPriceRange, getEffectivePrice, getBrandName, getWarrantyPeriod } from '@/lib/utils';
import CategoryIcon from '@/components/CategoryIcon';

interface SearchPageProps {
    searchParams: Promise<{
        q?: string;
        page?: string;
        category?: string;
        brand?: string;
        min_price?: string;
        max_price?: string;
        orderby?: 'relevance' | 'date' | 'price' | 'popularity';
        order?: 'asc' | 'desc';
    }>;
}

export const metadata: Metadata = {
    title: 'Search — PC Wala Online',
    description: 'Search for gaming PCs, components, laptops and accessories.',
    robots: { index: false, follow: true },
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const sp = await searchParams;
    const query = sp.q || '';
    const page = parseInt(sp.page || '1');
    const perPage = 20;

    const products = await woo.getProducts({
        search: query,
        page,
        per_page: perPage,
        category: sp.category,
        brand: sp.brand,
        min_price: sp.min_price ? parseFloat(sp.min_price) : undefined,
        max_price: sp.max_price ? parseFloat(sp.max_price) : undefined,
        orderby: sp.orderby || 'date',
        order: sp.order || 'desc',
    });

    return (
        <div style={{ minHeight: '100vh', background: '#fff' }}>

            {/* Search Header */}
            <div style={{
                borderBottom: '2px solid #000',
                padding: '32px 16px',
                background: '#000',
                color: '#fff',
            }}>
                <div className="container-retro">
                    <nav className="breadcrumb" style={{ color: '#aaa', marginBottom: '16px' }}>
                        <Link href="/" style={{ color: '#aaa' }}>HOME</Link>
                        <span className="breadcrumb-sep">&gt;</span>
                        <span style={{ color: '#fff' }}>SEARCH</span>
                    </nav>
                    <h1 style={{
                        fontFamily: 'var(--font-pixel), monospace',
                        fontSize: 'clamp(11px, 2.5vw, 18px)',
                        color: '#fff',
                        marginBottom: '8px',
                    }}>
                        {query ? `RESULTS: "${query}"` : 'ALL PRODUCTS'}
                    </h1>
                    <p style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: '11px',
                        color: '#aaa',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                    }}>
                        {products.length} result{products.length !== 1 ? 's' : ''} found
                    </p>
                </div>
            </div>

            <div className="container-retro" style={{ paddingTop: '32px', paddingBottom: '64px' }}>

                {/* Search Form */}
                <form action="/search" method="GET" style={{ marginBottom: '32px' }}>
                    <div style={{ display: 'flex', gap: '0', border: '2px solid #000' }}>
                        <input
                            type="text"
                            name="q"
                            defaultValue={query}
                            placeholder="SEARCH PRODUCTS..."
                            className="pixel-input"
                            style={{ border: 'none', flex: 1 }}
                            aria-label="Search products"
                        />
                        <button
                            type="submit"
                            className="pixel-btn"
                            style={{
                                borderRadius: 0,
                                border: 'none',
                                borderLeft: '2px solid #000',
                                whiteSpace: 'nowrap',
                                padding: '12px 20px',
                            }}
                        >
                            ⌕ SEARCH
                        </button>
                    </div>
                </form>

                {/* Results */}
                {products.length > 0 ? (
                    <>
                        <div style={{
                            display: 'grid',
                            gap: '8px',
                            marginBottom: '32px',
                        }} className="search-products-grid">
                            {products.map((product) => {
                                const effectivePrice = getEffectivePrice(product);
                                const priceRange = formatPriceRange(effectivePrice);
                                const inStock = product.stock_status === 'instock';
                                const brand = getBrandName(product);
                                const warranty = getWarrantyPeriod(product);

                                return (
                                    <Link
                                        key={product.id}
                                        href={`/product/${product.slug}`}
                                        className="product-card"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        {/* Image */}
                                        <div className="product-card-image">
                                            <span className={`pixel-tag ${inStock ? '' : 'pixel-tag-gray'}`} style={{
                                                position: 'absolute',
                                                top: '8px',
                                                right: '8px',
                                                zIndex: 10,
                                                fontSize: '9px',
                                                padding: '4px 6px',
                                                boxShadow: 'none'
                                            }}>
                                                {inStock ? 'IN STOCK' : 'OUT OF STOCK'}
                                            </span>
                                            {product.images.length > 0 ? (
                                                <img
                                                    src={product.images[0].src}
                                                    alt={product.images[0].alt || product.name}
                                                    loading="lazy"
                                                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }}
                                                />
                                            ) : (
                                                <div style={{
                                                    width: '100%', height: '100%',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    background: '#f0f0f0',
                                                }}>
                                                    <CategoryIcon slug={product.categories[0]?.slug || ''} size={40} color="#ccc" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="product-card-body">
                                            <h3 className="product-card-title">{product.name}</h3>

                                            {(brand || warranty) && (
                                                <span style={{
                                                    fontFamily: 'var(--font-mono), monospace',
                                                    fontSize: '10px',
                                                    color: '#888',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.04em',
                                                }}>
                                                    {[brand, warranty].filter(Boolean).join(' | ')}
                                                </span>
                                            )}

                                            <div className="price-range price-range-sm">{priceRange}</div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Pagination */}
                        {products.length === perPage && (
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                                {page > 1 && (
                                    <Link
                                        href={`/search?q=${encodeURIComponent(query)}&page=${page - 1}`}
                                        className="pixel-btn pixel-btn-outline"
                                    >
                                        ← PREV
                                    </Link>
                                )}
                                <Link
                                    href={`/search?q=${encodeURIComponent(query)}&page=${page + 1}`}
                                    className="pixel-btn"
                                >
                                    NEXT →
                                </Link>
                            </div>
                        )}

                        <style>{`
                .search-products-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
                @media (min-width: 600px)  { .search-products-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
                @media (min-width: 900px)  { .search-products-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
                @media (min-width: 1200px) { .search-products-grid { grid-template-columns: repeat(5, minmax(0, 1fr)); } }
            `}</style>
                    </>
                ) : (
                    <div style={{
                        border: '2px solid #000',
                        padding: '64px 24px',
                        textAlign: 'center',
                    }}>
                        <div style={{
                            fontFamily: 'var(--font-pixel), monospace',
                            fontSize: '32px',
                            marginBottom: '16px',
                        }}>
                            ?
                        </div>
                        <h2 style={{
                            fontFamily: 'var(--font-pixel), monospace',
                            fontSize: '12px',
                            marginBottom: '12px',
                            color: '#000',
                        }}>
                            NO RESULTS FOUND
                        </h2>
                        <p style={{
                            fontFamily: 'var(--font-mono), monospace',
                            fontSize: '12px',
                            color: '#888',
                            marginBottom: '24px',
                        }}>
                            {query
                                ? `We couldn't find anything for "${query}". Try a different search.`
                                : 'Enter a search term above to find products.'}
                        </p>
                        <Link href="/" className="pixel-btn">
                            ← BACK TO HOME
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
