const express = require('express');

const usersRoutes = require('./routes/users.routes');
const productsRoutes = require('./routes/products.routes');
const ordersRoutes = require('./routes/orders.routes');
const paymentsRoutes = require('./routes/payments.routes');

const app = express();
app.use(express.json());

app.use('/users', usersRoutes);
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);
app.use('/payments', paymentsRoutes);

module.exports = app;
