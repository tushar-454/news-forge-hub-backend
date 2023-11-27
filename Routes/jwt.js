const router = require('express').Router();
const jwtController = require('../Controller/jwtController');

router.post('/token', jwtController.createToken);

module.exports = router;
