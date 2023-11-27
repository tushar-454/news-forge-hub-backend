const router = require('express').Router();
const adminController = require('../Controller/adminController');

router.get('/users', adminController.getUsers);
router.get('/articles', adminController.getArticles);
router.patch('/users/:email', adminController.patchUser);
router.patch('/articles/:id', adminController.patchArticle);
router.post('/addPublication', adminController.addPublication);
router.get('/getPublication', adminController.getPublication);
router.patch('/updatePublication/:id', adminController.updatePublication);
router.delete('/deletePublication/:id', adminController.deletePublication);

module.exports = router;
