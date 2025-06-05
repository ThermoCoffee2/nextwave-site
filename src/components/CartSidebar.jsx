import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function CartSidebar() {
  const { items, open } = useContext(CartContext);

  return (
    <aside
      className={`fixed right-0 top-0 w-64 h-full bg-white shadow-lg p-4 overflow-y-auto transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <h2 className="text-lg font-bold mb-4">Panier</h2>
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
  );
}
