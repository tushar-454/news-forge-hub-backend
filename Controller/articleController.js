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
  try {
    const aritcles = await articleService.findArticle();
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

module.exports = { postArticle, getArticles, getArticleById };
