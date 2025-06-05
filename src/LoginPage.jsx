import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulation de login
    if (email === "admin@example.com" && password === "admin") {
      navigate("/admin");
    } else {
      alert("Identifiants invalides");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Connexion</h2>
        <div>
          <label className="block text-sm">Email</label>
          <input
            type="email"
            required
            className="w-full px-3 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm">Mot de passe</label>
          <input
            type="password"
            required
            className="w-full px-3 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Se connecter
        </button>
      </form>
    </div>
  );
}
