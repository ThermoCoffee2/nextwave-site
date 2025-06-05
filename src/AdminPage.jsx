import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import CartSidebar from "./components/CartSidebar";

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

  const handleStockChange = (id, delta) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    const newStock = Math.max(0, product.stock + delta);
    fetch("http://localhost:3001/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...product, stock: newStock }),
    }).then(() => {
      fetch("http://localhost:3001/api/products")
        .then((res) => res.json())
        .then((data) => setProducts(data));
    });
  };

  return (
    <div className="p-4 max-w-3xl mx-auto min-h-screen bg-gray-100">
      <Navbar />
      <CartSidebar />
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
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {editing ? "Modifier" : "Ajouter"}
        </button>
      </form>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Nom</th>
            <th className="border p-2">Prix</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Catégorie</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.price}</td>
              <td className="border p-2">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => handleStockChange(p.id, -1)}
                  >
                    -
                  </button>
                  <span>{p.stock}</span>
                  <button
                    type="button"
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => handleStockChange(p.id, 1)}
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="border p-2">{p.category}</td>
              <td className="border p-2">
                <button className="text-blue-500" onClick={() => handleEdit(p)}>
                  Modifier
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
