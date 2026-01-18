'use client';
import { useEffect, useState } from 'react';
import Lenis from 'lenis';

interface ScrollValues {
    scroll: number;
    limit: number;
    velocity: number;
    direction: number;
    progress: number;
}

/**
 * useLenisScroll - Hook to get current scroll values from Lenis
 * Only use this when you actually need scroll values for animations
 * Returns { scroll, limit, velocity, direction, progress }
 */
export function useLenisScroll(): ScrollValues {
    const [scrollValues, setScrollValues] = useState<ScrollValues>({
        scroll: 0,
        limit: 0,
        velocity: 0,
        direction: 0,
        progress: 0,
    });

    useEffect(() => {
        const checkLenis = () => {
            const lenis = (window as any).__lenis as Lenis | undefined;
            if (!lenis) {
                // Retry if lenis not ready yet
                setTimeout(checkLenis, 100);
                return;
            }

            const onScroll = ({ scroll, limit, velocity, direction, progress }: any) => {
                setScrollValues({ scroll, limit, velocity, direction, progress });
            };

            lenis.on('scroll', onScroll);

            return () => {
                lenis.off('scroll', onScroll);
            };
        };

        const cleanup = checkLenis();
        return () => {
            if (typeof cleanup === 'function') cleanup();
        };
    }, []);

    return scrollValues;
}
