const { GoogleGenAI } = require("@google/genai");
const API_KEY = process.env.GEMINI_API_KEY
const generationConfig = require('../gemini.config.js');

if (!API_KEY) {
    console.warn(
        'No Gemini API key found in process.env.GEMINI_API_KEY.'
    );
}

const ai = new GoogleGenAI(API_KEY ? { API_KEY } : {});
async function askGemini(content, model) {
    const prompt = `Based on these symptoms: "${content}", suggest possible conditions and next steps with educational disclaimer.`;
    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: generationConfig
        });
        const data = JSON.parse(response.text);
        return data;
    } catch (error) {
        console.error("Error in askGemini:", error);
        throw error;
    }
}

module.exports = {
    askGemini
};