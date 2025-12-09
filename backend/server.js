const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// middleware setup
app.use(cors({
  origin: '*', // Allow all origins for now
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// connect to mongodb
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// routes
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/clients', require('./routes/clientRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/newsletter', require('./routes/newsletterRoutes'));

// basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
