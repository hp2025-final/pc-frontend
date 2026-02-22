'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * PixelProgressBar — Retro chunky pixel animated shape loader.
 * Shows squarely in the screen center during Next.js route transitions.
 */
export default function PixelProgressBar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [visible, setVisible] = useState(false);
    const prevUrl = useRef('');

    const startProgress = useCallback(() => {
        setVisible(true);
    }, []);

    const completeProgress = useCallback(() => {
        setVisible(false);
    }, []);

    useEffect(() => {
        const currentUrl = pathname + searchParams.toString();
        if (prevUrl.current && prevUrl.current !== currentUrl) {
            completeProgress();
        }
        prevUrl.current = currentUrl;
    }, [pathname, searchParams, completeProgress]);

    // Intercept link clicks to start the progress animation
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest('a');
            if (!target) return;
            const href = target.getAttribute('href');
            if (!href) return;
            // Only internal links
            if (href.startsWith('/') || href.startsWith(window.location.origin)) {
                // Don't trigger for same page anchors
                if (href.startsWith('#')) return;
                const currentUrl = pathname + (searchParams.toString() ? '?' + searchParams.toString() : '');
                if (href !== currentUrl) {
                    startProgress();
                }
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [pathname, searchParams, startProgress]);

    if (!visible) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9999,
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(2px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '24px',
            }}>
                <div style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-end',
                    height: '40px',
                }}>
                    {/* Square */}
                    <div className="retro-shape square" />
                    {/* Triangle */}
                    <div className="retro-shape triangle" />
                    {/* Circle */}
                    <div className="retro-shape circle" />
                </div>

                <div style={{
                    background: '#000',
                    color: '#fff',
                    fontFamily: 'var(--font-pixel), monospace',
                    fontSize: '10px',
                    padding: '8px 16px',
                    letterSpacing: '0.1em',
                    border: '2px solid #000',
                    boxShadow: '4px 4px 0px rgba(0,0,0,0.2)',
                }}>
                    <span className="cursor-blink">LOADING</span>
                </div>
            </div>

            <style>{`
                .retro-shape {
                    width: 24px;
                    height: 24px;
                    background: #000;
                    box-shadow: 2px 2px 0px rgba(0,0,0,0.3);
                    animation: bounce 0.6s infinite alternate cubic-bezier(0.5, 0.05, 1, 0.5);
                }
                
                /* The triangle needs special border CSS and no background */
                .retro-shape.triangle {
                    background: transparent;
                    width: 0;
                    height: 0;
                    border-left: 12px solid transparent;
                    border-right: 12px solid transparent;
                    border-bottom: 24px solid #000;
                    /* Drop shadow on triangle using filter */
                    filter: drop-shadow(2px 2px 0px rgba(0,0,0,0.3));
                    box-shadow: none;
                    animation-delay: 0.2s;
                }
                
                .retro-shape.circle {
                    border-radius: 50%;
                    animation-delay: 0.4s;
                }

                @keyframes bounce {
                    from { transform: translateY(0); }
                    to { transform: translateY(-20px); }
                }
            `}</style>
        </div>
    );
}
