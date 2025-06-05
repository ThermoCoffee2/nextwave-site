import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const dbPromise = open({ filename: './products.db', driver: sqlite3.Database });

export async function initDb() {
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

  await db.run(`CREATE TABLE IF NOT EXISTS history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    name TEXT,
    action TEXT,
    price REAL,
    stock INTEGER,
    date DATETIME DEFAULT CURRENT_TIMESTAMP
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
