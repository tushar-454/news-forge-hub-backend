const router = require('express').Router();
const User = require('../Model/User');

router.get('/user', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({ message: 'hello', user: users });
  } catch (err) {
    console.log(err.message);
  }
});
router.post('/user', async (req, res) => {
  const { name, age } = req.body;
  try {
    const user = new User({
      name,
      age,
    });
    const result = await user.save();
    res.status(200).send(result);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
