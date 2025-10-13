const express = require('express');
const router = express.Router();

const {
    normalRequest,
    proRequest
} = require('../controllers/index.controller');

router.post("/free", normalRequest);
router.post("/pro", proRequest);

module.exports = router;