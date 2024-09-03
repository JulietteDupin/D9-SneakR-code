const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Ensure OPTIONS is included
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'], // Specify the headers expected in requests
  credentials: true, // If you're dealing with cookies, authorization headers, or TLS client certificates
}));

// Middleware to handle preflight requests
app.options('*', cors()); // Respond to preflight requests with CORS headers

// Middleware for parsing JSON
app.use(express.json());

// Routes
app.use('/users', require('./routes/users'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
