import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';

const dbPromise = open({ filename: './products.db', driver: sqlite3.Database });

async function init() {
  const db = await dbPromise;
  await db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price REAL,
    image TEXT,
    stock INTEGER,
    category TEXT,
    featured INTEGER DEFAULT 0
  )`);
  const count = await db.get('SELECT COUNT(*) as c FROM products');
  if (count.c === 0) {
    const sample = [
      ['Booster Édition Spéciale', 9.9, 'https://via.placeholder.com/300x200?text=Item1', 50, 'cartes', 1],
      ['Carte Holo Rare', 14.5, 'https://via.placeholder.com/300x200?text=Item2', 25, 'cartes', 1],
      ['Display scellé', 120, 'https://via.placeholder.com/300x200?text=Item3', 10, 'boites', 1],
      ['Jeu de cartes collector', 19.9, 'https://via.placeholder.com/300x200?text=Item4', 40, 'cartes', 0],
      ['Poster exclusif', 7.5, 'https://via.placeholder.com/300x200?text=Item5', 60, 'goodies', 0]
    ];
    for (const p of sample) {
      await db.run(
        'INSERT INTO products (name, price, image, stock, category, featured) VALUES (?, ?, ?, ?, ?, ?)',
        ...p
      );
    }
  }
}
init();

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
