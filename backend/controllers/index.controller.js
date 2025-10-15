const { askGemini } = require("../services/gemini.service");
const { addQueryResponse, clearHistory, getQueryHistory } = require("../services/mongo.service");

const normalRequest = async(req, res)=>{
    // "gemini-2.5-flash"
    const { message } = req.body;
    // console.log(message);
    try{
        const response = await askGemini(message, "gemini-2.5-flash");
        // console.log(response);
        await addQueryResponse(message, response.conditions, response.next_steps, "Gemini 2.5 Flash - Free");
        res.status(200).json(response);
    }catch (error){
        res.status(500).json({ error: error.message });
    }
};

const proRequest = async(req, res)=>{
    // "gemini-2.5-pro"
    const { message } = req.body;
    // console.log(message);
    try{
        const response = await askGemini(message, "gemini-2.5-pro");
        // console.log(response);
        
        await addQueryResponse(message, response.conditions, response.next_steps, "Gemini 2.5 Pro - Pro");
        res.status(200).json(response);
    }catch(error){
        res.status(500).json({ error: error.message });
    }
};

const clearChatHistory = async(req, res)=>{
    try{
        const result = await clearHistory();
        res.status(200).json({ message: result });
    }catch (error){
        res.status(500).json({ error: error.message });
    }
}

const getChatHistory = async(req, res)=>{
    try{
        const {history, message} = await getQueryHistory();
        res.status(200).json(history);
    }catch (error){
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    normalRequest,
    proRequest,
    clearChatHistory,
    getChatHistory
};