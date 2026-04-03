import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Added Link for Home navigation
import api from "../axios";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid credentials. Please try again."
      );
    }
  };

  return (
    <div className="login-page">
      {/* Subtle background decoration */}
      <div className="bg-glow"></div>

      {/* 
        HOME BUTTON
        This button allows users to navigate back to the landing/home page
        without logging in. Useful for SaaS-style apps where users may
        want to explore the product before authentication.
      */}
      <div style={{ position: "absolute", top: "30px", left: "40px" }}>
        <Link to="/" className="home-button">
          ← Home
        </Link>
      </div>

      <div className={`login-card ${isLoaded ? "fade-in-up" : ""}`}>
        <div className="login-header">
          <h1>Login to Finance Dashboard</h1>
          <p>Access your financial insights and analytics</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="e.g. analyst@finance.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {error && <div className="error-banner">{error}</div>}

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="register-link"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;