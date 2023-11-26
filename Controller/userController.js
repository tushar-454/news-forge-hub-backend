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
    res.status(201).json({ message: 'suceess' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  postUser,
};
