const express = require('express');
const router = express.Router();
const uploadImage = require('../controllers/uploadImage');

router.post('/', uploadImage.handleUploadImage);

module.exports = router;
