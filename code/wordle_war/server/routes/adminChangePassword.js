const express = require('express');
const router = express.Router();
const adminChangePassword = require('../controllers/adminChangePasswordController');

router.post('/', adminChangePassword.handleChangePassword);

module.exports = router;