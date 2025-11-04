
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        helmetStatus: {
            type: Type.OBJECT,
            properties: {
                wearsHelmet: {
                    type: Type.BOOLEAN,
                    description: "True if the biker is wearing a helmet, false otherwise."
                },
                reason: {
                    type: Type.STRING,
                    description: "A brief explanation for the helmet status conclusion."
                }
            },
            required: ["wearsHelmet", "reason"]
        },
        ruleCompliance: {
            type: Type.OBJECT,
            properties: {
                isCompliant: {
                    type: Type.BOOLEAN,
                    description: "True if the biker appears to be following observable traffic rules, false otherwise."
                },
                reason: {
                    type: Type.STRING,
                    description: "A brief explanation of observed rule compliance or violations."
                }
            },
            required: ["isCompliant", "reason"]
        }
    }
};

export const analyzeBikerImage = async (imageBase64: string, mimeType: string): Promise<AnalysisResult> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: imageBase64,
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: "Analyze this image of a biker. Determine if they are wearing a helmet and if they are following observable traffic rules. Provide your analysis in the requested JSON format.",
                    },
                ],
            },
            config: {
                systemInstruction: "You are an AI assistant for traffic safety analysis. Your task is to analyze images of bikers and provide a structured JSON response about helmet usage and rule compliance.",
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        
        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        
        // Basic validation
        if (!result.helmetStatus || !result.ruleCompliance) {
            throw new Error("Invalid response structure from AI.");
        }
        
        return result;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get analysis from AI. Please check the console for more details.");
    }
};
