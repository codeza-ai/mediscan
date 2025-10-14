const { askGemini } = require("../services/gemini.service");
const { addQueryResponse, clearHistory, getQueryHistory } = require("../services/mongo.service");

const normalRequest = async(req, res)=>{
    // "gemini-2.5-flash"
    const { message } = req.body;
    // console.log(message);
    try {
        const response = await askGemini(message, "gemini-2.5-flash");
        // console.log(response);
        await addQueryResponse(message, response.conditions, response.next_steps, "Gemini 2.5 Flash - Free");
        res.json(response).status(200);
    }catch (error) {
        res.json({ error: error.message }).status(500);
    }
};

const proRequest = async(req, res)=>{
    // "gemini-2.5-pro"
    const { message } = req.body;
    // console.log(message);
    try {
        const response = await askGemini(message, "gemini-2.5-pro");
        // console.log(response);
        
        await addQueryResponse(message, response.conditions, response.next_steps, "Gemini 2.5 Pro - Pro");
        res.json(response).status(200);
    } catch (error) {
        res.json({ error: error.message }).status(500);
    }
};

const clearChatHistory = async(req, res)=>{
    try {
        const result = await clearHistory();
        res.json({ message: result }).status(200);
    }catch (error) {
        res.json({ error: error.message }).status(500);
    }
}

const getChatHistory = async(req, res)=>{
    try {
        const {history, message} = await getQueryHistory();
        res.json(history, message).status(200);
    }catch (error) {
        res.json({ error: error.message }).status(500);
    }
}

module.exports = {
    normalRequest,
    proRequest,
    clearChatHistory,
    getChatHistory
};