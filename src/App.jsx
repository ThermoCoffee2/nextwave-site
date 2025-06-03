import React from "react";
import { Link } from "react-router-dom";
import logo from "./assets/logo.png";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center relative text-center">
      <header className="absolute top-4 right-4">
        <img src={logo} alt="Nextwave Logo" className="h-12" />
      </header>
      <h1 className="text-4xl font-bold mb-6">Bienvenue sur Nextwave</h1>
      <p className="mb-6">Explore notre boutique de cartes et produits collectors !</p>
      <Link to="/boutique">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
          Accéder à la boutique
        </button>
      </Link>
    </div>
  );
}
