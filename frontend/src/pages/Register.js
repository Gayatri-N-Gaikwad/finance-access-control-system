import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Added Link for Home navigation
import api from "../axios";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/auth/register", { name, email, password });
      setSuccess(res.data.message || "Registration successful!");
      // Smooth redirect after success
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="register-page">
      {/* Background decoration */}
      <div className="bg-blur-circle"></div>

      {/*
        HOME BUTTON
        Added to allow users to navigate back to the landing/home page
        without completing registration. This improves UX and matches
        the navigation option present on the Login page.
      */}
      <div style={{ position: "absolute", top: "30px", left: "40px" }}>
        <Link to="/" className="home-button">
          ← Home
        </Link>
      </div>

      <div className={`register-card ${isMounted ? "animate-card" : ""}`}>
        <div className="register-header">
          <h1>Create Your Account</h1>
          <p>Register to access the Finance Dashboard system.</p>
        </div>

        <form onSubmit={handleRegister} className="register-form">
          <div className="input-field">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-field">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="msg error-msg">{error}</div>}
          {success && <div className="msg success-msg">{success}</div>}

          <button type="submit" className="register-btn">
            Create Account
          </button>
        </form>

        <div className="register-footer">
          <p>
            Already have an account?{" "}
            <span className="login-link" onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;