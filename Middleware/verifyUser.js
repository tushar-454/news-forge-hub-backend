require('dotenv').config();
const User = require('../Model/User');
const jwt = require('jsonwebtoken');
const userServices = require('../Services/user');

const verifyUser = async (req, res, next) => {
  try {
    const token = req?.cookies?.token;
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
    }
    const decode = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await userServices.findUserByProperty('email', decode.email);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = decode;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = verifyUser;
