const User = require('../Model/User');

const findUserByProperty = (key, value) => {
  if (key === '_id') {
    return User.findById(value);
  }
  return User.findOne({ [key]: value });
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

module.exports = {
  findUserByProperty,
  findUsers,
  createNewUser,
};
