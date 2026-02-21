'use client';

import { useState } from 'react';
import Image from 'next/image';

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

    if (!images || images.length === 0) {
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

    const activeImage = images[activeIndex] || images[0];
    const isSingleImage = images.length === 1;

    return (
        <div className="product-gallery-container bg-white">
            {/* Desktop View (Hidden on mobile) */}
            <div className="pg-desktop hidden md:flex flex-col">
                <div style={{
                    borderBottom: isSingleImage ? '2px solid #000' : 'none',
                    background: '#fff',
                    position: 'relative',
                    minHeight: '400px',
                    width: '100%',
                    aspectRatio: '1',
                }}>
                    <Image
                        src={activeImage.src}
                        alt={activeImage.alt || productName}
                        fill
                        className="object-contain"
                        priority
                        style={{ padding: '24px', transition: 'opacity 0.2s ease' }}
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>

                {!isSingleImage && (
                    <div style={{
                        display: 'flex',
                        gap: '8px',
                        overflowX: 'auto',
                        padding: '16px',
                        borderBottom: '2px solid #000',
                        scrollbarWidth: 'thin',
                        background: '#fff',
                    }}>
                        {images.map((img, idx) => (
                            <button
                                key={img.id || idx}
                                onClick={() => setActiveIndex(idx)}
                                style={{
                                    position: 'relative',
                                    width: '64px',
                                    height: '64px',
                                    flexShrink: 0,
                                    border: activeIndex === idx ? '2px solid #000' : '2px solid #e0e0e0',
                                    background: '#fff',
                                    cursor: 'pointer',
                                    padding: '4px',
                                    transition: 'all 0.1s ease',
                                    opacity: activeIndex === idx ? 1 : 0.6,
                                }}
                                onMouseEnter={(e) => {
                                    if (activeIndex !== idx) e.currentTarget.style.opacity = '1';
                                }}
                                onMouseLeave={(e) => {
                                    if (activeIndex !== idx) e.currentTarget.style.opacity = '0.6';
                                }}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt || `${productName} thumbnail ${idx + 1}`}
                                    fill
                                    className="object-contain"
                                    sizes="64px"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Mobile View (Slider, Hidden on desktop) */}
            <div className="pg-mobile block md:hidden">
                <div style={{
                    display: 'flex',
                    overflowX: 'auto',
                    scrollSnapType: 'x mandatory',
                    scrollBehavior: 'smooth',
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'none', // hide scrollbar Firefox
                    msOverflowStyle: 'none', // hide scrollbar IE 10+
                    borderBottom: '2px solid #000',
                    background: '#fff',
                    padding: '24px 0',
                    gap: isSingleImage ? '0' : '16px',
                }}
                    className="hide-scroll"
                >
                    {images.map((img, idx) => (
                        <div
                            key={img.id || idx}
                            style={{
                                flexShrink: 0,
                                width: isSingleImage ? '100%' : '85%',
                                scrollSnapAlign: 'center',
                                position: 'relative',
                                aspectRatio: '1',
                                background: '#fff',
                                marginLeft: idx === 0 && !isSingleImage ? '7.5%' : '0',
                                marginRight: idx === images.length - 1 && !isSingleImage ? '7.5%' : '0',
                            }}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt || `${productName} image ${idx + 1}`}
                                fill
                                className="object-contain"
                                priority={idx === 0}
                                sizes="(max-width: 768px) 85vw, 100vw"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .hide-scroll::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}
