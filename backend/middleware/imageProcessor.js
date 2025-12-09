const sharp = require('sharp');
const path = require('path');

// middleware to process and crop uploaded images
const processImage = async (req, res, next) => {
  // skip if no file uploaded
  if (!req.file) {
    return next();
  }

  try {
    // generate unique filename
    const timestamp = Date.now();
    const randomNum = Math.round(Math.random() * 1E9);
    const filename = `${timestamp}-${randomNum}.jpg`;
    const filepath = path.join(__dirname, '../uploads', filename);

    // resize image to 450x350 and convert to jpeg
    await sharp(req.file.buffer)
      .resize(450, 350, { 
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 90 })
      .toFile(filepath);

    // update file info
    req.file.filename = filename;
    req.file.path = filepath;
    
    next();
  } catch (error) {
    console.error('Error processing image:', error);
    next(error);
  }
};

module.exports = processImage;
