const express = require('express');
const router = express.Router();
const gameController = require('../../controllers/gameController');

//
router.route('/:player1')
    .get(gameController.getWordfromRating);

router.route('/rating/update')
    .post(gameController.updateRating);

module.exports = router;