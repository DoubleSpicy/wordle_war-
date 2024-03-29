const express = require('express');
const router = express.Router();
const resetPasswordController = require('../controllers/resetPasswordController');

router.post('/', resetPasswordController.handleReset);

module.exports = router;