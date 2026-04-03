import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../axios";
import "./Users.css";

const Users = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "viewer",
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (role !== "admin") {
      navigate("/dashboard");
    }
    fetchUsers();
  }, [role, navigate]);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data.users);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (user) => {
    setEditingId(user._id);
    setForm({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.patch(`/users/${editingId}`, form);
      } else {
        await api.post("/users", form);
      }
      setEditingId(null);
      setForm({ name: "", email: "", password: "", role: "viewer" });
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permanent action: Delete this user account?")) return;
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const filteredUsers = (users || []).filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filterRole === "all" || u.role === filterRole;

    return matchesSearch && matchesRole;
  });

  if (loading) return <div className="loader">Initializing Admin Panel...</div>;

  if (error) {
    return (
      <div className="dashboard-container">
        <main className="main-content">
          <div style={{ padding: "40px", color: "red", fontWeight: "500" }}>
            ⚠ {error}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          FINANCE<span>AI</span>
        </div>
        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-item">
            📊 Dashboard
          </Link>
          <Link to="/transactions" className="nav-item">
            💸 Transactions
          </Link>
          <Link to="/users" className="nav-item active">
            👥 Users
          </Link>
          <button
            onClick={() => navigate("/login")}
            className="nav-item logout-btn"
          >
            🚪 Logout
          </button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="top-navbar">
          <div>
            <h1 className="page-title">User Management</h1>
            <p className="page-subtitle">
              Configure system access and permissions
            </p>
          </div>
          <button
            className="btn-primary"
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
            }}
          >
            {showForm ? "Close Form" : "+ Add New User"}
          </button>
        </header>

        {showForm && (
          <section className="form-card slide-down">
            <h3 className="card-heading">
              {editingId ? "Update User Permissions" : "Create New Account"}
            </h3>
            <form onSubmit={handleSubmit} className="user-form">
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                name="password"
                type="password"
                placeholder={editingId ? "New Password (Optional)" : "Password"}
                value={form.password}
                onChange={handleChange}
                required={!editingId}
              />
              <select name="role" value={form.role} onChange={handleChange}>
                <option value="viewer">Viewer</option>
                <option value="analyst">Analyst</option>
                <option value="admin">Admin</option>
              </select>
              <button type="submit" className="btn-submit">
                {editingId ? "Apply Changes" : "Create User"}
              </button>
            </form>
          </section>
        )}

        <div className="table-controls">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admins</option>
            <option value="analyst">Analysts</option>
            <option value="viewer">Viewers</option>
          </select>
        </div>

        <div className="table-card fade-in">
          <table className="user-table">
            <thead>
              <tr>
                <th>User Detail</th>
                <th>Access Role</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u._id} className="table-row">
                  <td>
                    <div className="user-info">
                      <div className="avatar-small">{u.name.charAt(0)}</div>
                      <div>
                        <p className="u-name">{u.name}</p>
                        <p className="u-email">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`role-tag ${u.role}`}>{u.role}</span>
                  </td>
                  <td>
                    <span className="status-badge active">Active</span>
                  </td>
                  <td className="actions-cell">
                    <button
                      className="btn-edit-sm"
                      onClick={() => handleEdit(u)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete-sm"
                      onClick={() => handleDelete(u._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Users;
