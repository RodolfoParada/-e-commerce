const express = require('express');
const router = express.Router();

const productsStore = require('../store/products');
const auth = require('../middlewares/auth');

router.post('/', auth, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.sendStatus(403);
  }

  const { name, price, stock } = req.body;

  if (!name || !price || stock === undefined) {
    return res.status(400).json({ message: 'Datos incompletos' });
  }

  const product = productsStore.create({ name, price, stock });

  res.status(201).json(product);
});

module.exports = router;


