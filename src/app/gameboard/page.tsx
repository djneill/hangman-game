'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { categories } from '../components/data/data';

interface GameState {
    category: string;
    word: string;
    revealedLetters: Set<string>;
    lives: number;
}

export default function Gameboard() {
    const router = useRouter();
    const [gameState, setGameState] = useState<GameState | null>(null);

    useEffect(() => {
        const selectedCategory = localStorage.getItem('selectedCategory');
        if (selectedCategory) {
            initializeGame(selectedCategory);
        } else {
            router.push('/category')
        }
    }, [router]); // May need an empty dependency array

    const initializeGame = (categoryName: string) => {
        const category = categories.find(cat => cat.name === categoryName);
        if (!category) return;

        const unselectedWords = category.words.filter(word => !word.selected);
        if (unselectedWords.length === 0) {
            // Reset all words if all have been selected
            category.words.forEach(word => word.selected = false);
        }

        const randomIndex = Math.floor(Math.random() * unselectedWords.length);
        const selectedWord = unselectedWords[randomIndex];
        selectedWord.selected = true;
        console.log(selectedWord) // Don't forget to remove this 

        setGameState({
            category: categoryName,
            word: selectedWord.name.toUpperCase(),
            revealedLetters: new Set(),
            lives: 8,
        });
    };

    const renderWordPlaceholders = () => {
        if (!gameState) return null;
        return gameState.word.split('').map((letter, index) => (
            <div key={index}
                className='w-8 h-8 border-b-2 border-white mx-1'
            >
                {gameState.revealedLetters.has(letter) ? letter : ''}
            </div>
        ));
    };

    const renderKeyboard = () => {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return alphabet.split('').map(letter => (
            <button
                key={letter}
                onClick={() => handleLetterGuess(letter)}
                className='w-8 h-8 m-1 bg-white text-blue-900 rounded'
            >
                {letter}
            </button>
        ));
    };

    const handleLetterGuess = (letter: string) => {
        if (!gameState) return;
        const newRevealedLetters = new Set(gameState.revealedLetters);
        newRevealedLetters.add(letter);

        setGameState(prevState => {
            if (!prevState) return null;
            return {
                ...prevState,
                revealedLetters: newRevealedLetters,
                lives: prevState?.word.includes(letter) ? prevState.lives : prevState.lives - 1
            };
        });
    };

    if (!gameState) return <div>Loading...</div>

    return (
        <div className='min-h-screen text-white p-4'>
            <div className="flex justify-between items-center mb-4">
                <div>{gameState.category}</div>
                <div>Lives: {gameState.lives}</div>
            </div>
            <div className="flex justify-center mb-8">
                {renderWordPlaceholders()}
            </div>
            <div className="grid grid-cols-9 gap-1 justify-center">
                {renderKeyboard()}
            </div>
        </div>
    );
}