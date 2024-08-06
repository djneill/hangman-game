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
            <div className="flex justify-between mb-10">
                <Link href={'/'}>
                    <BackButton />
                </Link>
                <h2 className='text-3xl'>How To Play</h2>
            </div>

            {rules.map((rule: Rule) => (
                <div key={rule.id} className='rounded-xl p-6 mb-6 bg-white'>
                    <h3 className="text-xl mb-2">
                        <span className='text-blue-600 mr-2'>{rule.id}</span>
                        <span className='text-blue-800'>{rule.title.toUpperCase()}</span>
                    </h3>
                    <p className='text-sm text-gray-600'>{rule.description}</p>
                </div>
            ))}

        </div>
    )
}
