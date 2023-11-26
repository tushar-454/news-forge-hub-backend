const router = require('express').Router();
const adminController = require('../Controller/adminController');

router.get('/users', adminController.getUsers);
router.patch('/users/:email', adminController.patchUser);
router.patch('/articles/:id', adminController.patchArticle);

module.exports = router;
