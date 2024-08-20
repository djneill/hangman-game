import React, { useEffect } from 'react'

interface KeyboardListenerProps {
    onLetterPress: (letter: string) => void;
    isGameActive: boolean;
}

export default function KeyboardListener({ onLetterPress, isGameActive }: KeyboardListenerProps) {
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (!isGameActive) return
            const key = event.key.toUpperCase();
            if (/^[A-Z]$/.test(key)) {
                onLetterPress(key);
            }
        };
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [onLetterPress, isGameActive]);

    return null;
};
