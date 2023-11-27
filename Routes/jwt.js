const router = require('express').Router();
const jwtController = require('../Controller/jwtController');

router.post('/token', jwtController.createToken);
router.post('/token-remove', jwtController.removeToken);

module.exports = router;
