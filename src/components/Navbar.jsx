import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { CartContext } from '../context/CartContext';

export default function Navbar() {
  const { toggleCart } = useContext(CartContext);

  return (
    <nav className="w-full flex items-center justify-between p-4 bg-white mb-4 shadow">
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleCart}
          className="md:hidden p-2 focus:outline-none"
          aria-label="Toggle cart"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <img src={logo} alt="Nextwave Logo" className="h-10" />
        <Link to="/" className="font-semibold">Accueil</Link>
        <Link to="/boutique" className="font-semibold">Boutique</Link>
      </div>
      <Link to="/login" className="text-blue-600">Admin</Link>
    </nav>
  );
}
