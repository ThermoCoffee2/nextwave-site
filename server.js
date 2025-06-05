import express from 'express';
import cors from 'cors';
import { dbPromise, initDb } from './db.js';

// Initialize the SQLite database and seed demo data on start
initDb();

const app = express();
app.use(cors());
app.use(express.json());

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
  } else {
    await db.run(
      `INSERT INTO products (name, price, image, stock, category, featured) VALUES (?, ?, ?, ?, ?, ?)`,
      name,
      price,
      image,
      stock,
      category,
      featured ? 1 : 0
    );
  }
  const products = await db.all('SELECT * FROM products');
  res.json(products);
});

const port = 3001;
app.listen(port, () => console.log(`Server started on port ${port}`));
