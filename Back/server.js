const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();


// CORS Configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://172.18.0.4:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'], 
  credentials: true,
}));

// Middleware to handle preflight requests
app.options('*', cors()); 

// Middleware for parsing JSON
app.use(express.json());

// Routes
app.use('/users', require('./routes/auth/users'));
app.use('/login', require('./routes/auth/login'));
app.use('/payment', require('./routes/payment'));
app.use('/products', require('./routes/products'))

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


