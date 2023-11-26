const Publication = require('../Model/Publication');

const createAPublication = (email, name, logo, isApprove) => {
  const publication = new Publication({
    publicationEmail: email,
    publicationName: name,
    publicationLogo: logo,
    isApprove,
  });
  return publication.save();
};

const getPublicationByProperty = (key, value) => {
  if (key === 'isApprove') {
    return Publication.find({ isApprove: value });
  }
  return Publication.findOne({ [key]: value });
};

const getPublication = () => {
  return Publication.find();
};

module.exports = {
  createAPublication,
  getPublicationByProperty,
  getPublication,
};
