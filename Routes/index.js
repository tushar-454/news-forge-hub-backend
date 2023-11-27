const router = require('express').Router();
const userRoutes = require('./user');
const articleRoutes = require('./article');
const adminRoutes = require('./admin');
const publicationRoutes = require('./publication');
const statisticRoutes = require('./statistics');
const jwtRoutes = require('./jwt');

router.use('/api/v1/users', userRoutes);
router.use('/api/v1/articles', articleRoutes);
router.use('/api/v1/admin', adminRoutes);
router.use('/api/v1/publications', publicationRoutes);
router.use('/api/v1/statistics', statisticRoutes);
router.use('/api/v1/jwt', jwtRoutes);

module.exports = router;
