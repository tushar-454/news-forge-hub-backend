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
  publisher: {
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
    type: Boolean,
    require: true,
    default: false,
  },
  isPremium: {
    type: Boolean,
    require: true,
    default: false,
  },
});

const Article = model('Article', articleSchema, 'articles');

module.exports = Article;
