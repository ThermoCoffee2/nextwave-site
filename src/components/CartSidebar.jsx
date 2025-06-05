import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function CartSidebar() {
  const { items, open, toggleCart } = useContext(CartContext);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={toggleCart}
          aria-hidden="true"
        ></div>
      )}
      <aside
        className={`fixed right-0 top-0 w-64 h-full bg-white shadow-lg p-4 overflow-y-auto transform transition-transform z-50 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <button
          className="absolute top-2 left-2 text-gray-600"
          onClick={toggleCart}
          aria-label="Fermer le panier"
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4 mt-6">Panier</h2>
        {items.length === 0 ? (
          <p className="text-sm text-gray-500">Votre panier est vide.</p>
        ) : (
          <ul className="space-y-2">
            {items.map((item, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{item.name}</span>
                <span>{item.price.toFixed(2)} €</span>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </>
  );
}
