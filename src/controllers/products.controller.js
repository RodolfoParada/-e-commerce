const { Product } = require('../models');

module.exports = {
  async create(req, res) {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const product = await Product.create(req.body);

    res.status(201).json(product);
  }
};
