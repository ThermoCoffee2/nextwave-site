import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { CartContext } from '../context/CartContext';

export default function Navbar() {
  const { toggleCart, items } = useContext(CartContext);

  return (
    <nav className="w-full flex items-center justify-between p-4 bg-white mb-4 shadow">
      <div className="flex items-center space-x-4">
        <img src={logo} alt="Nextwave Logo" className="h-10" />
        <Link to="/" className="font-semibold">Accueil</Link>
        <Link to="/boutique" className="font-semibold">Boutique</Link>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleCart}
          className="relative p-2 focus:outline-none"
          aria-label="Voir le panier"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
          </svg>
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {items.length}
            </span>
          )}
        </button>
        <Link to="/login" className="text-blue-600">Admin</Link>
      </div>
    </nav>
  );
}
