'use client'
import React from 'react';
import { useRouter } from 'next/navigation'
import BackButton from '../components/BackButton';
import { categories } from '../components/data/data';
import CategoryBtn from '../components/CategoryBtn';



export default function Page() {
    const router = useRouter()

    const handleCategorySelect = (categoryName: string) => {
        localStorage.setItem('selectedCategory', categoryName);
        router.push('/gameboard')
    }
    return (
        <div className='min-h-screen w-[324px] sm:w-[680px] lg:w-[1024px] lg:max-w-[1216px] mx-auto mt-10'>
            <div className="flex justify-between sm:flex-row mb-16 items-center">
                <BackButton />
                <div className='text-heading-m sm:text-heading-mid lg:text-heading-xl sm:flex sm:mx-auto sm:self-center gradient-text'
                    data-text="Pick a Category"
                >
                    Pick a Category
                </div>
            </div>

            <div className='flex flex-col justify-center items-center sm:grid sm:grid-cols-2 lg:grid-cols-3'>
                {categories.map((category, index) => (
                    <CategoryBtn
                        key={index}
                        name={category.name}
                        onClick={() => handleCategorySelect(category.name)}
                        aria-label={`Select category: ${category.name}`}
                    />
                ))}
            </div>
        </div>
    )
}