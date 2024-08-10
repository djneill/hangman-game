'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
    const router = useRouter();
    const handleBack = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push('/');
        }
    }
    return (
        <button
            onClick={handleBack}
            className='back-button flex justify-center items-center'
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 41 39"
                className='w-[17px] h-[16px] sm:w-[27px] sm:h-[25px] md:w-[41px] md:h-[38px] mb-2 sm:mb-2 md:mb-4'>
                <path fill="#fff" d="M0 19.5 19.02.5v12.244C26.348 12.744 41 17.896 41 38.5c0-11.147-14.653-13.37-21.98-13.089V38.5L0 19.5Z" />
            </svg>
        </button>
    )
}
