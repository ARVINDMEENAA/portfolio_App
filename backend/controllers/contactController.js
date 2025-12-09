const Contact = require('../models/Contact');

// handle contact form submission
exports.createContact = async (req, res) => {
  try {
    const { fullName, email, mobile, city } = req.body;
    
    const contact = await Contact.create({ 
      fullName, 
      email, 
      mobile, 
      city 
    });
    
    console.log('New contact submission:', email);
    res.status(201).json({ 
      message: 'Contact submitted successfully', 
      contact 
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: error.message });
  }
};

// get all contact submissions
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: error.message });
  }
};
