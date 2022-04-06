const express = require('express');
const router = express.Router();
const activateController = require('../controllers/activateController');

router.post('/user/:hash', activateController.handleActivate);

module.exports = router;