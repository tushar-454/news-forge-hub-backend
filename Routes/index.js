const router = require('express').Router();
const userRoutes = require('./user');
const articleRoutes = require('./article');
const adminRoutes = require('./admin');

router.use('/api/v1/users', userRoutes);
router.use('/api/v1/articles', articleRoutes);
router.use('/api/v1/admin', adminRoutes);

module.exports = router;
