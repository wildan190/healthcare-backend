const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const sequelize = require('../config/database');
const User = require('./models/User');
const Product = require('./models/Product');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Sync database
sequelize.sync({ force: false }).then(() => {
  console.log('Database connected and synced');
});

module.exports = app;
