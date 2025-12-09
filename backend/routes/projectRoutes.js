const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const upload = require('../middleware/upload');
const processImage = require('../middleware/imageProcessor');

router.post('/', upload.single('image'), processImage, projectController.createProject);
router.get('/', projectController.getAllProjects);
router.delete('/:id', projectController.deleteProject);

module.exports = router;
