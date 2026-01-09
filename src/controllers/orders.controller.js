const { Order, OrderItem, Product } = require('../models');

module.exports = {
  async create(req, res) {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No items' });
    }

    let total = 0;

    for (const item of items) {
      const product = await Product.findByPk(item.productId);

      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ error: 'Sin stock' });
      }

      total += product.price * item.quantity;
    }

    const order = await Order.create({
      userId: req.user.id,
      total,
      status: 'PENDING'
    });

    for (const item of items) {
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity
      });
    }

    res.status(201).json({
      id: order.id,
      total,
      items
    });
  }
};
