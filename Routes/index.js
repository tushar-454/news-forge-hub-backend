const router = require('express').Router();
const userRoutes = require('./user');
const articleRoutes = require('./article');

router.use('/api/v1/users', userRoutes);
router.use('/api/v1/articles', articleRoutes);

module.exports = router;
