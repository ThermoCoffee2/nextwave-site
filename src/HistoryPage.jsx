import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import CartSidebar from "./components/CartSidebar";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("/api/history")
      .then((res) => res.json())
      .then((data) => setHistory(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Navbar />
      <CartSidebar />
      <h1 className="text-2xl font-bold mb-4">Historique des Mouvements</h1>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Date</th>
            <th className="border p-2">Produit</th>
            <th className="border p-2">Action</th>
            <th className="border p-2">Prix</th>
            <th className="border p-2">Stock</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h) => (
            <tr key={h.id}>
              <td className="border p-2">{new Date(h.date).toLocaleString()}</td>
              <td className="border p-2">{h.name}</td>
              <td className="border p-2">{h.action}</td>
              <td className="border p-2">{h.price}</td>
              <td className="border p-2">{h.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
