import express from 'express';
import cors from 'cors';
import { dbPromise, initDb } from './db.js';

// Initialize the SQLite database and seed demo data on start
initDb();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/history', async (req, res) => {
  const db = await dbPromise;
  const history = await db.all('SELECT * FROM history ORDER BY date DESC');
  res.json(history);
});

app.get('/api/products', async (req, res) => {
  const { search, category, featured } = req.query;
  let query = 'SELECT * FROM products';
  const params = [];
  const conditions = [];
  if (search) {
    conditions.push('name LIKE ?');
    params.push(`%${search}%`);
  }
  if (category) {
    conditions.push('category = ?');
    params.push(category);
  }
  if (featured === '1') {
    conditions.push('featured = 1');
  }
  if (conditions.length) {
    query += ' WHERE ' + conditions.join(' AND ');
  }
  const products = await (await dbPromise).all(query, params);
  res.json(products);
});

app.post('/api/products', async (req, res) => {
  const { id, name, price, image, stock, category, featured } = req.body;
  const db = await dbPromise;
  if (id) {
    await db.run(
      `UPDATE products SET name=?, price=?, image=?, stock=?, category=?, featured=? WHERE id=?`,
      name,
      price,
      image,
      stock,
      category,
      featured ? 1 : 0,
      id
    );
    await db.run(
      `INSERT INTO history (product_id, name, action, price, stock) VALUES (?, ?, 'update', ?, ?)`,
      id,
      name,
      price,
      stock
    );
  } else {
    const result = await db.run(
      `INSERT INTO products (name, price, image, stock, category, featured) VALUES (?, ?, ?, ?, ?, ?)`,
      name,
      price,
      image,
      stock,
      category,
      featured ? 1 : 0
    );
    await db.run(
      `INSERT INTO history (product_id, name, action, price, stock) VALUES (?, ?, 'add', ?, ?)`,
      result.lastID,
      name,
      price,
      stock
    );
  }
  const products = await db.all('SELECT * FROM products');
  res.json(products);
});

app.delete('/api/products/:id', async (req, res) => {
  const db = await dbPromise;
  const product = await db.get('SELECT * FROM products WHERE id=?', req.params.id);
  await db.run('DELETE FROM products WHERE id=?', req.params.id);
  if (product) {
    await db.run(
      `INSERT INTO history (product_id, name, action, price, stock) VALUES (?, ?, 'delete', ?, ?)`,
      product.id,
      product.name,
      product.price,
      product.stock
    );
  }
  const products = await db.all('SELECT * FROM products');
  res.json(products);
});

const port = 3001;
app.listen(port, () => console.log(`Server started on port ${port}`));
