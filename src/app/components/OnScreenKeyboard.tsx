import React from 'react';

interface OnScreenKeyboardProps {
    usedLetters: Set<string>;
    onLetterPress: (letter: string) => void;
}

export function OnScreenKeyboard({ usedLetters, onLetterPress }: OnScreenKeyboardProps) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    return (
        <div className="flex flex-wrap justify-center my-14">
            {alphabet.split('').map(letter => {
                const isUsed = usedLetters.has(letter);
                return (
                    <button
                        key={letter}
                        onClick={() => onLetterPress(letter)}
                        disabled={isUsed}
                        className={`
                            w-7 h-14 sm:w-16 sm:h-20 lg:w-24 lg:h-20 m-1 mt-2
                            ${isUsed ? 'bg-gray-300 text-dark-navy opacity-30' : 'bg-white text-blue-900 hover:bg-light-blue hover:text-white opacity-100'}  
                            rounded-2xl text-heading-s lg:text-heading-m transition-all duration-300
                        `}
                    >
                        {letter}
                    </button>
                );
            })}
        </div>
    );
}