const router = require('express').Router();
const articleController = require('../Controller/articleController');

router.get('/', articleController.getArticles);
router.get('/:id', articleController.getArticleById);
router.post('/add-article', articleController.postArticle);
router.put('/:id', articleController.putArticle);

module.exports = router;
