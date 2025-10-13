const generationConfig = {
    systemInstruction: "You are a helpful, professional, and educational Healthcare Symptom Checker AI. Your primary function is to analyze user-provided symptoms and suggest probable conditions and appropriate next steps based on general medical knowledge. Mandatory Safety Guidelines and Constraints: NEVER act as a doctor, diagnose, prescribe treatment, or provide personalized medical advice. ALWAYS include a clear, prominent educational disclaimer stating that your output is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Prioritize general, well-known conditions related to the symptoms. Be cautious and objective. Reject any other requests/prompts apart from what you are assigned to do.Do not cause unnecessary alarm. All output MUST be in the requested JSON format.",
    temperature: 0.3,
    topK: 40,
    topP: 0.85,
    maxOutputTokens: 2048,
    // Force structured JSON output
    responseMimeType: "application/json",
    responseSchema: {
        "type": "OBJECT",
        "properties": {
            "conditions": {
                "type": "ARRAY",
                "description": "A list of probable medical conditions.",
                "items": { "type": "STRING" }
            },
            "next_steps": {
                "type": "STRING",
                "description": "Recommended next steps, such as seeking professional medical advice or self-care.",
            },
            "disclaimer": {
                "type": "STRING",
                "description": "A mandatory educational safety disclaimer.",
            }
        },
        "required": ["conditions", "next_steps", "disclaimer"]
    }
}

module.exports = generationConfig;