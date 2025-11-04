
import React from 'react';

const HelmetIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c-4.418 0-8 3.582-8 8v3.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5V10c0-4.418-3.582-8-8-8zm0 2c3.309 0 6 2.691 6 6v1H6V10c0-3.309 2.691-6 6-6zm-7 11.5c0-1.104.896-2 2-2h10c1.104 0 2 .896 2 2v.5h-14v-.5zM7 18h10v2H7v-2z"/>
    </svg>
);


export const Header: React.FC = () => {
    return (
        <header className="text-center">
            <div className="flex items-center justify-center gap-4">
                 <HelmetIcon className="w-12 h-12 text-brand-primary" />
                <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary">
                    Biker Safety AI
                </h1>
            </div>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                Upload an image of a biker to instantly check for helmet usage and rule compliance using AI.
            </p>
        </header>
    );
};
