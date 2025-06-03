import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "./assets/logo.png";

export default function ShopPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-6">
        <img src={logo} alt="Nextwave Logo" className="h-12" />
        <Link to="/login">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Se connecter</button>
        </Link>
      </header>
      <h1 className="text-2xl font-bold mb-4">Boutique</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
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
