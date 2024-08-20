'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { categories } from '../components/data/data';
import MenuBtn from '../components/MenuBtn';
import HealthBar from '../components/HealthBar';
import GameModal from '../components/GameModal';

interface GameState {
    category: string;
    word: string;
    revealedLetters: Set<string>;
    usedLetters: Set<string>;
    lives: number;
}

export default function Gameboard() {
    const router = useRouter();
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [maxCharsPerLine, setMaxCharsPerLine] = useState(7);

    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        type: 'paused' | 'win' | 'lose';
    }>({
        isOpen: false,
        type: 'paused'
    });

    useEffect(() => {
        const savedGame = localStorage.getItem('hangmanGameState');
        if (savedGame) {
            const parsedGame = JSON.parse(savedGame);
            setGameState({
                ...parsedGame,
                revealedLetters: new Set(parsedGame.revealedLetters),
                usedLetters: new Set(parsedGame.usedLetters)
            });
        } else {
            const selectedCategory = localStorage.getItem('selectedCategory');
            if (selectedCategory) {
                initializeGame(selectedCategory);
            } else {
                router.push('/category')
            }
        }
    }, [router]);

    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== 'undefined') {
                if (window.innerWidth < 640) {
                    setMaxCharsPerLine(7);
                } else {
                    setMaxCharsPerLine(9);
                }
            }
        };

        handleResize();

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', handleResize);
            }
        };
    }, []);


    const initializeGame = (categoryName: string) => {
        const category = categories.find(cat => cat.name === categoryName);
        if (!category) return;

        const unselectedWords = category.words.filter(word => !word.selected);
        if (unselectedWords.length === 0) {
            category.words.forEach(word => word.selected = false);
        }

        const randomIndex = Math.floor(Math.random() * unselectedWords.length);
        const selectedWord = unselectedWords[randomIndex];
        selectedWord.selected = true;
        console.log(selectedWord) //*************** */ Don't forget to remove this!!!! ******************

        const newGameState = {
            category: categoryName,
            word: selectedWord.name.toUpperCase(),
            revealedLetters: new Set<string>(),
            usedLetters: new Set<string>(),
            lives: 8,
        };

        setGameState(newGameState);
        saveGameToLocalStorage(newGameState);
    };

    const saveGameToLocalStorage = (gameState: GameState) => {
        const gameStateForStorage = {
            ...gameState,
            revealedLetters: Array.from(gameState.revealedLetters),
            usedLetters: Array.from(gameState.usedLetters)
        };
        localStorage.setItem('hangmanGameState', JSON.stringify(gameStateForStorage));
    };

    const renderWordPlaceholders = () => {
        if (!gameState) return null;
        const words = gameState.word.split(' ');

        return (
            <div className="flex flex-wrap justify-center gap-4">
                {words.map((word, wordIndex) => (
                    <React.Fragment key={wordIndex}>
                        {chunk(word, maxCharsPerLine).map((subWord, subWordIndex, subWords) => (
                            <React.Fragment key={`${wordIndex}-${subWordIndex}`}>
                                <div className="flex">
                                    {subWord.split('').map((letter, letterIndex) => {
                                        const isRevealed = gameState.revealedLetters.has(letter.toUpperCase());
                                        return (
                                            <div
                                                key={`${wordIndex}-${subWordIndex}-${letterIndex}`}
                                                className={`
                                                    w-10 h-[66px] sm:w-[88px] sm:h-28 lg:w-28 lg:h-32 
                                                    mx-1 sm:mx-2 shadow-category-btn rounded-2xl 
                                                    bg-light-blue flex justify-center items-center 
                                                    text-heading-m lg:text-heading-l
                                                    ${isRevealed ? 'opacity-100' : 'opacity-30'}
                                                    transition-opacity duration-300 ease-in-out
                                                `}
                                            >
                                                {isRevealed ? letter : ''}
                                            </div>
                                        );
                                    })}
                                </div>
                                {subWordIndex < subWords.length - 1 && (
                                    <div className="flex items-center justify-center w-10 h-[66px] sm:w-[88px] sm:h-28 lg:w-28 lg:h-32">
                                        <span className="text-heading-m lg:text-heading-l">-</span>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                        {wordIndex < words.length - 1 && (
                            <div className="w-6 sm:w-8 lg:w-10"></div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        );
    };

    // Limit word to 10 letters then hyphenate
    const chunk = (word: string, size: number): string[] => {
        const chunks = [];
        for (let i = 0; i < word.length; i += size) {
            chunks.push(word.slice(i, i + size));
        }
        return chunks;
    };

    const renderKeyboard = () => {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return alphabet.split('').map(letter => {
            const isUsed = gameState?.usedLetters.has(letter) || false;
            return (
                <button
                    key={letter}
                    onClick={() => handleLetterGuess(letter)}
                    disabled={isUsed}
                    className={`w-7 h-14 sm:w-16 sm:h-20 lg:w-24 lg:h-20 m-1 ${isUsed ? 'bg-gray-300 text-dark-navy opacity-30' : 'bg-white text-blue-900 hover:bg-light-blue hover:text-white opacity-100'}  rounded-2xl text-heading-s lg:text-heading-m transition-all duration-300`}
                >
                    {letter}
                </button>
            );
        });
    };

    const handleLetterGuess = (letter: string) => {
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

            if (newRevealedLetters.size === new Set(prevState.word.replace(/\s/g, '')).size) {
                setModalState({ isOpen: true, type: 'win' });
            } else if (newState.lives === 0) {
                setModalState({ isOpen: true, type: 'lose' });
            }

            saveGameToLocalStorage(newState);
            return newState;
        });
    };

    const handleContinue = () => {
        setModalState({ isOpen: false, type: 'paused' });
    };

    const clearSavedGame = () => {
        localStorage.removeItem('hangmanGameState');
    };

    const handleNewCategory = () => {
        setGameState(null);
        clearSavedGame();
        router.push('/category');
    };

    const handleQuit = () => {
        setGameState(null);
        clearSavedGame();
        router.push('/');
    };

    const openPauseMenu = () => {
        setModalState({ isOpen: true, type: 'paused' });
    };

    if (!gameState) return <div>Loading...</div>

    return (
        <div className='min-h-screen w-[324px] sm:w-[680px] lg:w-[1024px] mx-auto mt-10 text-white'>
            <div className="flex justify-between items-center mb-4">
                <div className="flex justify-start items-center">
                    <MenuBtn onClick={openPauseMenu} />
                    <div className='text-heading-s sm:text-heading-m lg:text-heading-l ml-8'>{gameState.category}</div>
                </div>
                <div className="flex justify-end items-center">
                    <HealthBar lives={gameState.lives} maxLives={8} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 54 50" className='w-[26px] h-[24px] sm:w-[53px] sm:h-[48px] lg:w-[54px] lg:h-[50px] ml-8'><path fill="url(#a)" d="m26.667 49.467-3.867-3.52C9.067 33.493 0 25.253 0 15.2 0 6.96 6.453.533 14.667.533c4.64 0 9.093 2.16 12 5.547 2.906-3.387 7.36-5.547 12-5.547C46.88.533 53.333 6.96 53.333 15.2c0 10.053-9.066 18.293-22.8 30.747l-3.866 3.52Z" /><defs><linearGradient id="a" x1="26.667" x2="26.667" y1="8.567" y2="49.467" gradientUnits="userSpaceOnUse"><stop stopColor="#FE71FE" /><stop offset="1" stopColor="#7199FF" /></linearGradient></defs></svg>
                </div>
            </div>
            <div className="flex justify-center items-center my-12">
                {renderWordPlaceholders()}
            </div>
            <div className="flex flex-wrap gap-1 justify-center items-center">
                {renderKeyboard()}
            </div>
            {modalState.isOpen && (
                <GameModal
                    type={modalState.type}
                    onContinue={handleContinue}
                    onNewCategory={handleNewCategory}
                    onQuit={handleQuit}
                />
            )}
        </div>
    );
}