'use client'
import { useState, useEffect } from 'react';
import Gameboard from '../components/Gameboard';

export default function ClientOnlyGameboard() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return <Gameboard />;
}