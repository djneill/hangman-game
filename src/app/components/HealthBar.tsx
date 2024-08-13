import React from 'react'

interface HealthBarProps {
    lives: number;
    maxLives: number;
}

export default function HealthBar({ lives, maxLives }: HealthBarProps) {
    const healthPercentage = (lives / maxLives) * 100;

    return (
        <div className='w-[57px] h-4 sm:w-40 sm:h-8 lg:w-[240px] lg:h-31px bg-gray-200 rounded-2xl overflow-hidden flex items-center py-4 px-2'>
            <div className='h-full py-2 bg-dark-navy transition-all duration-300 ease-in-out  rounded-2xl'
                style={{
                    width: `${healthPercentage}%`
                }}
            >
            </div>
        </div>
    )
}

