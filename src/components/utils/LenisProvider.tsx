'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * LenisProvider - Initializes and manages Lenis smooth scrolling
 * Add this component once in layout.tsx to enable smooth scrolling site-wide
 */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.4,
            // Exponential ease-out: instant response, smooth deceleration
            easing: (t) => 1 - Math.pow(1 - t, 4),
            touchMultiplier: 2,
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Store lenis instance globally for access by useLenisScroll hook
        (window as any).__lenis = lenis;

        return () => {
            lenis.destroy();
            delete (window as any).__lenis;
        };
    }, []);

    return <>{children}</>;
}
