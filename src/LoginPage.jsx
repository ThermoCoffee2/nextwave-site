import React from "react";

export default function LoginPage() {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Connexion</h1>
      <form className="grid gap-2">
        <input type="email" placeholder="Email" className="p-2 border rounded" />
        <input type="password" placeholder="Mot de passe" className="p-2 border rounded" />
        <button className="bg-blue-600 text-white p-2 rounded">Se connecter</button>
      </form>
    </div>
  );
}
