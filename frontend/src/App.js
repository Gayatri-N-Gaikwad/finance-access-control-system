import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register"; // import Register page
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Home from "./pages/Home"; // import Home page
import Users from "./pages/Users";

// Simple PrivateRoute for authenticated users
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Register route */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/transactions" element={<PrivateRoute><Transactions /></PrivateRoute>} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* redirect unknown routes to home */}
      </Routes>
    </Router>
  );
}

export default App;