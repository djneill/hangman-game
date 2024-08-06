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
        <div className='min-h-screen w-[324px] mx-auto mt-8'>
            <div className="flex justify-between mb-10 items-center">
                <Link href={'/'}>
                    <BackButton />
                </Link>
                <span className='heading-m sm:heading-xl gradient-text'
                    data-text="How To Play"
                >
                    How To Play
                </span>
            </div>

            {rules.map((rule: Rule) => (
                <div key={rule.id} className='rounded-xl p-6 mb-6 bg-white'>
                    <div className="body mb-2">
                        <span className='text-blue-600 mr-4'>{rule.id}</span>
                        <span className='text-blue-800'>{rule.title.toUpperCase()}</span>
                    </div>
                    <p className='body-s text-gray-600'>{rule.description}</p>
                </div>
            ))}

        </div>
    )
}
