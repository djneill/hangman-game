import React from 'react';

interface WordPlaceholdersProps {
    word: string;
    revealedLetters: Set<string>;
    maxCharsPerLine: number;
}

export function WordPlaceholders({ word, revealedLetters, maxCharsPerLine }: WordPlaceholdersProps) {
    const words = word.split(' ');

    // Limit word to maxCharsPerLine letters then hyphenate
    const chunk = (word: string, size: number): string[] => {
        const chunks = [];
        for (let i = 0; i < word.length; i += size) {
            chunks.push(word.slice(i, i + size));
        }
        return chunks;
    };

    return (
        <div className="flex flex-wrap justify-center gap-4 my-8">
            {words.map((word, wordIndex) => (
                <React.Fragment key={wordIndex}>
                    {chunk(word, maxCharsPerLine).map((subWord, subWordIndex, subWords) => (
                        <React.Fragment key={`${wordIndex}-${subWordIndex}`}>
                            <div className="flex">
                                {subWord.split('').map((letter, letterIndex) => {
                                    const isRevealed = revealedLetters.has(letter.toUpperCase());
                                    return (
                                        <div
                                            key={`${wordIndex}-${subWordIndex}-${letterIndex}`}
                                            className={`
                                                w-10 h-[66px] sm:w-[88px] sm:h-28 lg:w-28 lg:h-32 
                                                mx-1 sm:mx-2 shadow-category-btn rounded-2xl 
                                                bg-light-blue flex justify-center items-center 
                                                text-heading-m lg:text-heading-l mt-6
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
}