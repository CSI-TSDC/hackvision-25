'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * LenisProvider - Initializes and manages Lenis smooth scrolling
 * - Works on both desktop and mobile (touch)
 * - Integrates with GSAP ScrollTrigger
 * - Add this component once in layout.tsx to enable smooth scrolling site-wide
 */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t) => 1 - Math.pow(1 - t, 4),
            touchMultiplier: 2,
            smoothWheel: true,
            // Touch/mobile support
            gestureOrientation: 'vertical',
            syncTouch: true,
        });

        // Integrate Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        // Store lenis instance globally for access by other components
        (window as any).__lenis = lenis;

        return () => {
            gsap.ticker.remove((time) => {
                lenis.raf(time * 1000);
            });
            lenis.destroy();
            delete (window as any).__lenis;
        };
    }, []);

    return <>{children}</>;
}
