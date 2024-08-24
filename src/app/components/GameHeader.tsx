import React from "react";
import MenuBtn from "./MenuBtn";
import HealthBar from "./HealthBar";

interface GameHeaderProps {
    category: string;
    lives: number;
    maxLives: number;
    onMenuClick: () => void;
}

export function GameHeader({ category, lives, maxLives, onMenuClick }: GameHeaderProps) {
    return (
        <div className="flex justify-between items-center mb-4">
            <div className="flex justify-start items-center">
                <MenuBtn onClick={onMenuClick} />
                <div className='text-heading-s sm:text-heading-m lg:text-heading-l ml-8'>{category}</div>
            </div>
            <div className="flex justify-end items-center">
                <HealthBar lives={lives} maxLives={maxLives} />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 54 50" className='w-[26px] h-[24px] sm:w-[53px] sm:h-[48px] lg:w-[54px] lg:h-[50px] ml-8'><path fill="url(#a)" d="m26.667 49.467-3.867-3.52C9.067 33.493 0 25.253 0 15.2 0 6.96 6.453.533 14.667.533c4.64 0 9.093 2.16 12 5.547 2.906-3.387 7.36-5.547 12-5.547C46.88.533 53.333 6.96 53.333 15.2c0 10.053-9.066 18.293-22.8 30.747l-3.866 3.52Z" /><defs><linearGradient id="a" x1="26.667" x2="26.667" y1="8.567" y2="49.467" gradientUnits="userSpaceOnUse"><stop stopColor="#FE71FE" /><stop offset="1" stopColor="#7199FF" /></linearGradient></defs></svg>
            </div>
        </div>
    );
}