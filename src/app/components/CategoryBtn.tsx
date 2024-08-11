import React from 'react'

interface CategoryBtnProps {
    name: string;
    onClick: () => void;
}

export default function CategoryBtn({ name, onClick }: CategoryBtnProps): JSX.Element {
    return (
        <button
            onClick={onClick}
            className='shadow-category-btn hover:shadow-category-btn-hover w-80 h-20 rounded-lg relative overflow-hidden transition-all duration-300 text-white uppercase bg-[#2463FF] hover:bg-[#519dfb]'
        >
            {name}
        </button>
    )
}
