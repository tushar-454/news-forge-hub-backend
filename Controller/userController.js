const userServices = require('../Services/user');

const getUsers = async (req, res, next) => {
  /**
   * TODO: filter, sort, pagination, select
   */
  try {
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
