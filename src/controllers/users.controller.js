const { User } = require('../models');

module.exports = {
  async register(req, res) {
    const { email, password } = req.body;

    const user = await User.create({
      email,
      password,
      role: 'user'
    });

    res.status(201).json({
      id: user.id,
      email: user.email
    });
  }
};
