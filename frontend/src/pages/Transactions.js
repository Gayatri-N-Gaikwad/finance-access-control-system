import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../axios";
import "./Transactions.css";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    type: "income",
    category: "",
    notes: "",
    date: "",
  });

  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

  const fetchTransactions = async () => {
    try {
      const res = await api.get("/transactions");
      setTransactions(res.data.transactions);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch transactions");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // ADD OR UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await api.patch(`/transactions/${editId}`, form);
      } else {
        await api.post("/transactions", form);
      }

      setForm({
        amount: "",
        type: "income",
        category: "",
        notes: "",
        date: "",
      });

      setEditId(null);
      setShowForm(false);

      fetchTransactions();
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      await api.delete(`/transactions/${id}`);
      fetchTransactions();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete transaction");
    }
  };

  // EDIT
  const handleEdit = (t) => {
    setForm({
      amount: t.amount,
      type: t.type,
      category: t.category,
      notes: t.notes || "",
      date: t.date ? t.date.substring(0, 10) : "",
    });

    setEditId(t._id);
    setShowForm(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          FINANCE<span>AI</span>
        </div>

        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-item">
            <span className="icon">📊</span> Dashboard
          </Link>

          <Link to="/transactions" className="nav-item active">
            <span className="icon">💸</span> Transactions
          </Link>

          <button onClick={handleLogout} className="nav-item logout-btn">
            <span className="icon">🚪</span> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-navbar">
          <div className="header-left">
            <h1 className="page-title">Transactions</h1>
            <p className="page-subtitle">
              Manage and track your financial activities
            </p>
          </div>

          <button
            className="btn-add"
            onClick={() => {
              setShowForm(!showForm);
              setEditId(null);
              setForm({
                amount: "",
                type: "income",
                category: "",
                notes: "",
                date: "",
              });
            }}
          >
            {showForm ? "Close Form" : "+ Add Transaction"}
          </button>
        </header>

        <div className="transactions-content">
          {/* FORM */}
          {showForm && (
            <section className="form-card slide-down">
              <h3 className="card-heading">
                {editId ? "Edit Transaction" : "New Transaction"}
              </h3>

              <form onSubmit={handleSubmit} className="transaction-form">
                <input
                  type="number"
                  placeholder="Amount"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  required
                />

                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>

                <input
                  type="text"
                  placeholder="Category (Salary, Rent)"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  required
                />

                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  required
                />

                <input
                  type="text"
                  placeholder="Notes (Optional)"
                  className="full-width"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />

                <button type="submit" className="btn-submit">
                  {editId ? "Update Transaction" : "Save Transaction"}
                </button>
              </form>
            </section>
          )}

          {error && <div className="error-banner">{error}</div>}

          {/* TABLE */}
          <div className="table-card fade-in">
            <div className="table-responsive">
              <table className="transaction-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description / Notes</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {transactions.length > 0 ? (
                    transactions.map((t) => (
                      <tr key={t._id} className="table-row">
                        <td>{new Date(t.date).toLocaleDateString()}</td>

                        <td className="text-dim">
                          {t.notes || "No description"}
                        </td>

                        <td>
                          <span className="category-tag">{t.category}</span>
                        </td>

                        <td>
                          <span className={`badge ${t.type}`}>{t.type}</span>
                        </td>

                        <td
                          className={`amount-cell ${
                            t.type === "income" ? "text-success" : "text-error"
                          }`}
                        >
                          {t.type === "income" ? "+" : "-"}₹
                          {Number(t.amount).toLocaleString()}
                        </td>

                        <td className="actions-cell">
                          <button
                            className="btn-edit"
                            onClick={() => handleEdit(t)}
                          >
                            Edit
                          </button>

                          <button
                            className="btn-delete"
                            onClick={() => handleDelete(t._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="empty-state">
                        No transactions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Transactions;
