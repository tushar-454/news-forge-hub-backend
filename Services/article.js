const Article = require('../Model/Articles');

const createNewArtical = ({
  title,
  image,
  publication,
  tags,
  description,
  email,
  name,
  photo,
}) => {
  const aritcle = new Article({
    title,
    image,
    publication,
    tags,
    description,
    email,
    name,
    photo,
    date: new Date(),
    isApprove: 'Pending',
    isPremium: 'NONE',
    viewCount: 0,
    declinemsg: '',
  });
  return aritcle.save();
};

const findArticles = (email, sortWay, limit) => {
  let query = {};
  if (email) query = { email };
  if (sortWay === 'desc') {
    return Article.find({ isApprove: 'Approved', ...query })
      .sort({ viewCount: -1 })
      .limit(limit);
  }
  if (sortWay === 'asc') {
    return Article.find({ isApprove: 'Approved', ...query })
      .sort({ viewCount: 1 })
      .limit(limit);
  }
  return Article.find(query).limit(parseInt(limit));
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

const searchArticleByKeyValue = (key, value, isArray = false) => {
  if (isArray) {
    const smallerTagsArr = value.map((item) => new RegExp(item, 'i'));
    const query = { [key]: { $in: smallerTagsArr } };
    return Article.find(query);
  }
  const searchQuery = {
    $or: [{ [key]: { $regex: value, $options: 'i' } }],
  };
  return Article.find(searchQuery);
};

const getArticleWithSkipLimit = (skip, limit) => {
  const requireArticle = Article.find()
    .skip(parseInt(skip))
    .limit(parseInt(limit));
  return requireArticle;
};

module.exports = {
  createNewArtical,
  findArticles,
  findArticleByProperty,
  deleteArticle,
  searchArticleByKeyValue,
  getArticleWithSkipLimit,
};
