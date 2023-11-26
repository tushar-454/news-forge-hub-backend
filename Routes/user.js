const router = require('express').Router();
const User = require('../Model/User');
const userController = require('../Controller/userController');
const articleController = require('../Controller/articleController');

router.get('/', userController.getUsers);
router.get('/articles', articleController.getArticles);
router.get('/article/:id', articleController.getArticleById);
router.post('/', userController.postUser);
router.post('/add-article', articleController.postArticle);

module.exports = router;
