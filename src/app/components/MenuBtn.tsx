import React from 'react'

interface MenuBtnProps {
    onClick: () => void;
}

export default function MenuBtn({ onClick }: MenuBtnProps) {

    return (
        <button
            onClick={onClick}
            className='back-button flex justify-center items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 38 32"
                className='w-[16px] h-[13px] sm:w-[25px] sm:h-[21px] lg:w-[38px] lg:h-[32px]'><path fill="#fff" d="M0 0h38v7H0zM0 13h38v6H0zM0 25h38v7H0z" /></svg>
        </button>
    )
}
