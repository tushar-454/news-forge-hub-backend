const User = require('../Model/User');
const userServices = require('../Services/user');

const getUsers = async (req, res, next) => {
  /**
   * TODO: filter, sort, pagination, select
   */
  const { email } = req.query;
  try {
    if (email) {
      const user = await userServices.findUserByProperty('email', email);
      return res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
};

const postUser = async (req, res, next) => {
  const { name, email, role, isPremium, premiumTill } = req.body;
  try {
    const user = await userServices.createNewUser({
      name,
      email,
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
  const email = req.params.email;
  try {
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
