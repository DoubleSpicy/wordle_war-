const express = require('express');
const router = express.Router();
const userChangePassword = require('../controllers/userChangePasswordController');

router.post('/', userChangePassword.handleChangePassword);

module.exports = router;