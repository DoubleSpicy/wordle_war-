const express = require('express');
const router = express.Router();
const gameController = require('../../controllers/gameController');

///:player2
router.route('/:player1')
    .get(gameController.createNewGameRoom);

module.exports = router;