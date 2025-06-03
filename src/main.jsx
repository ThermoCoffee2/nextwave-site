import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import ShopPage from "./ShopPage";
import AdminPage from "./AdminPage";
import LoginPage from "./LoginPage";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/boutique" element={<ShopPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </Router>
);
