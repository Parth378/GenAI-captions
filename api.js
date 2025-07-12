// routes/api.js
const express = require('express');
const router = express.Router();
const { analyzePrompt } = require('../controllers/analyzeController');

// Define the API route for analysis
router.post('/analyze', analyzePrompt);

module.exports = router;