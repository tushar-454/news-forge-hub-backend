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

module.exports = { createAPublication };
