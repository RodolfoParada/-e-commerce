const productsStore = require('./products');

let orders = [];
let currentId = 1;

function create(userId, items) {
  if (!userId) throw new Error('Usuario requerido');
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Items inválidos');
  }

  let total = 0;

  const orderItems = items.map(item => {
    const product = productsStore.findById(item.productId);

    if (!product) {
      throw new Error('Producto no existe');
    }

    if (product.stock < item.quantity) {
      throw new Error('Stock insuficiente');
    }

    product.stock -= item.quantity;

    const subtotal = product.price * item.quantity;
    total += subtotal;

    return {
      productId: product.id,
      quantity: item.quantity,
      price: product.price
    };
  });

  const order = {
    id: currentId++,
    userId,
    items: orderItems,
    total,
    status: 'CREATED'
  };

  orders.push(order);
  return order;
}

function findById(id) {
  return orders.find(o => o.id === id);
}

function clear() {
  orders = [];
  currentId = 1;
}

module.exports = {
  create,
  findById,
  clear   // 🔥 ESTA LÍNEA ES LA CLAVE
};
