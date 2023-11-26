const publicationService = require('../Services/publication');

const getAllPublication = async (req, res, next) => {
  try {
    const publications = await publicationService.getPublication();
    res.status(200).json(publications);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllPublication };
