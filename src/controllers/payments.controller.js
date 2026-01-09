const { Order } = require('../models');

module.exports = {
  async pay(req, res) {
    const { orderId } = req.params;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = 'PAID';
    await order.save();

    res.json(order);
  }
};
