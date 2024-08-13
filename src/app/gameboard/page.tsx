'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { categories } from '../components/data/data';
import MenuBtn from '../components/MenuBtn';
import HealthBar from '../components/HealthBar';

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

    // const renderWordPlaceholders = () => {
    //     if (!gameState) return null;
    //     return gameState.word.split('').map((letter, index) => {
    //         if (letter === ' ') {
    //             return <div key={index} className='w-6 sm:w-8 lg:w-10'></div>;
    //         }
    //         return (
    //             <div key={index}
    //                 className='w-10 h-[66px] sm:w-[88px] sm:h-28 lg:w-28 lg:h-32 mx-2 shadow-category-btn rounded-2xl bg-light-blue flex justify-center items-center text-heading-m lg:text-heading-l'
    //             >
    //                 {gameState.revealedLetters.has(letter.toUpperCase()) ? letter : ''}
    //             </div>
    //         );
    //     });
    // };
    const renderWordPlaceholders = () => {
        if (!gameState) return null;
        const words = gameState.word.split(' ');

        return (
            <div className="flex flex-wrap justify-center gap-4">
                {words.map((word, wordIndex) => (
                    <React.Fragment key={wordIndex}>
                        <div className="flex">
                            {word.split('').map((letter, letterIndex) => (
                                <div
                                    key={`${wordIndex}-${letterIndex}`}
                                    className='w-10 h-[66px] sm:w-[88px] sm:h-28 lg:w-28 lg:h-32 mx-1 sm:mx-2 shadow-category-btn rounded-2xl bg-light-blue flex justify-center items-center text-heading-m lg:text-heading-l'
                                >
                                    {gameState.revealedLetters.has(letter.toUpperCase()) ? letter : ''}
                                </div>
                            ))}
                        </div>
                        {wordIndex < words.length - 1 && (
                            <div className="w-6 sm:w-8 lg:w-10"></div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        );
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
        <div className='min-h-screen w-[324px] sm:w-[680px] lg:w-[1024px] mx-auto mt-10 text-white'>
            <div className="flex justify-between items-center mb-4">
                <div className="flex justify-start items-center">
                    <MenuBtn />
                    <div className='text-heading-s sm:text-heading-m lg:text-heading-l ml-8'>{gameState.category}</div>
                </div>
                <div className="flex justify-end items-center">
                    <HealthBar lives={gameState.lives} maxLives={8} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 54 50" className='w-[26px] h-[24px] sm:w-[53px] sm:h-[48px] lg:w-[54px] lg:h-[50px] ml-8'><path fill="url(#a)" d="m26.667 49.467-3.867-3.52C9.067 33.493 0 25.253 0 15.2 0 6.96 6.453.533 14.667.533c4.64 0 9.093 2.16 12 5.547 2.906-3.387 7.36-5.547 12-5.547C46.88.533 53.333 6.96 53.333 15.2c0 10.053-9.066 18.293-22.8 30.747l-3.866 3.52Z" /><defs><linearGradient id="a" x1="26.667" x2="26.667" y1="8.567" y2="49.467" gradientUnits="userSpaceOnUse"><stop stop-color="#FE71FE" /><stop offset="1" stop-color="#7199FF" /></linearGradient></defs></svg>
                </div>
            </div>
            <div className="flex justify-center items-center my-12">
                {renderWordPlaceholders()}
            </div>
            <div className="grid grid-cols-9 gap-1 justify-center">
                {renderKeyboard()}
            </div>
        </div>
    );
}