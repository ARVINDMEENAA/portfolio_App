const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const upload = require('../middleware/upload');
const processImage = require('../middleware/imageProcessor');

router.post('/', upload.single('image'), processImage, clientController.createClient);
router.get('/', clientController.getAllClients);
router.delete('/:id', clientController.deleteClient);

module.exports = router;
