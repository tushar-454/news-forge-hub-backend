const error = require('../Error/error');
const articleService = require('../Services/article');

const postArticle = async (req, res, next) => {
  const { title, image, publication, tags, description, email } = req.body;
  try {
    const aritcla = await articleService.createNewArtical({
      title,
      image,
      publication,
      tags,
      description,
      email,
    });
    console.log(aritcla);
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
  const { title, image, publication, tags, description, isPremium } = req.body;
  try {
    const article = await articleService.findArticleByProperty('_id', id);
    if (!article) {
      throw error('No Article Found', 404);
    }
    article.title = title ?? article.title;
    article.image = image ?? article.image;
    article.publication = publication ?? article.publication;
    article.tags = tags ?? article.tags;
    article.description = description ?? article.description;
    article.isPremium = isPremium === 'Pending' ? 'Pending' : article.isPremium;
    article.viewCount = article.viewCount + 1;
    await article.save();
    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};

const deleteArticle = async (req, res, next) => {
  const { id, email } = req.query;
  try {
    if (email) {
      await articleService.deleteArticle('email', email);
      return res
        .status(200)
        .json({ message: `Delete all article based on ${email}` });
    }
    await articleService.deleteArticle('_id', id);
    res.status(200).json({ message: 'Successfully Deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postArticle,
  getArticles,
  getArticleById,
  putArticle,
  deleteArticle,
};
