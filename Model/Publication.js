const { model, Schema } = require('mongoose');

const publicationSchema = new Schema({
  publicationName: {
    type: String,
    require: true,
  },
  logo: {
    type: String,
    require: true,
  },
});

const Publication = model('Publications', publicationSchema, 'publications');

module.exports = Publication;
