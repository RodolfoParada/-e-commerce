const productsStore = require('../../src/store/products');

class ProductFactory {
  static async create(overrides = {}) {
    return productsStore.create({
      name: 'Producto Test',
      price: 10000,
      stock: 10,
      ...overrides
    });
  }
}

module.exports = ProductFactory;
