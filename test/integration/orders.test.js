// orders.test.js
const request = require('supertest');
const app = require('../../src/app');
const UserFactory = require('../factories/user.factory');
const ProductFactory = require('../factories/product.factory');
const { generateToken } = require('../helpers/auth');


const productsStore = require('../../src/store/products');
const ordersStore = require('../../src/store/orders');

beforeEach(() => {
  productsStore.clear();
  ordersStore.clear();
});

describe('Orders API', () => {
  it('crear pedido con productos', async () => {
    // test...
  });

  it('no permite pedido sin stock', async () => {
    // test...
  });
});


describe('Orders API', () => {
  test('crear pedido con productos', async () => {
    const user = await UserFactory.create();
    const product = await ProductFactory.create({ stock: 5 });

    const token = generateToken(user);

    const res = await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        items: [{ productId: product.id, quantity: 2 }]
      })
      .expect(201);

    expect(res.body.items).toHaveLength(1);
    expect(res.body.total).toBe(product.price * 2);
  });

  test('no permite pedido sin stock', async () => {
    const user = await UserFactory.create();
    const product = await ProductFactory.create({ stock: 0 });
    const token = generateToken(user);

    await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        items: [{ productId: product.id, quantity: 1 }]
      })
      .expect(400);
  });
});
