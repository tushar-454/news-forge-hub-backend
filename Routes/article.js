const router = require('express').Router();
const articleController = require('../Controller/articleController');
const verifyPremiumUser = require('../Middleware/verifyPremiumUser');
const verifyUser = require('../Middleware/verifyUser');

router.get('/', articleController.getArticles);
router.get('/:id', verifyUser, articleController.getArticleById);
router.post('/add-article', verifyUser, articleController.postArticle);
router.put('/:id', verifyUser, articleController.putArticle);
router.delete('/', verifyUser, articleController.deleteArticle);

module.exports = router;
