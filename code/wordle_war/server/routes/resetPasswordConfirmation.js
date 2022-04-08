const express = require('express');
const router = express.Router();
const resetPasswordConfirmationController = require('../controllers/resetPasswordConfirmationController');

router.post('/', resetPasswordConfirmationController.handleConfirm);

module.exports = router;