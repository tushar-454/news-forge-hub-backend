const articleService = require('../Services/article');

const postArticle = async (req, res, next) => {
  const { title, image, publisher, tags, description, email } = req.body;
  try {
    await articleService.createNewArtical({
      title,
      image,
      publisher,
      tags,
      description,
      email,
    });
    res.status(201).json({ message: 'success' });
  } catch (error) {
    next(error);
  }
};

const getArticles = async (req, res, next) => {
  const email = req.query.email;
  try {
    if (email) {
      const aritcles = await articleService.findArticles(email);
      return res.status(200).json(aritcles);
    }
    const aritcles = await articleService.findArticles();
    res.status(200).json(aritcles);
  } catch (error) {
    next(error);
  }
};

const getArticleById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const aritcle = await articleService.findArticleByProperty('_id', id);
    res.status(200).json(aritcle);
  } catch (error) {
    next(error);
  }
};

const putArticle = async (req, res, next) => {
  const id = req.params.id;
  const { title, image, publisher, tags, description, email } = req.body;
  try {
    const article = await articleService.findArticleByProperty('_id', id);
    if (!article) {
      new Error('No Article Found', 404);
    }
    article.title = title ?? article.title;
    article.image = image ?? article.image;
    article.publisher = publisher ?? article.publisher;
    article.tags = tags ?? article.tags;
    article.description = description ?? article.description;
    await article.save();
    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};

module.exports = { postArticle, getArticles, getArticleById, putArticle };
