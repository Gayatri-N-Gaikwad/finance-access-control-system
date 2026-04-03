# Finance Data Processing and Access Control System

This project is a backend-focused finance dashboard system. The system manages financial transactions, user roles, and summary analytics while enforcing role-based access control.

The project demonstrates backend architecture, API design, business logic implementation, and structured data handling.

---

# Project Overview

The system provides a backend service for managing financial records and user roles.  
Different users interact with the system depending on their access level.

The backend exposes APIs for:

- Managing users and roles
- Managing financial transactions
- Generating dashboard summaries
- Enforcing role-based access control

A simple frontend dashboard is also included to interact with the APIs.

---

# Features

## User and Role Management
- Create and manage users
- Assign roles to users
- Activate or deactivate users
- Restrict system actions based on roles

Supported roles:

| Role | Permissions |
|-----|-------------|
| Viewer | Can view dashboard summaries |
| Analyst | Can view financial records and analytics |
| Admin | Full access to manage users and transactions |

---

## Financial Records Management

Transactions support the following fields:

- Amount
- Type (Income / Expense)
- Category
- Date
- Description / Notes

Supported operations:

- Create transactions
- View transactions
- Update transactions
- Delete transactions
- Filter by type, category, or date

---

## Dashboard Summary APIs

The backend provides aggregated analytics including:

- Total income
- Total expenses
- Net balance
- Category-wise totals
- Recent transactions
- Financial summaries for dashboards

---

## Access Control

Role-based access control is enforced using backend middleware.

Examples:

- Viewer cannot create or modify transactions
- Analyst can read records and analytics
- Admin can manage users and transactions

---

## Validation and Error Handling

The backend includes validation and error handling for:

- Missing fields
- Invalid input
- Unauthorized access
- Invalid operations

Standard HTTP status codes are used for API responses.

---

# Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### Frontend
- React
- Axios
- React Router

---

# Project Structure

```
finance-dashboard
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── config
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   └── axios.js
│
└── README.md
```

---

# Setup Instructions

## 1 Clone the Repository

```
git clone <repository-url>
cd finance-dashboard
```

---

## 2 Backend Setup

```
cd backend
npm install
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Start backend:

```
npm run dev
```

---

## 3 Frontend Setup

```
cd frontend
npm install
npm start
```

Frontend will run on:

```
http://localhost:3000
```

Backend runs on:

```
http://localhost:5000
```

---

# Example API Endpoints

### Authentication

```
POST /api/auth/register
POST /api/auth/login
```

### Users

```
GET /api/users
POST /api/users
PUT /api/users/:id
DELETE /api/users/:id
```

### Transactions

```
GET /api/transactions
POST /api/transactions
PUT /api/transactions/:id
DELETE /api/transactions/:id
```

### Dashboard

```
GET /api/dashboard/summary
```

---

# Role Based Permissions

| Action | Viewer | Analyst | Admin |
|------|------|------|------|
| View Dashboard | Yes | Yes | Yes |
| View Transactions | No | Yes | Yes |
| Create Transactions | No | No | Yes |
| Update Transactions | No | No | Yes |
| Delete Transactions | No | No | Yes |
| Manage Users | No | No | Yes |

---

# Assumptions

Some assumptions were made during development:

- Authentication is handled using JWT tokens.
- Role-based access is enforced through middleware.
- MongoDB is used for persistent data storage.
- Transactions represent financial entries for income and expenses.

---


# Purpose of This Project

This project was developed as part of an internship assignment to demonstrate backend engineering skills including:

- API design
- Role-based access control
- Data modeling
- Error handling
- Backend architecture

The focus was on building a **clean, maintainable, and logically structured backend system**.
