import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import ShopPage from "./ShopPage";
import AdminPage from "./AdminPage";
import LoginPage from "./LoginPage";
import HistoryPage from "./HistoryPage";
import { CartProvider } from "./context/CartContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/boutique" element={<ShopPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/historique" element={<HistoryPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </CartProvider>
  </React.StrictMode>
);
