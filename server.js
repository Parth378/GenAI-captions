// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');

// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/analyze', require('./routes/analyzeRoutes'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// server.js (or app.js)
require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const dotenv = require('dotenv'); // Already imported in your current server.js
const cors = require('cors');     // Already imported in your current server.js
const connectDB = require('./config/db'); // Database connection

dotenv.config(); // Already called
connectDB();     // Already called

const app = express();

app.use(cors());         // Already used
app.use(express.json()); // Already used

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/analyze', require('./routes/analyzeRoutes'));

// Add this basic route for server health check
app.get('/', (req, res) => {
  res.send('Groq Caption Generator API is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Add this specific API access log for convenience
  console.log(`Access the Analyze API at http://localhost:${PORT}/api/analyze`);
});