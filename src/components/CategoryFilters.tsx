'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useCallback } from 'react';

interface CategoryFiltersProps {
    brands: string[];
    currentSort: string;
    currentBrand: string;
    currentMinPrice: string;
    currentMaxPrice: string;
}

const SORT_OPTIONS = [
    { label: 'LATEST', value: 'date_desc' },
    { label: 'OLDEST', value: 'date_asc' },
    { label: 'PRICE: HIGH → LOW', value: 'price_desc' },
    { label: 'PRICE: LOW → HIGH', value: 'price_asc' },
];

const PRICE_RANGES = [
    { label: '₨ 1,000 – ₨ 50,000', min: '1000', max: '50000' },
    { label: '₨ 50,000 – ₨ 100,000', min: '50000', max: '100000' },
    { label: '₨ 100,000 – ₨ 150,000', min: '100000', max: '150000' },
    { label: '₨ 150,000 – ₨ 200,000', min: '150000', max: '200000' },
    { label: '₨ 200,000 – ₨ 250,000', min: '200000', max: '250000' },
    { label: '₨ 250,000+', min: '250000', max: '' },
];

export default function CategoryFilters({
    brands,
    currentSort,
    currentBrand,
    currentMinPrice,
    currentMaxPrice,
}: CategoryFiltersProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

    const updateParams = useCallback(
        (updates: Record<string, string>) => {
            const params = new URLSearchParams(searchParams.toString());
            // Reset to page 1 when filters change
            params.delete('page');
            Object.entries(updates).forEach(([key, value]) => {
                if (value) {
                    params.set(key, value);
                } else {
                    params.delete(key);
                }
            });
            router.push(`${pathname}?${params.toString()}`);
            setOpenDropdown(null);
            setMobileDrawerOpen(false);
        },
        [router, pathname, searchParams]
    );

    const clearAllFilters = useCallback(() => {
        router.push(pathname);
        setOpenDropdown(null);
        setMobileDrawerOpen(false);
    }, [router, pathname]);

    const currentSortLabel = SORT_OPTIONS.find((o) => o.value === currentSort)?.label || 'LATEST';
    const currentPriceLabel = PRICE_RANGES.find(
        (r) => r.min === currentMinPrice && r.max === currentMaxPrice
    )?.label || '';

    const hasActiveFilters = currentBrand || currentMinPrice || currentMaxPrice || (currentSort && currentSort !== 'date_desc');

    // Desktop filter bar content
    const renderFilterContent = () => (
        <>
            {/* Sort Dropdown */}
            <div className="cf-dropdown-wrap">
                <button
                    className={`cf-trigger ${currentSort && currentSort !== 'date_desc' ? 'cf-active' : ''}`}
                    onClick={() => setOpenDropdown(openDropdown === 'sort' ? null : 'sort')}
                >
                    SORT: {currentSortLabel}
                    <span className="cf-arrow">{openDropdown === 'sort' ? '▲' : '▼'}</span>
                </button>
                {openDropdown === 'sort' && (
                    <div className="cf-dropdown">
                        {SORT_OPTIONS.map((opt) => (
                            <button
                                key={opt.value}
                                className={`cf-dropdown-item ${currentSort === opt.value || (!currentSort && opt.value === 'date_desc') ? 'cf-selected' : ''}`}
                                onClick={() => updateParams({ sort: opt.value === 'date_desc' ? '' : opt.value })}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Brand Filter */}
            {brands.length > 0 && (
                <div className="cf-dropdown-wrap">
                    <button
                        className={`cf-trigger ${currentBrand ? 'cf-active' : ''}`}
                        onClick={() => setOpenDropdown(openDropdown === 'brand' ? null : 'brand')}
                    >
                        {currentBrand ? `BRAND: ${currentBrand.toUpperCase()}` : 'BRAND'}
                        <span className="cf-arrow">{openDropdown === 'brand' ? '▲' : '▼'}</span>
                    </button>
                    {openDropdown === 'brand' && (
                        <div className="cf-dropdown">
                            <button
                                className={`cf-dropdown-item ${!currentBrand ? 'cf-selected' : ''}`}
                                onClick={() => updateParams({ brand: '' })}
                            >
                                ALL BRANDS
                            </button>
                            {brands.map((brand) => (
                                <button
                                    key={brand}
                                    className={`cf-dropdown-item ${currentBrand === brand ? 'cf-selected' : ''}`}
                                    onClick={() => updateParams({ brand: currentBrand === brand ? '' : brand })}
                                >
                                    {brand.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Price Filter */}
            <div className="cf-dropdown-wrap">
                <button
                    className={`cf-trigger ${currentPriceLabel ? 'cf-active' : ''}`}
                    onClick={() => setOpenDropdown(openDropdown === 'price' ? null : 'price')}
                >
                    {currentPriceLabel ? `PRICE: ${currentPriceLabel}` : 'PRICE'}
                    <span className="cf-arrow">{openDropdown === 'price' ? '▲' : '▼'}</span>
                </button>
                {openDropdown === 'price' && (
                    <div className="cf-dropdown">
                        <button
                            className={`cf-dropdown-item ${!currentMinPrice && !currentMaxPrice ? 'cf-selected' : ''}`}
                            onClick={() => updateParams({ min_price: '', max_price: '' })}
                        >
                            ALL PRICES
                        </button>
                        {PRICE_RANGES.map((range) => (
                            <button
                                key={range.label}
                                className={`cf-dropdown-item ${currentMinPrice === range.min && currentMaxPrice === range.max ? 'cf-selected' : ''}`}
                                onClick={() =>
                                    updateParams({
                                        min_price: currentMinPrice === range.min && currentMaxPrice === range.max ? '' : range.min,
                                        max_price: currentMinPrice === range.min && currentMaxPrice === range.max ? '' : range.max,
                                    })
                                }
                            >
                                {range.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Clear All */}
            {hasActiveFilters && (
                <button className="cf-clear" onClick={clearAllFilters}>
                    ✕ CLEAR
                </button>
            )}
        </>
    );

    return (
        <>
            {/* Desktop Filter Bar */}
            <div className="cf-bar cf-bar-desktop">
                {renderFilterContent()}
            </div>

            {/* Mobile Filter Bar */}
            <div className="cf-bar cf-bar-mobile">
                <button
                    className="cf-mobile-trigger"
                    onClick={() => {
                        setMobileDrawerOpen(true);
                        setOpenDropdown(null);
                    }}
                >
                    ☰ SORT & FILTER
                    {hasActiveFilters && <span className="cf-active-dot">●</span>}
                </button>
            </div>

            {/* Mobile Drawer */}
            {mobileDrawerOpen && (
                <>
                    <div className="cf-overlay" onClick={() => setMobileDrawerOpen(false)} />
                    <div className="cf-drawer">
                        <div className="cf-drawer-header">
                            <span className="cf-drawer-title">SORT & FILTER</span>
                            <button className="cf-drawer-close" onClick={() => setMobileDrawerOpen(false)}>
                                ✕
                            </button>
                        </div>
                        <div className="cf-drawer-body">
                            {/* Sort Section */}
                            <div className="cf-drawer-section">
                                <div className="cf-drawer-section-title">SORT BY</div>
                                <div className="cf-drawer-options">
                                    {SORT_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.value}
                                            className={`cf-drawer-option ${currentSort === opt.value || (!currentSort && opt.value === 'date_desc') ? 'cf-selected' : ''}`}
                                            onClick={() => updateParams({ sort: opt.value === 'date_desc' ? '' : opt.value })}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Brand Section */}
                            {brands.length > 0 && (
                                <div className="cf-drawer-section">
                                    <div className="cf-drawer-section-title">BRAND</div>
                                    <div className="cf-drawer-options">
                                        <button
                                            className={`cf-drawer-option ${!currentBrand ? 'cf-selected' : ''}`}
                                            onClick={() => updateParams({ brand: '' })}
                                        >
                                            ALL BRANDS
                                        </button>
                                        {brands.map((brand) => (
                                            <button
                                                key={brand}
                                                className={`cf-drawer-option ${currentBrand === brand ? 'cf-selected' : ''}`}
                                                onClick={() => updateParams({ brand: currentBrand === brand ? '' : brand })}
                                            >
                                                {brand.toUpperCase()}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Price Section */}
                            <div className="cf-drawer-section">
                                <div className="cf-drawer-section-title">PRICE RANGE</div>
                                <div className="cf-drawer-options">
                                    <button
                                        className={`cf-drawer-option ${!currentMinPrice && !currentMaxPrice ? 'cf-selected' : ''}`}
                                        onClick={() => updateParams({ min_price: '', max_price: '' })}
                                    >
                                        ALL PRICES
                                    </button>
                                    {PRICE_RANGES.map((range) => (
                                        <button
                                            key={range.label}
                                            className={`cf-drawer-option ${currentMinPrice === range.min && currentMaxPrice === range.max ? 'cf-selected' : ''}`}
                                            onClick={() =>
                                                updateParams({
                                                    min_price: currentMinPrice === range.min && currentMaxPrice === range.max ? '' : range.min,
                                                    max_price: currentMinPrice === range.min && currentMaxPrice === range.max ? '' : range.max,
                                                })
                                            }
                                        >
                                            {range.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Clear All */}
                            {hasActiveFilters && (
                                <div className="cf-drawer-section" style={{ borderBottom: 'none' }}>
                                    <button className="cf-clear" onClick={clearAllFilters} style={{ width: '100%' }}>
                                        ✕ CLEAR ALL FILTERS
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}

            <style>{`
        /* ---- Category Filters ---- */
        .cf-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .cf-bar-desktop { display: flex; }
        .cf-bar-mobile { display: none; }

        .cf-dropdown-wrap {
          position: relative;
        }

        .cf-trigger {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border: 2px solid #000;
          background: #fff;
          color: #000;
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: all 0.1s;
          white-space: nowrap;
        }

        .cf-trigger:hover {
          background: #000;
          color: #fff;
        }

        .cf-trigger.cf-active {
          background: #000;
          color: #fff;
        }

        .cf-arrow {
          font-size: 7px;
          margin-left: 2px;
        }

        .cf-dropdown {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          min-width: 200px;
          background: #fff;
          border: 2px solid #000;
          box-shadow: 4px 4px 0px #000;
          z-index: 50;
          max-height: 300px;
          overflow-y: auto;
        }

        .cf-dropdown-item {
          display: block;
          width: 100%;
          padding: 10px 14px;
          border: none;
          background: transparent;
          color: #000;
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          cursor: pointer;
          text-align: left;
          transition: all 0.05s;
          border-bottom: 1px solid #f0f0f0;
        }

        .cf-dropdown-item:last-child {
          border-bottom: none;
        }

        .cf-dropdown-item:hover {
          background: #000;
          color: #fff;
        }

        .cf-dropdown-item.cf-selected {
          background: #000;
          color: #fff;
        }

        .cf-clear {
          padding: 8px 14px;
          border: 2px solid #000;
          background: transparent;
          color: #000;
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: all 0.1s;
        }

        .cf-clear:hover {
          background: #000;
          color: #fff;
        }

        /* Mobile */
        .cf-mobile-trigger {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border: 2px solid #000;
          background: #fff;
          color: #000;
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          cursor: pointer;
          width: 100%;
          justify-content: center;
          transition: all 0.1s;
        }

        .cf-mobile-trigger:hover {
          background: #000;
          color: #fff;
        }

        .cf-active-dot {
          font-size: 8px;
          color: #000;
        }

        .cf-mobile-trigger:hover .cf-active-dot {
          color: #fff;
        }

        .cf-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 200;
        }

        .cf-drawer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          max-height: 80vh;
          background: #fff;
          border-top: 2px solid #000;
          z-index: 201;
          display: flex;
          flex-direction: column;
          animation: drawerSlideUp 0.2s ease forwards;
        }

        @keyframes drawerSlideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }

        .cf-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          border-bottom: 2px solid #000;
        }

        .cf-drawer-title {
          font-family: var(--font-pixel), monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .cf-drawer-close {
          background: none;
          border: 2px solid #000;
          font-size: 14px;
          padding: 4px 10px;
          cursor: pointer;
          font-family: var(--font-mono), monospace;
          color: #000;
        }

        .cf-drawer-body {
          overflow-y: auto;
          flex: 1;
        }

        .cf-drawer-section {
          padding: 16px;
          border-bottom: 2px solid #f0f0f0;
        }

        .cf-drawer-section-title {
          font-family: var(--font-pixel), monospace;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #888;
          margin-bottom: 12px;
        }

        .cf-drawer-options {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .cf-drawer-option {
          padding: 8px 12px;
          border: 2px solid #000;
          background: #fff;
          color: #000;
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          cursor: pointer;
          transition: all 0.1s;
        }

        .cf-drawer-option:hover,
        .cf-drawer-option.cf-selected {
          background: #000;
          color: #fff;
        }

        @media (max-width: 768px) {
          .cf-bar-desktop { display: none !important; }
          .cf-bar-mobile { display: flex !important; }
        }
      `}</style>
        </>
    );
}
