const userServices = require('../Services/user');
const articleServices = require('../Services/article');
const publicationServices = require('../Services/publication');

const getUsers = async (req, res, next) => {
  /**
   * TODO: filter, sort, pagination, select
   */
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
    let updateRole;
    if (!user.role.includes(role)) {
      updateRole = [...user.role, role];
    } else if (role === 'USER') {
      updateRole = ['USER'];
    } else if (role === 'ADMIN') {
      updateRole = ['ADMIN'];
    }
    user.role = updateRole;
    user.isPremium = isPremium ?? user.isPremium;
    user.premiumTill =
      premiumTill === null ? null : premiumTill ?? user.premiumTill;
    await user.save();
    return res.status(200).json(user);
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
      'email',
      publicationEmail
    );
    if (publication) {
      new Error('By this Email One Publication exists.', 401);
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

module.exports = {
  getUsers,
  patchUser,
  patchArticle,
  addPublication,
  getPublication,
};
