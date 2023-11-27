const router = require('express').Router();
const jwtController = require('../Controller/jwtController');

router.get('/token', jwtController.createToken);

module.exports = router;
