import React from 'react'

interface HomeCardProps {
    children: React.ReactNode
}

export default function HomeCard({ children }: HomeCardProps) {
    return (
        <div className='relative overflow-visible'>
            <div className='outer-card'>
                <div className="card flex flex-col items-center justify-center">
                    {children}
                </div>
            </div>
        </div>
    )
}
