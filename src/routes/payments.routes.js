const express = require('express');
const router = express.Router();
const ordersStore = require('../store/orders');
const auth = require('../middlewares/auth');

router.post('/orders/:id/pay', auth, (req, res) => {
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
