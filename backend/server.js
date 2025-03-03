const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');  // Assuming authRoutes is in the routes folder
const path = require('path');

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  // Static files middleware

// Middleware
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests from your React app
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow specific headers
  credentials: true  // Allow credentials (cookies, authorization headers)
}));

// Routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log(error));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
