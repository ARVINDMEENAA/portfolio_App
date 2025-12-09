const mongoose = require('mongoose');

// Project schema
const projectSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    required: true 
  }
}, { 
  timestamps: true // adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('Project', projectSchema);
