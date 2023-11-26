const router = require('express').Router();
const articleController = require('../Controller/articleController');

router.get('/articles', articleController.getArticles);
router.get('/article/:id', articleController.getArticleById);
router.post('/add-article', articleController.postArticle);

module.exports = router;
