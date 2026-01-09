const app = require('./app');
const { sequelize } = require('./database');

const PORT = process.env.PORT || 3000;

(async () => {
  await sequelize.authenticate();
  console.log('DB connected');

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
