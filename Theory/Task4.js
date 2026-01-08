// Task 4: Configuración de Entornos de Testing (7 minutos)
// Organización y configuración para tests de integración eficientes.

// 🏭 Factory Pattern para Datos de Test
// Crear datos de test consistentes:

// test/factories/userFactory.js
const { User } = require('../../models');

class UserFactory {
  static async create(overrides = {}) {
    const defaults = {
      name: 'Usuario Test',
      email: `test${Date.now()}@example.com`, // Email único
      password: 'password123',
      role: 'user',
      active: true
    };

    return await User.create({ ...defaults, ...overrides });
  }

  static async createMany(count, overrides = {}) {
    const users = [];
    for (let i = 0; i < count; i++) {
      users.push(await this.create({
        ...overrides,
        email: `test${Date.now()}_${i}@example.com`
      }));
    }
    return users;
  }

  static async createAdmin(overrides = {}) {
    return await this.create({ ...overrides, role: 'admin' });
  }
}

module.exports = UserFactory;
Uso en tests:

const UserFactory = require('../factories/userFactory');

describe('User permissions', () => {
  let adminUser, regularUser;

  beforeEach(async () => {
    adminUser = await UserFactory.createAdmin();
    regularUser = await UserFactory.create();
  });

  test('admin puede acceder a panel', async () => {
    const response = await request(app)
      .get('/admin/panel')
      .set('Authorization', `Bearer ${generateToken(adminUser)}`)
      .expect(200);
  });

  test('usuario regular no puede acceder a panel admin', async () => {
    const response = await request(app)
      .get('/admin/panel')
      .set('Authorization', `Bearer ${generateToken(regularUser)}`)
      .expect(403);
  });
});
// Concepto clave: Factories crean datos de test consistentes y reutilizables.

// ⚡ Optimización de Tests de Integración
// Configuración global para performance:

// test/setup.js
const { sequelize } = require('../database');

beforeAll(async () => {
  // Crear tablas una sola vez
  await sequelize.sync({ force: true });
}, 60000); // Timeout extendido para setup

afterAll(async () => {
  await sequelize.close();
});

beforeEach(async () => {
  // Limpiar solo datos, no tablas
  const models = Object.values(sequelize.models);
  for (const model of models) {
    await model.destroy({ where: {}, truncate: true });
  }
});
// Tests paralelos inteligentes:

// jest.config.js
module.exports = {
  maxWorkers: '50%', // Usar 50% de cores disponibles
  testTimeout: 10000, // Timeout razonable
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'],

  // Agrupar tests relacionados
  testMatch: [
    '<rootDir>/test/integration/**/*.test.js',
    '<rootDir>/test/unit/**/*.test.js'
  ]
};
// Concepto clave: Configuración óptima acelera ejecución sin sacrificar confiabilidad.