import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function App({ notification, cartItems, setIsCartOpen, isCartOpen, addToCart, decreaseQuantity, handleCheckout, totalItems, totalPrice, errorMessage }) {
  return (
    <div className="relative min-h-screen bg-white p-6">
      <header className="flex justify-between items-center py-4 border-b">
        <div className="flex items-center">
          <a href="/"><img src="/IMG_3110.JPEG" alt="Logo NEXTWAVE FRANCE" className="h-12 w-auto" /></a>
        </div>
        <Button variant="outline" onClick={() => setIsCartOpen(!isCartOpen)}>
          <ShoppingCart className="mr-2" /> Panier ({totalItems})
        </Button>
      </header>

      <main className="mt-8">
        <section className="text-center">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="text-3xl font-semibold mb-4">
            Cartes Pokémon & objets collectors
          </motion.h2>
          <p className="text-gray-600 mb-6">
            Découvrez notre sélection exclusive de cartes à collectionner !
          </p>
          <Button className="text-lg px-6 py-3">Accéder à la boutique</Button>
          {notification && <p className="mt-4 text-green-600 font-medium">{notification}</p>}
        </section>

        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="rounded-2xl shadow-md">
              <CardContent className="p-4">
                <img src="https://via.placeholder.com/300x200" alt="Produit" className="mb-4 rounded" />
                <h3 className="text-xl font-semibold">Produit #{item}</h3>
                <p className="text-gray-500 mb-2">Description courte du produit</p>
                <p className="font-bold mb-4">19,99 €</p>
                <Button className="w-full" onClick={() => addToCart({ id: item, name: `Produit #${item}`, price: 19.99 })}>
                  Ajouter au panier
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>

      <AnimatePresence>
        {isCartOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg border-l p-6 z-50 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Mon Panier</h3>
              <button onClick={() => setIsCartOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Votre panier est vide.</p>
            ) : (
              <>
                <div className="mb-4 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <span>{item.name}</span>
                      <div className="flex items-center gap-2">
                        <Button size="sm" onClick={() => decreaseQuantity(item.id)}>-</Button>
                        <span>{item.quantity}</span>
                        <Button size="sm" onClick={() => addToCart(item)}>+</Button>
                      </div>
                    </div>
                  ))}
                </div>
                <h4 className="font-bold mb-2">Total : {totalPrice} €</h4>
                <Button onClick={handleCheckout} className="w-full text-lg px-4 py-2">
                  Payer avec Stripe
                </Button>
                {errorMessage && <p className="mt-4 text-red-600 text-sm">{errorMessage}</p>}
              </>
            )}
          </motion.aside>
        )}
      </AnimatePresence>

      <footer className="mt-12 border-t pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} NEXTWAVE FRANCE — SIRET 944 782 697 00014 — TVA FR52944782697
      </footer>
    </div>
  );
}
