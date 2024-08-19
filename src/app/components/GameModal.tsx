import React from 'react';
import Link from 'next/link';

interface GameModalProps {
    type: 'paused' | 'win' | 'lose';
    onContinue: () => void;
    onNewCategory: () => void;
    onQuit: () => void;
}

export default function GameModal({ type, onContinue, onNewCategory, onQuit }: GameModalProps) {
    const titles = {
        paused: 'Paused',
        win: 'You Win',
        lose: 'You Lose'
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
            <div className="relative w-full max-w-[324px] sm:max-w-[592px]">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="text-heading-l sm:text-heading-xl gradient-text"
                        data-text={titles[type]}>
                        {titles[type]}
                    </div>
                </div>
                <div className="card w-full">
                    <div className="flex flex-col items-center justify-between h-full py-16 px-4">
                        <div className="flex flex-col space-y-4 w-full max-w-[260px] my-auto">
                            <button
                                onClick={onContinue}
                                className="shadow-category-btn hover:shadow-category-btn-hover bg-[#2463FF] hover:bg-[#519dfb] text-white py-4 px-6 rounded-full w-full transition-all duration-300"
                            >
                                Continue
                            </button>
                            <button
                                onClick={onNewCategory}
                                className="shadow-category-btn hover:shadow-category-btn-hover bg-[#2463FF] hover:bg-[#519dfb] text-white py-4 px-6 rounded-full w-full transition-all duration-300"
                            >
                                New Category
                            </button>
                            <button
                                onClick={onQuit}
                                className="shadow-category-btn hover:shadow-category-btn-hover bg-[#FE71FE] hover:bg-[#7199FF] text-white py-4 px-6 rounded-full w-full transition-all duration-300"
                            >
                                Quit Game
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};