import React from "react";
import { Link } from "react-router-dom";
import logo from "./assets/logo.png";

export default function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center text-center">
      <header className="w-full flex justify-between items-center px-6 py-4">
        <img src={logo} alt="Nextwave Logo" className="h-12" />
        <Link to="/boutique">
          <button className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700">
            Accéder à la boutique
          </button>
        </Link>
      </header>

      <main className="flex flex-col items-center p-6">
        <h1 className="text-4xl font-bold mb-4">Bienvenue sur Nextwave</h1>
        <p className="mb-8 max-w-xl">
          Découvrez notre collection unique de cartes et objets collectors.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full mb-12">
          <div className="border rounded p-4 shadow">
            <img src="/featured/item1.jpg" alt="Produit 1" className="w-full h-48 object-contain mb-2" />
            <h2 className="font-semibold">Booster Édition Spéciale</h2>
          </div>
          <div className="border rounded p-4 shadow">
            <img src="/featured/item2.jpg" alt="Produit 2" className="w-full h-48 object-contain mb-2" />
            <h2 className="font-semibold">Carte Holo Rare</h2>
          </div>
          <div className="border rounded p-4 shadow">
            <img src="/featured/item3.jpg" alt="Produit 3" className="w-full h-48 object-contain mb-2" />
            <h2 className="font-semibold">Display scellé</h2>
          </div>
        </div>
      </main>
    </div>
  );
}
