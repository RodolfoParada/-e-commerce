const request = require('supertest');
const app = require('../../src/app');
const UserFactory = require('../factories/user.factory');
const { generateToken } = require('../helpers/auth');

describe('Products API', () => {
  test('solo admin puede crear producto', async () => {
    const admin = await UserFactory.createAdmin();
    const token = generateToken(admin);

    const res = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Laptop', price: 900000, stock: 5 })
      .expect(201);

    expect(res.body.name).toBe('Laptop');
  });
});
