'use client'
import { useState, useEffect, useCallback } from 'react';
import { categories } from '../components/data/data';

interface GameState {
    category: string;
    word: string;
    revealedLetters: Set<string>;
    usedLetters: Set<string>;
    lives: number;
}

export function useGameState(initialCategory: string) {
    const [gameState, setGameState] = useState<GameState | null>(null);

    const saveGameToLocalStorage = useCallback((state: GameState) => {
        const gameStateForStorage = {
            ...state,
            revealedLetters: Array.from(state.revealedLetters),
            usedLetters: Array.from(state.usedLetters)
        };
        localStorage.setItem('hangmanGameState', JSON.stringify(gameStateForStorage));
    }, []);

    const initializeGame = useCallback((categoryName: string) => {
        const category = categories.find(cat => cat.name === categoryName);
        if (!category) return;

        const unselectedWords = category.words.filter(word => !word.selected);
        if (unselectedWords.length === 0) {
            category.words.forEach(word => word.selected = false);
        }

        const randomIndex = Math.floor(Math.random() * unselectedWords.length);
        const selectedWord = unselectedWords[randomIndex];
        selectedWord.selected = true;

        const newGameState: GameState = {
            category: categoryName,
            word: selectedWord.name.toUpperCase(),
            revealedLetters: new Set<string>(),
            usedLetters: new Set<string>(),
            lives: 8,
        };

        setGameState(newGameState);
        saveGameToLocalStorage(newGameState);
    }, [saveGameToLocalStorage]);

    const handleLetterGuess = useCallback((letter: string) => {
        if (!gameState || gameState.usedLetters.has(letter)) return;

        setGameState(prevState => {
            if (!prevState) return null;
            const newUsedLetters = new Set(prevState.usedLetters).add(letter);
            const newRevealedLetters = new Set(prevState.revealedLetters);

            if (prevState.word.includes(letter)) {
                newRevealedLetters.add(letter)
            }

            const newState = {
                ...prevState,
                revealedLetters: newRevealedLetters,
                usedLetters: newUsedLetters,
                lives: prevState.word.includes(letter) ? prevState.lives : prevState.lives - 1
            };

            saveGameToLocalStorage(newState);
            return newState;
        });
    }, [gameState, saveGameToLocalStorage]);

    useEffect(() => {
        const savedGame = localStorage.getItem('hangmanGameState');
        if (savedGame) {
            const parsedGame = JSON.parse(savedGame);
            setGameState({
                ...parsedGame,
                revealedLetters: new Set(parsedGame.revealedLetters),
                usedLetters: new Set(parsedGame.usedLetters)
            });
        } else if (initialCategory) {
            initializeGame(initialCategory);
        }
    }, [initializeGame, initialCategory]);

    return {
        gameState,
        setGameState,
        initializeGame,
        handleLetterGuess,
        isGameOver: gameState?.lives === 0 || (gameState && new Set(gameState.word.replace(/\s/g, '')).size === gameState.revealedLetters.size)
    };
}