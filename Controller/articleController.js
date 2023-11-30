const error = require('../Error/error');
const Article = require('../Model/Articles');
const articleService = require('../Services/article');

const postArticle = async (req, res, next) => {
  const { title, image, publication, tags, description, email, name, photo } =
    req.body;
  try {
    const aritcla = await articleService.createNewArtical({
      title,
      image,
      publication,
      tags,
      description,
      email,
      name,
      photo,
    });
    res.status(201).json({ message: 'success' });
  } catch (error) {
    next(error);
  }
};

const getArticles = async (req, res, next) => {
  const {
    email,
    publication,
    tags,
    title,
    sortWay,
    limit,
    isPremium,
    isApprove,
  } = req.query;
  console.log(limit);
  try {
    if (email) {
      const aritcles = await articleService.findArticles(email, sortWay, limit);
      return res.status(200).json(aritcles);
    }
    if (publication) {
      const searchArticles = await articleService.searchArticleByKeyValue(
        'publication',
        publication
      );
      return res.status(200).json(searchArticles);
    }
    if (title) {
      const searchArticles = await articleService.searchArticleByKeyValue(
        'title',
        title
      );
      return res.status(200).json(searchArticles);
    }
    if (tags) {
      const searchArticles = await articleService.searchArticleByKeyValue(
        'tags',
        tags.split(','),
        true
      );
      return res.status(200).json(searchArticles);
    }
    if (isPremium) {
      const searchArticles = await articleService.searchArticleByKeyValue(
        'isPremium',
        isPremium
      );
      return res.status(200).json(searchArticles);
    }
    if (isApprove) {
      // const searchArticles = await articleService.searchArticleByKeyValue(
      //   'isApprove',
      //   isApprove
      // );
      const aritcles = await articleService.findArticles(null, sortWay, limit);
      return res.status(200).json(aritcles);
    }
    const aritcles = await articleService.findArticles(null, sortWay, limit);
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
  const {
    title,
    image,
    publication,
    tags,
    description,
    isApprove,
    isPremium,
    declinemsg,
  } = req.body;
  try {
    const article = await articleService.findArticleByProperty('_id', id);
    if (!article) {
      return res.status(200).json({ error: 'No Article Found' });
    }
    article.title = title ?? article.title;
    article.image = image ?? article.image;
    article.publication = publication ?? article.publication;
    article.tags = tags ?? article.tags;
    article.description = description ?? article.description;
    article.isPremium = isPremium ?? article.isPremium;
    article.isApprove = isApprove ?? article.isApprove;
    article.declinemsg = declinemsg ?? article.declinemsg;
    article.viewCount = article.viewCount + 1;
    await article.save();
    res.status(200).json({ message: 'Update success' });
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
