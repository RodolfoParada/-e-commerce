//payments.test.js
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

describe('Payments API', () => {
  it('pagar pedido cambia estado a PAID', async () => {
    // test...
  });
});


describe('Payments API', () => {
  test('pagar pedido cambia estado a PAID', async () => {
    const user = await UserFactory.create();
    const product = await ProductFactory.create();
    const token = generateToken(user);

    const orderRes = await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        items: [{ productId: product.id, quantity: 1 }]
      });

    const paymentRes = await request(app)
      .post(`/orders/${orderRes.body.id}/pay`)
      .set('Authorization', `Bearer ${token}`)
      .send({ method: 'credit_card' })
      .expect(200);

    expect(paymentRes.body.status).toBe('PAID');
  });

  test('no permite pagar dos veces', async () => {
    // mismo flujo → segundo pago retorna 409
  });
});
