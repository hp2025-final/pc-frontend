'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * PixelProgressBar — Retro chunky pixel progress bar at the top of the page.
 * Shows during Next.js route transitions.
 */
export default function PixelProgressBar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const prevUrl = useRef('');

    const startProgress = useCallback(() => {
        setVisible(true);
        setProgress(15);

        // Simulate chunky progress in pixel steps
        let current = 15;
        timerRef.current = setInterval(() => {
            current += Math.random() * 12 + 3;
            if (current > 85) current = 85;
            setProgress(current);
        }, 200);
    }, []);

    const completeProgress = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setProgress(100);
        setTimeout(() => {
            setVisible(false);
            setProgress(0);
        }, 300);
    }, []);

    useEffect(() => {
        const currentUrl = pathname + searchParams.toString();
        if (prevUrl.current && prevUrl.current !== currentUrl) {
            completeProgress();
        }
        prevUrl.current = currentUrl;
    }, [pathname, searchParams, completeProgress]);

    // Intercept link clicks to start the progress bar
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

    if (!visible && progress === 0) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                zIndex: 9999,
                background: 'transparent',
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: '#000',
                    transition: progress === 100 ? 'width 0.2s ease-out, opacity 0.3s ease' : 'width 0.3s steps(8)',
                    opacity: progress === 100 ? 0 : 1,
                    // Pixel-like stepped rendering
                    imageRendering: 'pixelated',
                    boxShadow: '2px 0 0 #000, 4px 0 8px rgba(0,0,0,0.3)',
                }}
            />
            {/* Pixel shimmer effect */}
            {visible && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '100%',
                        background: 'repeating-linear-gradient(90deg, transparent 0px, transparent 8px, rgba(255,255,255,0.15) 8px, rgba(255,255,255,0.15) 10px)',
                        pointerEvents: 'none',
                    }}
                />
            )}
        </div>
    );
}
