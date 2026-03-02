'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SearchResult {
    id: number;
    name: string;
    slug: string;
    price: string;
    regular_price: string;
    sale_price: string;
    stock_status: string;
    image: string | null;
    brand: string;
}

function formatSearchPrice(price: string): string {
    const num = parseFloat(price);
    if (isNaN(num) || num <= 0) return '';
    return `Rs. ${num.toLocaleString('en-PK')}`;
}

export default function LiveSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [mobileOpen, setMobileOpen] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const mobileInputRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const router = useRouter();

    // Debounced search
    const doSearch = useCallback(async (searchQuery: string) => {
        if (searchQuery.length < 2) {
            setResults([]);
            setIsOpen(false);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
            const data: SearchResult[] = await res.json();
            setResults(data);
            setIsOpen(true);
            setActiveIndex(-1);
        } catch {
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleInputChange = (value: string) => {
        setQuery(value);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (value.length < 2) {
            setResults([]);
            setIsOpen(false);
            return;
        }
        setIsLoading(true);
        debounceRef.current = setTimeout(() => doSearch(value), 300);
    };

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) {
            if (e.key === 'Enter' && query.length >= 2) {
                router.push(`/search?q=${encodeURIComponent(query)}`);
                closeAll();
            }
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setActiveIndex((prev) => (prev < results.length) ? prev + 1 : 0);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length));
                break;
            case 'Enter':
                e.preventDefault();
                if (activeIndex >= 0 && activeIndex < results.length) {
                    router.push(`/product/${results[activeIndex].slug}`);
                    closeAll();
                } else {
                    // "View all" or just go to search page
                    router.push(`/search?q=${encodeURIComponent(query)}`);
                    closeAll();
                }
                break;
            case 'Escape':
                closeAll();
                break;
        }
    };

    const closeAll = () => {
        setIsOpen(false);
        setMobileOpen(false);
        setQuery('');
        setResults([]);
        setActiveIndex(-1);
    };

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Focus mobile input when opened
    useEffect(() => {
        if (mobileOpen && mobileInputRef.current) {
            mobileInputRef.current.focus();
        }
    }, [mobileOpen]);

    // Clean up debounce on unmount
    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, []);

    const renderDropdown = () => {
        if (!isOpen && !isLoading) return null;

        return (
            <div className="live-search-dropdown">
                {isLoading && results.length === 0 ? (
                    <div className="live-search-loading">
                        <span className="live-search-loading-dot">■</span> SEARCHING...
                    </div>
                ) : results.length > 0 ? (
                    <>
                        {results.map((result, index) => (
                            <Link
                                key={result.id}
                                href={`/product/${result.slug}`}
                                className={`live-search-result ${index === activeIndex ? 'active' : ''}`}
                                onClick={closeAll}
                                onMouseEnter={() => setActiveIndex(index)}
                            >
                                <div className="live-search-result-img">
                                    {result.image ? (
                                        <img src={result.image} alt={result.name} loading="lazy" />
                                    ) : (
                                        <span className="live-search-no-img">⬚</span>
                                    )}
                                </div>
                                <div className="live-search-result-info">
                                    <span className="live-search-result-name">{result.name}</span>
                                    <span className="live-search-result-meta">
                                        {result.brand && <span className="live-search-result-brand">{result.brand}</span>}
                                        {formatSearchPrice(result.price) && (
                                            <span className="live-search-result-price">{formatSearchPrice(result.price)}</span>
                                        )}
                                    </span>
                                </div>
                                <span className={`live-search-result-stock ${result.stock_status === 'instock' ? '' : 'oos'}`}>
                                    {result.stock_status === 'instock' ? '●' : '○'}
                                </span>
                            </Link>
                        ))}
                        <Link
                            href={`/search?q=${encodeURIComponent(query)}`}
                            className={`live-search-view-all ${activeIndex === results.length ? 'active' : ''}`}
                            onClick={closeAll}
                            onMouseEnter={() => setActiveIndex(results.length)}
                        >
                            VIEW ALL RESULTS →
                        </Link>
                    </>
                ) : (
                    <div className="live-search-empty">NO RESULTS FOUND</div>
                )}
            </div>
        );
    };

    return (
        <>
            {/* Desktop Search */}
            <div className="live-search-desktop" ref={containerRef}>
                <div className="live-search-input-wrap">
                    <span className="live-search-icon">⌕</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => { if (results.length > 0) setIsOpen(true); }}
                        placeholder="SEARCH..."
                        className="live-search-input"
                        aria-label="Search products"
                        autoComplete="off"
                    />
                    {query && (
                        <button
                            className="live-search-clear"
                            onClick={() => { setQuery(''); setResults([]); setIsOpen(false); inputRef.current?.focus(); }}
                            aria-label="Clear search"
                        >
                            ✕
                        </button>
                    )}
                </div>
                {renderDropdown()}
            </div>

            {/* Mobile Search Toggle */}
            <button
                className="live-search-mobile-btn"
                onClick={() => setMobileOpen(true)}
                aria-label="Open search"
            >
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>⌕</span>
            </button>

            {/* Mobile Search Overlay */}
            {mobileOpen && (
                <div className="live-search-mobile-overlay">
                    <div className="live-search-mobile-header">
                        <div className="live-search-input-wrap" style={{ flex: 1 }}>
                            <span className="live-search-icon">⌕</span>
                            <input
                                ref={mobileInputRef}
                                type="text"
                                value={query}
                                onChange={(e) => handleInputChange(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="SEARCH PRODUCTS..."
                                className="live-search-input"
                                aria-label="Search products"
                                autoComplete="off"
                            />
                            {query && (
                                <button
                                    className="live-search-clear"
                                    onClick={() => { setQuery(''); setResults([]); setIsOpen(false); mobileInputRef.current?.focus(); }}
                                    aria-label="Clear search"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                        <button className="live-search-mobile-close" onClick={closeAll}>
                            ✕
                        </button>
                    </div>
                    <div className="live-search-mobile-results">
                        {isLoading && results.length === 0 ? (
                            <div className="live-search-loading">
                                <span className="live-search-loading-dot">■</span> SEARCHING...
                            </div>
                        ) : results.length > 0 ? (
                            <>
                                {results.map((result, index) => (
                                    <Link
                                        key={result.id}
                                        href={`/product/${result.slug}`}
                                        className={`live-search-result ${index === activeIndex ? 'active' : ''}`}
                                        onClick={closeAll}
                                    >
                                        <div className="live-search-result-img">
                                            {result.image ? (
                                                <img src={result.image} alt={result.name} loading="lazy" />
                                            ) : (
                                                <span className="live-search-no-img">⬚</span>
                                            )}
                                        </div>
                                        <div className="live-search-result-info">
                                            <span className="live-search-result-name">{result.name}</span>
                                            <span className="live-search-result-meta">
                                                {result.brand && <span className="live-search-result-brand">{result.brand}</span>}
                                                {formatSearchPrice(result.price) && (
                                                    <span className="live-search-result-price">{formatSearchPrice(result.price)}</span>
                                                )}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                                <Link
                                    href={`/search?q=${encodeURIComponent(query)}`}
                                    className="live-search-view-all"
                                    onClick={closeAll}
                                >
                                    VIEW ALL RESULTS →
                                </Link>
                            </>
                        ) : query.length >= 2 ? (
                            <div className="live-search-empty">NO RESULTS FOUND</div>
                        ) : (
                            <div className="live-search-empty" style={{ color: '#aaa' }}>
                                TYPE TO SEARCH...
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
