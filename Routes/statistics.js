const router = require('express').Router();
const statisticsController = require('../Controller/statisticsController');

router.get('/publications', statisticsController.publicationStatistics);
router.get('/users', statisticsController.usersStatistics);
router.get('/aritcles', statisticsController.articleStatistics);

module.exports = router;
