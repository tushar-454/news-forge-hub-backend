const User = require('../Model/User');
const userServices = require('../Services/user');

const getUsers = async (req, res, next) => {
  /**
   * TODO: filter, sort, pagination, select
   */
  const { email, isPremium } = req.query;
  try {
    if (email) {
      const user = await userServices.findUserByProperty('email', email);
      return res.status(200).json(user);
    }
    if (isPremium) {
      const premiumUsers = await userServices.findUsersByProperty(
        'isPremium',
        !!isPremium
      );
      return res.status(200).json(premiumUsers);
    }
    const users = await userServices.findUsers();
    res.status(200).json(users);
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

const patchUser = async (req, res, next) => {
  const email = req.params.email;
  const { role, isPremium, premiumTill } = req.body;
  try {
    const user = await userServices.findUserByProperty('email', email);
    if (!user) {
      throw error('User not found !', 400);
    }
    let updateRole;
    if (!user.role.includes(role)) {
      updateRole = [...user.role, role];
    } else if (role === 'USER') {
      updateRole = ['USER'];
    } else if (role === 'ADMIN') {
      updateRole = ['ADMIN'];
    }
    user.role = updateRole;
    user.isPremium = isPremium ?? user.isPremium;
    user.premiumTill =
      premiumTill === null ? null : premiumTill ?? user.premiumTill;
    await user.save();
    return res.status(200).json(user);
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
  patchUser,
  deleteUser,
};
