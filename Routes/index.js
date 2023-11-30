const router = require('express').Router();
const userRoutes = require('./user');
const articleRoutes = require('./article');
const adminRoutes = require('./admin');
const publicationRoutes = require('./publication');
const statisticRoutes = require('./statistics');
const paymentRoutes = require('./payment');
const jwtRoutes = require('./jwt');
const verifyUser = require('../Middleware/verifyUser');
const verifyAdmin = require('../Middleware/verifyAdmin');

router.use('/api/v1/users', userRoutes);
router.use('/api/v1/articles', articleRoutes);
router.use('/api/v1/admin', verifyUser, adminRoutes);
router.use('/api/v1/publications', publicationRoutes);
// here I use admin verify middleware
router.use('/api/v1/statistics', statisticRoutes);
router.use('/api/v1/jwt', jwtRoutes);
router.use('/api/v1/payment', paymentRoutes);

module.exports = router;
