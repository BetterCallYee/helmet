
import React from 'react';
import { AnalysisResult } from '../types';

interface ResultCardProps {
    title: string;
    isPositive: boolean;
    reason: string;
}

const CheckCircleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const XCircleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ResultCard: React.FC<ResultCardProps> = ({ title, isPositive, reason }) => {
    const bgColor = isPositive ? 'bg-green-900/50' : 'bg-red-900/50';
    const borderColor = isPositive ? 'border-green-500' : 'border-red-500';
    const textColor = isPositive ? 'text-green-300' : 'text-red-300';

    return (
        <div className={`p-5 rounded-xl border ${borderColor} ${bgColor}`}>
            <div className="flex items-center gap-3">
                {isPositive ? <CheckCircleIcon className={`w-8 h-8 ${textColor}`} /> : <XCircleIcon className={`w-8 h-8 ${textColor}`} />}
                <div>
                    <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
                    <p className={`text-2xl font-bold ${textColor}`}>
                        {isPositive ? 'Yes' : 'No'}
                    </p>
                </div>
            </div>
            <p className="mt-3 text-gray-300 text-sm">{reason}</p>
        </div>
    );
};

interface ResultDisplayProps {
    result: AnalysisResult;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-brand-light">AI Analysis Results</h2>
            <ResultCard 
                title="Helmet Detected"
                isPositive={result.helmetStatus.wearsHelmet}
                reason={result.helmetStatus.reason}
            />
            <ResultCard 
                title="Rule Compliance"
                isPositive={result.ruleCompliance.isCompliant}
                reason={result.ruleCompliance.reason}
            />
        </div>
    );
};
