const router = require('express').Router();
const publicationController = require('../Controller/publicationController');

router.get('/', publicationController.getAllPublication);

module.exports = router;
