const Article = require('../Model/Articles');

const publicationStatistics = async (req, res, next) => {
  const { approvedType } = req.query;
  try {
    const publicationStatistics = await Article.aggregate([
      {
        $match: {
          isApprove: approvedType,
        },
      },
      {
        $group: {
          _id: '$publisher',
          articlesCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          publisher: '$_id',
          articlesCount: 1,
        },
      },
    ]);
    const totalArticls = publicationStatistics.reduce(
      (acc, cur) => cur.articlesCount + acc,
      0
    );
    res.status(200).json({ total: totalArticls, publicationStatistics });
  } catch (error) {
    next(error);
  }
};

module.exports = { publicationStatistics };
