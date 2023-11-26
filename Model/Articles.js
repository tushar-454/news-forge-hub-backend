const { model, Schema } = require('mongoose');

const articleSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  publication: {
    type: String,
    require: true,
  },
  tags: {
    type: [String],
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  isApprove: {
    type: String,
    require: true,
    default: 'Pending',
  },
  isPremium: {
    type: String,
    require: true,
    default: 'Pending',
  },
  viewCount: {
    type: Number,
    require: true,
    default: 0,
  },
});

const Article = model('Article', articleSchema, 'articles');

module.exports = Article;
