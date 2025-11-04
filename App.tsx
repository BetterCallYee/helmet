
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { Spinner } from './components/Spinner';
import { analyzeBikerImage } from './services/geminiService';
import { AnalysisResult } from './types';

const App: React.FC = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleImageChange = (file: File) => {
        setImageFile(file);
        setImageUrl(URL.createObjectURL(file));
        setAnalysisResult(null);
        setError(null);
    };

    const handleAnalysis = useCallback(async () => {
        if (!imageFile) {
            setError("Please upload an image first.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setAnalysisResult(null);

        try {
            const reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.onloadend = async () => {
                const base64data = reader.result?.toString().split(',')[1];
                if (!base64data) {
                    setError("Could not read the image file.");
                    setIsLoading(false);
                    return;
                }
                
                const result = await analyzeBikerImage(base64data, imageFile.type);
                setAnalysisResult(result);
            };
            reader.onerror = () => {
                setError("Failed to read file.");
                setIsLoading(false);
            }
        } catch (err) {
            setError(err instanceof Error ? `Analysis failed: ${err.message}` : "An unknown error occurred.");
        } finally {
           setTimeout(() => setIsLoading(false), 500); // give a bit of time to see the result
        }
    }, [imageFile]);

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-4xl mx-auto">
                <Header />
                <main className="mt-8 bg-gray-800/50 rounded-2xl shadow-2xl p-6 md:p-8 backdrop-blur-sm border border-gray-700">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="flex flex-col">
                            <ImageUploader onImageChange={handleImageChange} imageUrl={imageUrl} />
                             <button
                                onClick={handleAnalysis}
                                disabled={!imageFile || isLoading}
                                className="mt-6 w-full bg-brand-primary hover:bg-brand-secondary/90 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center shadow-lg transform hover:scale-105 disabled:transform-none"
                            >
                                {isLoading ? (
                                    <>
                                        <Spinner />
                                        Analyzing...
                                    </>
                                ) : 'Analyze Biker Safety'}
                            </button>
                        </div>
                        <div className="flex flex-col justify-center">
                            {isLoading && !analysisResult && (
                                <div className="text-center">
                                    <Spinner size="lg" />
                                    <p className="text-brand-secondary mt-4 text-lg animate-pulse">AI is analyzing the image...</p>
                                </div>
                            )}
                            {error && <p className="text-red-400 bg-red-900/50 p-4 rounded-lg text-center">{error}</p>}
                            {analysisResult && <ResultDisplay result={analysisResult} />}
                            {!isLoading && !analysisResult && !error && (
                                <div className="text-center text-gray-400 p-8 border-2 border-dashed border-gray-600 rounded-lg">
                                    <p className="text-xl font-semibold">Awaiting Analysis</p>
                                    <p className="mt-2">Upload an image and click "Analyze" to see the AI's safety report.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;
