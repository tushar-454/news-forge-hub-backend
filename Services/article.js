const Article = require('../Model/Articles');

const createNewArtical = ({
  title,
  image,
  publisher,
  tags,
  description,
  email,
}) => {
  const aritcle = new Article({
    title,
    image,
    publisher,
    tags,
    description,
    email,
    isApprove: false,
    isPremium: false,
  });
  return aritcle.save();
};

const findArticle = () => {
  return Article.find();
};

const findArticleByProperty = (key, value) => {
  if (key === '_id') {
    return Article.findById(value);
  }
  return Article.findOne({ [key]: value });
};

module.exports = { createNewArtical, findArticle, findArticleByProperty };
