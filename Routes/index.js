const router = require('express').Router();
const userRoutes = require('./user');

router.use('/api/v1/users', userRoutes);

module.exports = router;
