require('dotenv').config();
const User = require('../Model/User');
const jwt = require('jsonwebtoken');
const userServices = require('../Services/user');

const verifyPremiumUser = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization;
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
    }
    const decode = jwt.verify(token?.split(' ')[1], process.env.TOKEN_SECRET);
    const user = await userServices.findUserByProperty('email', decode.email);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (!user.isPremium) {
      return res.status(403).json({ message: 'Forbidden access' });
    }
    req.user = decode;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = verifyPremiumUser;
