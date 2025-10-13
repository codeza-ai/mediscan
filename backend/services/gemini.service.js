const { GoogleGenAI } = require("@google/genai");

const API_KEY = process.env.GEMINI_API_KEY
if (!API_KEY) {
    console.warn(
        'No Gemini API key found in GEMINI_API_KEY/GOOGLE_API_KEY/GENAI_API_KEY.\n' +
        'The @google/genai client will fall back to Application Default Credentials (ADC).\n' +
        'To use an API key instead (recommended for local development), set GEMINI_API_KEY.'
    );
}

const ai = new GoogleGenAI(API_KEY ? { API_KEY } : {});

async function askGemini(content, model) {
    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: content,
        });
        console.log(response.text);
        return response.text;
    }catch(error){
        console.error("Error in askGemini:", error);
        throw error;
    }
}

module.exports = {
    askGemini
};