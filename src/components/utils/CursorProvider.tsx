'use client';

import { useEffect } from 'react';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function CursorProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        document.body.style.cursor = `url('${BASE_PATH}/cursor.png'), auto`;

        return () => {
            document.body.style.cursor = '';
        };
    }, []);

    return <>{children}</>;
}
