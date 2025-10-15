const express = require('express');
const router = express.Router();

const {
    normalRequest,
    proRequest,
    clearChatHistory,
    getChatHistory
} = require('../controllers/index.controller');

router.post("/free", normalRequest);
router.post("/pro", proRequest);
router.delete("/history", clearChatHistory);
router.get("/history", getChatHistory);

module.exports = router;