import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../axios";
import "./Dashboard.css";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await api.get("/dashboard/summary");
        setSummary(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch data");
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  if (loading)
    return <div className="loading-screen">Verifying Financial Data...</div>;

  if (error) return <div className="error-screen">{error}</div>;

  // SAFE FALLBACKS
  const incomeCategories = summary?.incomeCategories || [];
  const expenseCategories = summary?.expenseCategories || [];
  const recentTransactions = summary?.recentTransactions || [];

  // INCOME PIE DATA
  const incomePieData = {
    labels: incomeCategories.map((c) => c.category),
    datasets: [
      {
        label: "Income Sources",
        data: incomeCategories.map((c) => c.total),
        backgroundColor: [
          "#22C55E",
          "#4ADE80",
          "#16A34A",
          "#86EFAC",
          "#15803D",
        ],
        borderWidth: 1,
      },
    ],
  };

  // EXPENSE PIE DATA
  const expensePieData = {
    labels: expenseCategories.map((c) => c.category),
    datasets: [
      {
        label: "Expense Categories",
        data: expenseCategories.map((c) => c.total),
        backgroundColor: [
          "#EF4444",
          "#F87171",
          "#DC2626",
          "#FCA5A5",
          "#B91C1C",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          FINANCE<span>AI</span>
        </div>

        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-item active">
            📊 Dashboard
          </Link>
          <Link to="/transactions" className="nav-item">
            💸 Transactions
          </Link>

          {role === "admin" && (
            <Link to="/users" className="nav-item">
              👥 Users
            </Link>
          )}

          <button onClick={handleLogout} className="nav-item logout-btn">
            🚪 Logout
          </button>
        </nav>
      </aside>

      {/* Main */}
      <main className="main-content">
        <header className="top-navbar">
          <h1 className="page-title">Dashboard Overview</h1>

          <div className="user-profile">
            <span className="user-role">{role}</span>
            <div className="avatar">JD</div>
          </div>
        </header>

        <div className="dashboard-content">
          {/* Metrics */}
          <section className="metrics-grid">
            <MetricCard
              label="Net Balance"
              value={`₹${(summary?.netBalance || 0).toLocaleString()}`}
              type={summary?.netBalance >= 0 ? "success" : "error"}
            />

            <MetricCard
              label="Total Income"
              value={`₹${(summary?.totalIncome || 0).toLocaleString()}`}
              type="success"
            />

            <MetricCard
              label="Total Expenses"
              value={`₹${(summary?.totalExpenses || 0).toLocaleString()}`}
              type="error"
            />

            <MetricCard
              label="Total Transactions"
              value={summary?.totalTransactions || 0}
              type="neutral"
            />
          </section>

          {/* Layout */}
          <div className="data-layout">
            {/* Transactions */}
            <section className="table-card">
              <h3 className="card-heading">Recent Activity</h3>

              <table className="transaction-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {recentTransactions.map((t) => (
                    <tr key={t._id}>
                      <td>{new Date(t.date).toLocaleDateString()}</td>
                      <td>{t.category}</td>

                      <td>
                        <span className={`badge ${t.type}`}>{t.type}</span>
                      </td>

                      <td
                        className={
                          t.type === "income" ? "text-success" : "text-error"
                        }
                      >
                        {t.type === "income" ? "+" : "-"}₹
                        {t.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* Charts */}
            <section className="analytics-card">
              <h3 className="card-heading">Income Sources</h3>

              <div style={{ maxWidth: "350px", margin: "auto" }}>
                <Pie data={incomePieData} />
              </div>

              <h3 className="card-heading" style={{ marginTop: "40px" }}>
                Expense Categories
              </h3>

              <div style={{ maxWidth: "350px", margin: "auto" }}>
                <Pie data={expensePieData} />
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

// Metric Card
const MetricCard = ({ label, value, type }) => (
  <div className="metric-card">
    <span className="metric-label">{label}</span>

    <h2
      className={`metric-value ${
        type === "success"
          ? "text-success"
          : type === "error"
            ? "text-error"
            : ""
      }`}
    >
      {value}
    </h2>
  </div>
);

export default Dashboard;
