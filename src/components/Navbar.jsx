import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between p-4 bg-gray-100 mb-4">
      <div className="flex items-center space-x-4">
        <img src={logo} alt="Nextwave Logo" className="h-10" />
        <Link to="/" className="font-semibold">Accueil</Link>
        <Link to="/boutique" className="font-semibold">Boutique</Link>
      </div>
      <Link to="/login" className="text-blue-600">Admin</Link>
    </nav>
  );
}
