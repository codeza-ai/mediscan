const { askGemini } = require("../services/gemini.service");

const normalRequest = async(req, res)=>{
    // "gemini-2.5-flash"
    const { message } = req.body;
    console.log(message);
    try {
        const response = await askGemini(message, "gemini-2.5-flash");
        res.json({ response }).status(200);
    }catch (error) {
        res.json({ error: error.message }).status(500);
    }
};

const proRequest = async(req, res)=>{
    // "gemini-2.5-pro"
    const { message } = req.body;
    console.log(message);
    try {
        const response = await askGemini(message, "gemini-2.5-flash");
        res.json({ response }).status(200);
    } catch (error) {
        res.json({ error: error.message }).status(500);
    }
};  

module.exports = {
    normalRequest,
    proRequest
};