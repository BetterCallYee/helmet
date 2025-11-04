
import React, { useRef } from 'react';

interface ImageUploaderProps {
    onImageChange: (file: File) => void;
    imageUrl: string | null;
}

const UploadIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange, imageUrl }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onImageChange(file);
        }
    };

    const handleClick = () => {
        inputRef.current?.click();
    };

    return (
        <div 
            onClick={handleClick}
            className="w-full aspect-video bg-gray-700/50 rounded-lg border-2 border-dashed border-gray-500 flex items-center justify-center cursor-pointer hover:border-brand-primary hover:bg-gray-700 transition-all duration-300 relative overflow-hidden group"
        >
            <input
                type="file"
                ref={inputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
            />
            {imageUrl ? (
                <>
                    <img src={imageUrl} alt="Uploaded Biker" className="object-contain w-full h-full" />
                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-lg font-semibold">Click to change image</p>
                    </div>
                </>
            ) : (
                <div className="text-center text-gray-400">
                    <UploadIcon className="w-12 h-12 mx-auto" />
                    <p className="mt-2 font-semibold">Click to upload an image</p>
                    <p className="text-sm">PNG, JPG, or WEBP</p>
                </div>
            )}
        </div>
    );
};
