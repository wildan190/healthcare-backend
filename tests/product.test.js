const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../config/database');
const User = require('../src/models/User');
const Product = require('../src/models/Product');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let token;

// Setup sebelum semua tes dijalankan
beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Buat user untuk login
  const hashedPassword = await bcrypt.hash('password123', 10);
  await User.create({ name: 'John Doe', username: 'johndoe', email: 'johndoe@example.com', password: hashedPassword });

  // Login untuk mendapatkan token
  const res = await request(app)
    .post('/api/auth/login')
    .send({ username: 'johndoe', password: 'password123' });

  token = res.body.token;
});

// Tutup koneksi setelah semua tes selesai
afterAll(async () => {
  await sequelize.close();
});

describe('Product CRUD API with Authentication', () => {
  let productId;

  // Test untuk membuat produk baru dengan token
  it('should create a new product', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Face Mask',
        sku: 'FM12345',
        image: 'https://example.com/image.jpg',
        price: 10.5,
        description: 'High-quality face mask',
        category: 'PPE',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.product).toHaveProperty('id');
    expect(res.body.product.name).toBe('Face Mask');
    productId = res.body.product.id;
  });

  // Test untuk mendapatkan semua produk dengan token
  it('should fetch all products', async () => {
    const res = await request(app)
      .get('/api/products')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  // Test untuk mendapatkan produk berdasarkan ID dengan token
  it('should fetch a product by ID', async () => {
    const res = await request(app)
      .get(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', productId);
  });

  // Test untuk memperbarui produk dengan token
  it('should update a product', async () => {
    const res = await request(app)
      .put(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated Face Mask',
        price: 12.0,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.product.name).toBe('Updated Face Mask');
    expect(res.body.product.price).toBe(12.0);
  });

  // Test untuk menghapus produk dengan token
  it('should delete a product', async () => {
    const res = await request(app)
      .delete(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Product deleted successfully');
  });
});
