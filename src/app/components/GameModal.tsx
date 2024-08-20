import React from 'react';

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
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full flex justify-center">
                    <div className="text-heading-l sm:text-heading-xl gradient-text whitespace-nowrap"
                        data-text={titles[type]}>
                        {titles[type]}
                    </div>
                </div>
                <div className="card w-full">
                    <div className="flex flex-col items-center justify-between h-full py-16 px-4">
                        <div className="flex flex-col text-heading-s space-y-8 w-full max-w-[260px] justify-center my-auto items-center">
                            <button
                                onClick={onContinue}
                                className="shadow-category-btn hover:shadow-category-btn-hover bg-[#2463FF] hover:bg-[#519dfb] text-white py-4 px-6 rounded-full w-56 h-14 transition-all duration-300"
                            >
                                Continue
                            </button>
                            <button
                                onClick={onNewCategory}
                                className="shadow-category-btn hover:shadow-category-btn-hover bg-[#2463FF] hover:bg-[#519dfb] text-white py-4 px-6 rounded-full w-[275px] transition-all duration-300"
                            >
                                New Category
                            </button>
                            <button
                                onClick={onQuit}
                                className="shadow-pinky hover:shadow-pinky-hover bg-gradient-to-b from-[#FE71FE] to-[#7199FF] text-white hover:from-[#7199FF] hover:to-[#8831f0] py-4 px-6 rounded-full w-[235px] transition-all duration-300"
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