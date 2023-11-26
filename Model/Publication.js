const { model, Schema } = require('mongoose');

const publicationSchema = new Schema({
  publicationEmail: {
    type: String,
    require: true,
  },
  publicationName: {
    type: String,
    require: true,
  },
  publicationLogo: {
    type: String,
    require: true,
  },
  isApprove: {
    type: String,
    require: true,
  },
});

const Publication = model('Publications', publicationSchema, 'publications');

module.exports = Publication;
