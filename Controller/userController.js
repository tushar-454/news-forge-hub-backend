const error = require('../Error/error');
const User = require('../Model/User');
const userServices = require('../Services/user');

const getUsers = async (req, res, next) => {
  const { email: tokenEmail } = req.user;
  const { email } = req.query;
  try {
    if (tokenEmail !== email) {
      throw error('Forbidden access', 403);
    }
    if (email) {
      const user = await userServices.findUserByProperty('email', email);
      return res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
};

const postUser = async (req, res, next) => {
  const { name, email, photo, role, isPremium, premiumTill } = req.body;
  try {
    const isExists = await userServices.findUserByProperty('email', email);
    if (isExists) {
      throw error('User already exists!', 400);
    }
    const user = await userServices.createNewUser({
      name,
      email,
      photo,
      role,
      isPremium,
      premiumTill,
    });
    res.status(201).json({ message: 'create suceess' });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { email: tokenEmail } = req.user;
  const email = req.params.email;
  try {
    if (tokenEmail !== email) {
      throw error('Forbidden Access', 403);
    }
    const user = await userServices.findUserByProperty('email', email);
    await User.deleteOne(user);
    res.status(200).json({ message: 'Delete successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  postUser,
  deleteUser,
};
