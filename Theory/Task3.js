// Task 3: Testing con Base de Datos Real (8 minutos)
// Estrategias para testing que incluyen operaciones de base de datos.

// 🗄️ Configuración de Base de Datos para Testing
// Tres enfoques principales:

// 1. Base de datos en memoria (más rápido):

// test/setup.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false, // Deshabilitar logs en tests
});

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});
// 2. Base de datos dedicada para tests:

// test/setup.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: 'test_db',
  username: 'test_user',
  password: 'test_pass',
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

beforeEach(async () => {
  // Limpiar datos entre tests
  await sequelize.sync({ force: true });
});
// 3. Transacciones para aislamiento:

// test/helpers.js
const { sequelize } = require('../database');

export async function withTransaction(callback) {
  const transaction = await sequelize.transaction();

  try {
    await callback(transaction);
    await transaction.rollback(); // Siempre revertir cambios de test
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

// Uso en test
test('operación compleja con DB', async () => {
  await withTransaction(async (transaction) => {
    // Todas las operaciones dentro de la transacción
    const user = await User.create({ name: 'Test' }, { transaction });
    const post = await Post.create({ userId: user.id, title: 'Test Post' }, { transaction });

    // Verificaciones
    expect(post.userId).toBe(user.id);
  });
  // Transacción revertida automáticamente
});
// Concepto clave: Los tests de DB deben ser aislados y no afectar otros tests.

// 🔄 Testing de Relaciones Complejas
// Testing con joins y relaciones:

// Models
const User = sequelize.define('User', { name: STRING, email: STRING });
const Post = sequelize.define('Post', { title: STRING, content: TEXT });
const Comment = sequelize.define('Comment', { text: TEXT });

// Relaciones
User.hasMany(Post);
Post.belongsTo(User);
Post.hasMany(Comment);
Comment.belongsTo(Post);
User.hasMany(Comment);
Comment.belongsTo(User);

// Test de relaciones
describe('User-Post-Comment relationships', () => {
  test('usuario puede tener múltiples posts con comments', async () => {
    const user = await User.create({ name: 'Juan', email: 'juan@test.com' });
    const post = await Post.create({ title: 'Mi Post', content: 'Contenido', userId: user.id });
    const comment = await Comment.create({
      text: 'Buen post!',
      userId: user.id,
      postId: post.id
    });

    // Verificar relaciones con includes
    const userWithRelations = await User.findByPk(user.id, {
      include: [{
        model: Post,
        include: [Comment]
      }]
    });

    expect(userWithRelations.Posts).toHaveLength(1);
    expect(userWithRelations.Posts[0].Comments).toHaveLength(1);
    expect(userWithRelations.Posts[0].Comments[0].text).toBe('Buen post!');
  });

  test('eliminar usuario cascada posts y comments', async () => {
    const user = await User.create({ name: 'Juan', email: 'juan@test.com' });
    await Post.create({ title: 'Post', content: 'Content', userId: user.id });

    await user.destroy();

    const postsCount = await Post.count();
    const commentsCount = await Comment.count();

    expect(postsCount).toBe(0); // Eliminados en cascada
    expect(commentsCount).toBe(0);
  });
});
// Concepto clave: Tests de integración verifican constraints de integridad referencial.