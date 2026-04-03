import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);


  return (
    <div className={`home-wrapper ${isLoaded ? "animate-in" : ""}`}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            Finance<span className="text-primary">Dashboard</span>
          </div>
          <div className="nav-links">
            <span onClick={() => navigate("/")}>Home</span>
            <span onClick={() => navigate("/login")}>Login</span>
            <button className="nav-btn" onClick={() => navigate("/register")}>
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <h1 className="hero-title">
          Smart Financial <span className="gradient-text">Insights</span> Dashboard
        </h1>
        <p className="hero-description">
          A comprehensive analytics platform designed for modern financial teams. 
          Manage records, track global transactions, and scale with confidence.
        </p>
        <div className="hero-actions">
          <button className="btn btn-filled" onClick={() => navigate("/login")}>
            Launch Dashboard
          </button>
          <button className="btn btn-outline" onClick={() => navigate("/register")}>
            Create Account
          </button>
        </div>
      </header>

{/* Project Overview */}
<section className="section preview">
  <h2 className="section-title">Finance Data Processing Backend</h2>

  <div className="preview-grid">
    <div className="preview-card">
      <h3>Purpose</h3>
      <p>
        This system provides a backend architecture for managing financial
        transactions, processing summary analytics, and controlling access
        based on user roles within a finance dashboard environment.
      </p>
    </div>

    <div className="preview-card">
      <h3>Core Functionality</h3>
      <p>
        The backend supports financial record management, role-based access
        control, aggregated analytics APIs, and secure data handling for
        dashboard applications.
      </p>
    </div>

    <div className="preview-card">
      <h3>Design Focus</h3>
      <p>
        The project emphasizes clean API design, structured backend logic,
        reliable data processing, and maintainable architecture suitable for
        scalable financial systems.
      </p>
    </div>
  </div>
</section>


{/* System Capabilities */}
<section className="section features">
  <h2 className="section-title">System Capabilities</h2>

  <div className="features-grid">

    <div className="feature-card">
      <div className="feature-icon">👤</div>
      <h3>User & Role Management</h3>
      <p>
        Create and manage users with clearly defined roles such as Viewer,
        Analyst, and Admin. Permissions are enforced at the backend level.
      </p>
    </div>

    <div className="feature-card">
      <div className="feature-icon">💳</div>
      <h3>Financial Records API</h3>
      <p>
        REST APIs support creating, viewing, updating, deleting, and filtering
        financial transactions including income and expense records.
      </p>
    </div>

    <div className="feature-card">
      <div className="feature-icon">📊</div>
      <h3>Dashboard Summary APIs</h3>
      <p>
        Aggregation endpoints generate insights such as total income, total
        expenses, net balance, category totals, and recent activity.
      </p>
    </div>

    <div className="feature-card">
      <div className="feature-icon">🔐</div>
      <h3>Access Control Logic</h3>
      <p>
        Middleware-based authorization ensures each role can only perform
        allowed actions within the system.
      </p>
    </div>

    <div className="feature-card">
      <div className="feature-icon">✔️</div>
      <h3>Validation & Error Handling</h3>
      <p>
        Input validation and structured error responses ensure reliable API
        behavior and prevent invalid operations.
      </p>
    </div>

    <div className="feature-card">
      <div className="feature-icon">🗄️</div>
      <h3>Data Persistence</h3>
      <p>
        Financial data and user information are stored in a database designed
        for efficient querying and analytics processing.
      </p>
    </div>

  </div>
</section>


{/* Role Access Model */}
<section className="section preview">
  <h2 className="section-title">Role-Based Access Model</h2>

  <div className="preview-grid">

    <div className="preview-card">
      <h3>Viewer</h3>
      <p>
        Can access dashboard summaries and view financial insights without
        modifying records.
      </p>
    </div>

    <div className="preview-card">
      <h3>Analyst</h3>
      <p>
        Can explore financial data, analyze transactions, and access summary
        analytics provided by the backend APIs.
      </p>
    </div>

    <div className="preview-card">
      <h3>Admin</h3>
      <p>
        Full management privileges including user administration and
        transaction record management.
      </p>
    </div>

  </div>
</section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Finance Dashboard System • Modern Analytics for Teams</p>
      </footer>
    </div>
  );
};

export default Home;