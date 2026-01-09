let productId = 1;
let orderId = 1;
let paymentId = 1;

class Product {
  static async create(data) {
    return {
      id: productId++,
      ...data
    };
  }
}

class Order {
  static async create(data) {
    return {
      id: orderId++,
      status: 'pending',
      ...data
    };
  }
}

class Payment {
  static async create(data) {
    return {
      id: paymentId++,
      status: 'paid',
      ...data
    };
  }
}

module.exports = {
  Product,
  Order,
  Payment
};
