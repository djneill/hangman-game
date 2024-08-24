'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGameState } from '../hooks/useGameState';
import { useModalState } from '../hooks/useModalState';
import GameModal from '../components/GameModal';
import KeyboardListener from '../components/KeyboardListener';
import { GameHeader } from '../components/GameHeader';
import { WordPlaceholders } from '../components/WordPlaceHolders';
import { OnScreenKeyboard } from '../components/OnScreenKeyboard';


export default function Gameboard() {
    const router = useRouter();
    const { gameState, setGameState, handleLetterGuess, isGameOver } = useGameState(
        localStorage.getItem('selectedCategory') || ''
    );
    const { modalState, openModal, closeModal } = useModalState();
    const [maxCharsPerLine, setMaxCharsPerLine] = useState(7);

    useEffect(() => {
        const handleResize = () => {
            setMaxCharsPerLine(window.innerWidth < 640 ? 7 : 9);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isGameOver) {
            openModal(gameState?.lives === 0 ? 'lose' : 'win');
        }
    }, [isGameOver, gameState?.lives, openModal]);

    const handleNewCategory = () => {
        setGameState(null);
        localStorage.removeItem('hangmanGameState');
        router.push('/category');
    };

    const handleQuit = () => {
        setGameState(null);
        localStorage.removeItem('hangmanGameState');
        router.push('/');
    };

    if (!gameState) return <div>Loading...</div>;

    return (
        <div className='min-h-screen w-[324px] sm:w-[680px] lg:w-[1024px] mx-auto mt-10 text-white'>
            <GameHeader
                category={gameState.category}
                lives={gameState.lives}
                maxLives={8}
                onMenuClick={() => openModal('paused')}
            />
            <WordPlaceholders
                word={gameState.word}
                revealedLetters={gameState.revealedLetters}
                maxCharsPerLine={maxCharsPerLine}
            />
            <OnScreenKeyboard
                usedLetters={gameState.usedLetters}
                onLetterPress={handleLetterGuess}
            />
            {modalState.isOpen && (
                <GameModal
                    type={modalState.type}
                    onContinue={closeModal}
                    onNewCategory={handleNewCategory}
                    onQuit={handleQuit}
                />
            )}
            <KeyboardListener
                onLetterPress={handleLetterGuess}
                isGameActive={!modalState.isOpen}
            />
        </div>
    );
}