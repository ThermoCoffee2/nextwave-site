import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", image: "", stock: "", category: "", featured: false });

  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = editing ? { ...form, id: editing } : form;
    fetch("http://localhost:3001/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        price: parseFloat(payload.price),
        stock: parseInt(payload.stock),
        featured: payload.featured,
      }),
    }).then(() => {
      setForm({ name: "", price: "", image: "", stock: "", category: "", featured: false });
      setEditing(null);
      fetch("http://localhost:3001/api/products")
        .then((res) => res.json())
        .then((data) => setProducts(data));
    });
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditing(product.id);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Admin - Gestion des Produits</h1>
      <form onSubmit={handleSubmit} className="grid gap-2 mb-4">
        <input placeholder="Nom" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Prix" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
        <input placeholder="Image URL" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
        <input placeholder="Stock" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
        <input placeholder="Catégorie" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
        <label className="flex items-center space-x-2">
          <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
          <span>Mettre en avant</span>
        </label>
        <button type="submit" className="bg-green-600 text-white p-2 rounded">{editing ? "Modifier" : "Ajouter"}</button>
      </form>
      <ul>
        {products.map(p => (
          <li key={p.id} className="mb-2">
            {p.name} - {p.price}€ - Stock: {p.stock}
            <button className="ml-2 text-blue-500" onClick={() => handleEdit(p)}>Modifier</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
