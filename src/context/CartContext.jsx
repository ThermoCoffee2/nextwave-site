import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  const addItem = (product) => setItems((prev) => [...prev, product]);
  const removeItem = (id) => setItems((prev) => prev.filter((p) => p.id !== id));
  const toggleCart = () => setOpen((o) => !o);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, open, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
}
