const verifyAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Forbidden access' });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = verifyAdmin;
