const router = require('express').Router();
const articleController = require('../Controller/articleController');
const verifyPremiumUser = require('../Middleware/verifyPremiumUser');

router.get('/', articleController.getArticles);
router.get('/:id', verifyPremiumUser, articleController.getArticleById);
router.post('/add-article', articleController.postArticle);
router.put('/:id', articleController.putArticle);
router.delete('/', articleController.deleteArticle);

module.exports = router;
