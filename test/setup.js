require('dotenv').config({ path: '.env.test' });
const { sequelize } = require('../src/database');

beforeAll(async () => {
  await sequelize.sync({ force: true });
}, 60000);

beforeEach(async () => {
  for (const model of Object.values(sequelize.models)) {
    await model.destroy({ where: {}, truncate: true, cascade: true });
  }
});

afterAll(async () => {
  await sequelize.close();
});
