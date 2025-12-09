const multer = require('multer');
const path = require('path');

// use memory storage for processing with sharp
const storage = multer.memoryStorage();

// filter to allow only image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Only image files (JPEG, PNG, WEBP) are allowed'));
};

// configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { 
    fileSize: 10 * 1024 * 1024 // 10MB max file size
  }
});

module.exports = upload;
