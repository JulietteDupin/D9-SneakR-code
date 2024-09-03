const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
const corsOptions = {
  origin: [import.meta.url.VITE_APP_CLIENT_URL],
  methods: 'GET, PUT, POST, DELETE',
  allowedHeaders: 'Authorization, Content-Type'
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/users', require('./routes/users'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
