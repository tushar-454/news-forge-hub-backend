const Article = require('../Model/Articles');

const createNewArtical = ({
  title,
  image,
  publication,
  tags,
  description,
  email,
}) => {
  const aritcle = new Article({
    title,
    image,
    publication,
    tags,
    description,
    email,
    isApprove: 'Pending',
    isPremium: 'NONE',
    viewCount: 0,
  });
  return aritcle.save();
};

const findArticles = (email) => {
  let query = {};
  if (email) query = { email };
  return Article.find(query);
};

const findArticleByProperty = (key, value) => {
  if (key === '_id') {
    return Article.findById(value);
  }
  return Article.findOne({ [key]: value });
};

const deleteArticle = (key, value) => {
  if (key === '_id') {
    return Article.deleteOne({ _id: value });
  }
  if (key === 'email') {
    return Article.deleteMany({ email: value });
  }
  return Article.deleteOne({ [key]: value });
};

module.exports = {
  createNewArtical,
  findArticles,
  findArticleByProperty,
  deleteArticle,
};
