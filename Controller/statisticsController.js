const Article = require('../Model/Articles');
const User = require('../Model/User');

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
          _id: '$publication',
          articlesCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          publication: '$_id',
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

const usersStatistics = async (req, res, next) => {
  try {
    const usersStatistics = await User.aggregate([
      {
        $group: {
          _id: '$isPremium',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          isPremium: '$_id',
          count: 1,
        },
      },
    ]);
    const totalUser = usersStatistics.reduce((acc, cur) => acc + cur.count, 0);
    res.status(200).json({ totalUser, usersStatistics });
  } catch (error) {
    next(error);
  }
};

const articleStatistics = async (req, res, next) => {
  const { approvedType } = req.query;
  try {
    const articleStatistics = await Article.aggregate([
      {
        $match: {
          isApprove: approvedType,
        },
      },
      {
        $group: {
          _id: '$isPremium',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          isPremium: '$_id',
          count: 1,
        },
      },
    ]);
    const totalArticls = articleStatistics.reduce(
      (acc, cur) => acc + cur.count,
      0
    );
    res.status(200).json({ totalArticls, articleStatistics });
  } catch (error) {
    next(error);
  }
};

module.exports = { publicationStatistics, usersStatistics, articleStatistics };
