import React from 'react';
import BackButton from '../components/BackButton';
import rules from '../components/data/rules';
import Link from 'next/link';

interface Rule {
    id: string;
    title: string;
    description: string;
}

export default function Page() {
    return (
        <div className='min-h-screen w-[324px] sm:w-[680px] mx-auto mt-10'>
            <div className="flex justify-between sm:flex-row mb-12 items-center">
                <Link href={'/'}>
                    <BackButton />
                </Link>
                <div className='text-heading-m sm:text-heading-mid sm:flex sm:mx-auto sm:self-center gradient-text'
                    data-text="How to Play"
                >
                    How to Play
                </div>
            </div>

            {rules.map((rule: Rule) => (
                <div key={rule.id} className='rounded-xl p-6 mb-8 bg-white'>
                    <div className="body mb-4">
                        <div className='sm:flex sm:flex-row '>
                            <span className='text-blue-600 mr-4 sm:mr-8 sm:self-center sm:text-heading-l'>{rule.id}</span>
                            <span className='sm:w-full'>
                                <span className='text-blue-800 sm:text-[40px] sm:tracking-wide'>{rule.title.toUpperCase()}</span>
                                <p className='body-s text-gray-600'>{rule.description}</p>
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

{/* *** reference note ***
            {rules.map((rule: Rule) => (
                <div key={rule.id} className='rounded-xl p-6 mb-6 bg-white'>
                    <div className="body mb-2">
                        <span className='text-blue-600 mr-4'>{rule.id}</span>
                        <span className='text-blue-800'>{rule.title.toUpperCase()}</span>
                        <p className='body-s text-gray-600'>{rule.description}</p>
                    </div>

                </div>
            ))} */}