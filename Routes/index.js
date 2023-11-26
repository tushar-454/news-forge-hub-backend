const router = require('express').Router();
const userRoutes = require('./user');
const articleRoutes = require('./article');
const adminRoutes = require('./admin');
const publicationRoutes = require('./publication');

router.use('/api/v1/users', userRoutes);
router.use('/api/v1/articles', articleRoutes);
router.use('/api/v1/admin', adminRoutes);
router.use('/api/v1/publications', publicationRoutes);

module.exports = router;
