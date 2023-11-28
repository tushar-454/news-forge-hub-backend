const userServices = require('../Services/user');
const articleServices = require('../Services/article');
const publicationServices = require('../Services/publication');
const error = require('../Error/error');
const Article = require('../Model/Articles');

const getUsers = async (req, res, next) => {
  const { page, limit } = req.query;
  /**
   * TODO: filter, sort, pagination, select
   */

  if (page && limit) {
    const skip = page * limit;
    const requireUsers = await userServices.getUserWithSkipLimit(skip, limit);
    return res.status(200).json(requireUsers);
  }

  const { email, isPremium } = req.query;
  try {
    if (email) {
      const user = await userServices.findUserByProperty('email', email);
      return res.status(200).json(user);
    }
    if (isPremium) {
      const premiumUsers = await userServices.findUsersByProperty(
        'isPremium',
        !!isPremium
      );
      return res.status(200).json(premiumUsers);
    }
    const users = await userServices.findUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const patchUser = async (req, res, next) => {
  const email = req.params.email;
  const { role, isPremium, premiumTill } = req.body;
  try {
    const user = await userServices.findUserByProperty('email', email);
    if (!user) {
      throw error('User not found !', 404);
    }

    user.role = role ?? user.role;
    user.isPremium = isPremium ?? user.isPremium;
    user.premiumTill =
      premiumTill === null ? null : premiumTill ?? user.premiumTill;
    await user.save();
    return res.status(200).json({ message: 'update success' });
  } catch (error) {
    next(error);
  }
};

const patchArticle = async (req, res, next) => {
  const id = req.params.id;
  const { isApprove, isPremium } = req.body;
  try {
    const article = await articleServices.findArticleByProperty('_id', id);
    if (!article) {
      throw error('Article not found !', 404);
    }

    article.isApprove = isApprove ?? article.isApprove;
    article.isPremium = isPremium ?? article.isPremium;
    await article.save();
    return res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};

const addPublication = async (req, res, next) => {
  const { publicationEmail, publicationName, publicationLogo } = req.body;
  if (!publicationEmail || !publicationName || !publicationLogo) {
    return res.status(401).json({ message: 'Something is wrong' });
  }
  try {
    const publication = await publicationServices.getPublicationByProperty(
      'publicationEmail',
      publicationEmail
    );
    if (publication) {
      return res
        .status(200)
        .json({ error: 'By this Email One Publication exists.' });
    }
    const createPublication = await publicationServices.createAPublication(
      publicationEmail,
      publicationName,
      publicationLogo,
      'Approved'
    );
    res.status(200).json({ message: 'Publication Created' });
  } catch (error) {
    next(error);
  }
};

const getPublication = async (req, res, next) => {
  const { email } = req.query;
  try {
    if (email) {
      const publication = await publicationServices.getPublicationByProperty(
        'email',
        email
      );
      return res.status(200).json(publication);
    }
    const publications = await publicationServices.getPublication();
    return res.status(200).json(publications);
  } catch (error) {
    next(error);
  }
};

const updatePublication = async (req, res, next) => {
  const id = req.params.id;
  const { publicationEmail, publicationName, publicationLogo, isApprove } =
    req.body;
  try {
    const publication = await publicationServices.getPublicationByProperty(
      '_id',
      id
    );
    if (!publication) {
      throw error('No publication found', 404);
    }
    publication.publicationEmail =
      publicationEmail ?? publication.publicationEmail;
    publication.publicationLogo =
      publicationLogo ?? publication.publicationLogo;
    publication.publicationName =
      publicationName ?? publication.publicationName;
    publication.isApprove = isApprove ?? publication.isApprove;
    const updatePublication = await publication.save();
    res.status(200).json(updatePublication);
  } catch (error) {
    next(error);
  }
};

const deletePublication = async (req, res, next) => {
  const id = req.params.id;
  try {
    const publication = await publicationServices.getPublicationByProperty(
      '_id',
      id
    );
    if (!publication) {
      return res.status(200).json({ error: 'Publication not found' });
    }
    await publicationServices.deletePublication(id);
    res.status(201).json({ message: 'Delete successfully' });
  } catch (error) {
    next(error);
  }
};

const getArticles = async (req, res, next) => {
  const { page, limit } = req.query;
  try {
    const skip = page * limit;
    const requireArticle = await articleServices.getArticleWithSkipLimit(
      skip,
      limit
    );
    res.status(200).json(requireArticle);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  patchUser,
  patchArticle,
  addPublication,
  getPublication,
  updatePublication,
  deletePublication,
  getArticles,
};
