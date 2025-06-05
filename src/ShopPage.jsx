import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (!category || p.category === category)
  );

  return (
    <div className="p-4">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Boutique</h1>
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Recherche"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">Toutes catégories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((product) => (
          <div key={product.id} className="border p-2 rounded shadow-sm">
            <img src={product.image} alt={product.name} className="w-full h-40 object-contain mb-2" />
            <h2 className="font-bold">{product.name}</h2>
            <p>{product.price.toFixed(2)} €</p>
            <p className="text-sm text-gray-600">Stock : {product.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
