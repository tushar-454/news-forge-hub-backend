const User = require('../Model/User');

const findUserByProperty = (key, value) => {
  if (key === '_id') {
    return User.findById(value);
  }
  return User.findOne({ [key]: value });
};

const findUsersByProperty = (key, value) => {
  return User.find({ [key]: value });
};

const findUsers = () => {
  return User.find();
};

const createNewUser = ({ name, email, role, isPremium, premiumTill }) => {
  const user = new User({
    name,
    email,
    role: role ? role : 'USER',
    isPremium: false,
    premiumTill: premiumTill ? premiumTill : null,
  });
  return user.save();
};

const getUserWithSkipLimit = (skip, limit) => {
  const requireUsers = User.find().skip(parseInt(skip)).limit(parseInt(limit));
  return requireUsers;
};

module.exports = {
  findUserByProperty,
  findUsers,
  createNewUser,
  findUsersByProperty,
  getUserWithSkipLimit,
};
