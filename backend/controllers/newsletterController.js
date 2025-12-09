const Newsletter = require('../models/Newsletter');

// handle newsletter subscription
exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    
    // check if email already exists
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(400).json({ 
        error: 'This email is already subscribed to our newsletter' 
      });
    }

    // create new subscription
    const newsletter = await Newsletter.create({ email });
    console.log('New newsletter subscription:', email);
    
    res.status(201).json({ 
      message: 'Subscribed successfully', 
      newsletter 
    });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    res.status(500).json({ error: error.message });
  }
};

// get all newsletter subscribers
exports.getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    res.status(500).json({ error: error.message });
  }
};
