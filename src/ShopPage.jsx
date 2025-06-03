import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("nextwave_cart")) || [];
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("nextwave_cart", JSON.stringify(cart));
    alert("Produit ajouté au panier !");
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Boutique</h1>
        <button onClick={() => navigate("/login")} className="text-blue-600 underline">Se connecter</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-700">{product.price} €</p>
            <p className="text-sm text-green-700">Stock : {product.stock}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Ajouter au panier
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
