const request = require('supertest');
const app = require('../../src/app');

describe('Users API', () => {
  test('registro de usuario', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        name: 'Juan',
        email: 'juan@test.com',
        password: 'password123'
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body).not.toHaveProperty('password');
  });
});
