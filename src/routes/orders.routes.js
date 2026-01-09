const express = require('express');
const router = express.Router();

const ordersStore = require('../store/orders');
const auth = require('../middlewares/auth');

// Crear pedido
router.post('/', auth, (req, res) => {
  try {
    const order = ordersStore.create(req.user.id, req.body.items);
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Pagar pedido ✅ (ESTA ERA LA RUTA FALTANTE)
router.post('/:id/pay', auth, (req, res) => {
  const order = ordersStore.findById(Number(req.params.id));

  if (!order) {
    return res.sendStatus(404);
  }

  if (order.status === 'PAID') {
    return res.sendStatus(409);
  }

  order.status = 'PAID';

  res.json(order);
});

module.exports = router;
