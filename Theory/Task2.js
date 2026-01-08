// Task 2: Testing de APIs REST con Supertest (7 minutos)
// Herramientas y patrones para testing de endpoints HTTP completos.

// 🧪 Supertest para Testing de APIs
// Configuración básica:

// app.test.js
const request = require('supertest');
const { app, server } = require('./app'); // Tu app Express
const { sequelize } = require('./database'); // Tu conexión DB

beforeAll(async () => {
  // Configurar DB de test
  await sequelize.sync({ force: true }); // Recrear tablas
});

afterAll(async () => {
  await server.close();
  await sequelize.close();
});

describe('POST /users', () => {
  test('crea usuario correctamente', async () => {
    const userData = {
      name: 'Juan Pérez',
      email: 'juan@test.com',
      password: 'password123'
    };

    const response = await request(app)
      .post('/users')
      .send(userData)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(userData.name);
    expect(response.body.email).toBe(userData.email);
    expect(response.body).not.toHaveProperty('password'); // No devolver password
  });

  test('valida campos requeridos', async () => {
    const response = await request(app)
      .post('/users')
      .send({}) // Sin datos
      .expect(400);

    expect(response.body.errors).toContain('Name is required');
    expect(response.body.errors).toContain('Email is required');
  });

  test('previene emails duplicados', async () => {
    // Crear primer usuario
    await request(app)
      .post('/users')
      .send({ name: 'Juan', email: 'juan@test.com', password: 'pass' })
      .expect(201);

    // Intentar crear segundo con mismo email
    const response = await request(app)
      .post('/users')
      .send({ name: 'Pedro', email: 'juan@test.com', password: 'pass' })
      .expect(409);

    expect(response.body.error).toMatch(/email.*exists/i);
  });
});
// Concepto clave: Supertest permite testing HTTP completo sin servidor real corriendo.

