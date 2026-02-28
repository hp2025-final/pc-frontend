'use client';

import { useState, useRef, useCallback, useEffect } from 'react';


interface ProductImage {
    id: number;
    src: string;
    alt?: string;
}

interface ProductGalleryProps {
    images: ProductImage[];
    productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const isScrolling = useRef(false);

    const safeImages = images && images.length > 0 ? images : [];
    const isSingleImage = safeImages.length === 1;
    const isEmpty = safeImages.length === 0;

    // Handle scroll to detect active image
    const handleScroll = useCallback(() => {
        if (!scrollRef.current || isScrolling.current) return;
        const container = scrollRef.current;
        const scrollLeft = container.scrollLeft;
        const containerWidth = container.clientWidth;
        const slideWidth = containerWidth * 0.88;
        const gap = 12;
        const idx = Math.round(scrollLeft / (slideWidth + gap));
        setActiveIndex(Math.min(idx, safeImages.length - 1));
    }, [safeImages.length]);

    // Scroll to a specific index
    const scrollToIndex = useCallback((idx: number) => {
        if (!scrollRef.current) return;
        const container = scrollRef.current;
        const containerWidth = container.clientWidth;
        const slideWidth = containerWidth * 0.88;
        const gap = 12;
        isScrolling.current = true;
        container.scrollTo({
            left: idx * (slideWidth + gap),
            behavior: 'smooth',
        });
        setActiveIndex(idx);
        setTimeout(() => { isScrolling.current = false; }, 400);
    }, []);

    // Attach scroll listener
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;
        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => container.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    if (isEmpty) {
        return (
            <div style={{
                width: '100%', height: '100%', minHeight: '300px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#fff',
            }}>
                <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', color: '#ccc' }}>
                    NO IMAGE
                </span>
            </div>
        );
    }

    return (
        <div className="product-gallery-container bg-white">
            {/* Horizontal Peek Slider */}
            <div
                ref={scrollRef}
                style={{
                    display: 'flex',
                    overflowX: isSingleImage ? 'hidden' : 'auto',
                    scrollSnapType: 'x mandatory',
                    scrollBehavior: 'smooth',
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    borderBottom: '2px solid #000',
                    background: '#fff',
                    padding: '16px 0',
                    gap: isSingleImage ? '0' : '12px',
                    cursor: isSingleImage ? 'default' : 'grab',
                }}
                className="hide-scroll"
            >
                {safeImages.map((img, idx) => (
                    <div
                        key={img.id || idx}
                        style={{
                            flexShrink: 0,
                            width: isSingleImage ? '100%' : '88%',
                            scrollSnapAlign: 'start',
                            position: 'relative',
                            aspectRatio: '1',
                            background: '#fff',
                            marginLeft: idx === 0 && !isSingleImage ? '6%' : '0',
                            marginRight: idx === safeImages.length - 1 && !isSingleImage ? '6%' : '0',
                        }}
                    >
                        <img
                            src={img.src}
                            alt={img.alt || `${productName} image ${idx + 1}`}
                            loading={idx === 0 ? 'eager' : 'lazy'}
                            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', padding: '16px' }}
                        />
                    </div>
                ))}
            </div>

            {/* Dot Indicators */}
            {!isSingleImage && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px 0',
                    borderBottom: '2px solid #000',
                    background: '#fff',
                }}>
                    {safeImages.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => scrollToIndex(idx)}
                            aria-label={`Go to image ${idx + 1}`}
                            style={{
                                width: activeIndex === idx ? '20px' : '8px',
                                height: '8px',
                                background: activeIndex === idx ? '#000' : '#ccc',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                padding: 0,
                            }}
                        />
                    ))}
                </div>
            )}

            <style>{`
                .hide-scroll::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}
