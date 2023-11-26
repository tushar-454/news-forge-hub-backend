const router = require('express').Router();
const statisticsController = require('../Controller/statisticsController');

router.get('/publications', statisticsController.publicationStatistics);

module.exports = router;
