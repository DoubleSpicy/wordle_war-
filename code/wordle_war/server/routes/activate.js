const express = require('express');
const router = express.Router();
const activateController = require('../controllers/activateController');

router.get('/user/:hash', activateController.handleActivate);

module.exports = router;