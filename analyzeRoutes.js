const express = require('express');
const { analyzePrompt } = require('../controllers/analyzeController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, analyzePrompt);

module.exports = router;
