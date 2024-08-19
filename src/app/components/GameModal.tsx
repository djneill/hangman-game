import React from 'react';
import Link from 'next/link';

interface GameModalProps {
    type: 'paused' | 'win' | 'lose';
    onContinue: () => void;
    onNewCategory: () => void;
    onQuit: () => void;
}

const GameModal: React.FC<GameModalProps> = ({ type, onContinue, onNewCategory, onQuit }) => {
    const titles = {
        paused: 'Paused',
        win: 'You Win',
        lose: 'You Lose'
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
            <div className="card w-full max-w-[324px] sm:max-w-[592px]">
                <div className="flex flex-col items-center justify-between h-full py-8 px-4">
                    <h2 className="text-heading-l sm:text-heading-xl text-white text-center mb-8">{titles[type]}</h2>
                    <div className="flex flex-col space-y-4 w-full max-w-[260px]">
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
    );
};

export default GameModal;