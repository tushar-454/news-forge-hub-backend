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

const deletePublication = (id) => {
  return Publication.deleteOne({ _id: id });
};

module.exports = {
  createAPublication,
  getPublicationByProperty,
  getPublication,
  deletePublication,
};
