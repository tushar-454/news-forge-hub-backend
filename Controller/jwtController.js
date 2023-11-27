const jwt = require('jsonwebtoken');

const createToken = async (req, res, next) => {
  const { email, role, isPremium, premiumTill } = req.body;
  const payload = { email, role, isPremium, premiumTill };
  try {
    const token = await jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: 60 * 5,
    });
    // TODO: next we are save token in cookie and call this api when user login or singup
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.send({ success: true });
  } catch (error) {
    next(error);
  }
};

const removeToken = async (req, res) => {
  try {
    res.clearCookie('token', {
      maxAge: 0,
      secure: true,
      sameSite: 'none',
    });
    res.send({ success: true });
  } catch (error) {
    next(error);
  }
};

module.exports = { createToken, removeToken };
