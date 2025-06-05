import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

export default function App() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/products?featured=1")
      .then((res) => res.json())
      .then((data) => setFeatured(data));
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center text-center">
      <Navbar />

      <main className="flex flex-col items-center p-6">
        <h1 className="text-4xl font-bold mb-4">Bienvenue sur Nextwave</h1>
        <p className="mb-8 max-w-xl">
          Découvrez notre collection unique de cartes et objets collectors.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full mb-12">
          {featured.map((p) => (
            <div key={p.id} className="border rounded p-4 shadow">
              <img src={p.image} alt={p.name} className="w-full h-48 object-contain mb-2" />
              <h2 className="font-semibold">{p.name}</h2>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
