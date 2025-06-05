const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('data.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ref TEXT,
    price REAL,
    qty INTEGER,
    desc TEXT,
    category TEXT,
    photo TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    entry TEXT
  )`);
});

const app = express();
app.use(cors());
app.use(express.json({limit: '5mb'}));

app.get('/items', (req, res) => {
  db.all('SELECT * FROM items', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/items', (req, res) => {
  const { price, qty, desc, category, photo } = req.body;
  if (price == null || qty == null || !desc || !category) {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  db.run(
    `INSERT INTO items (ref, price, qty, desc, category, photo) VALUES (?, ?, ?, ?, ?, ?)`,
    [null, price, qty, desc, category, photo || null],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      const id = this.lastID;
      const ref = id.toString();
      db.run(`UPDATE items SET ref=? WHERE id=?`, [ref, id], err2 => {
        if (err2) return res.status(500).json({ error: err2.message });
        db.run(`INSERT INTO history (entry) VALUES (?)`, [`Ajout ${qty} de réf ${ref}`]);
        res.json({ id, ref });
      });
    }
  );
});

app.post('/items/:id/adjust', (req, res) => {
  const id = req.params.id;
  const delta = parseInt(req.body.delta);
  if (isNaN(delta)) return res.status(400).json({ error: 'Invalid delta' });
  db.get('SELECT qty, ref FROM items WHERE id=?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Not found' });
    const newQty = row.qty + delta;
    db.run('UPDATE items SET qty=? WHERE id=?', [newQty, id], err2 => {
      if (err2) return res.status(500).json({ error: err2.message });
      db.run('INSERT INTO history (entry) VALUES (?)', [`${delta > 0 ? '+' : ''}${delta} sur réf ${row.ref}`]);
      res.json({ qty: newQty });
    });
  });
});

app.delete('/items/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT ref FROM items WHERE id=?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Not found' });
    db.run('DELETE FROM items WHERE id=?', [id], err2 => {
      if (err2) return res.status(500).json({ error: err2.message });
      db.run('INSERT INTO history (entry) VALUES (?)', [`Suppression de réf ${row.ref}`]);
      res.json({ ok: true });
    });
  });
});

app.get('/history', (req, res) => {
  db.all('SELECT entry FROM history ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows.map(r => r.entry));
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
