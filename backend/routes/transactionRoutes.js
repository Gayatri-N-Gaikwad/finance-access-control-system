const express = require("express");
const {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction
} = require("../controllers/transactionController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Create transaction (single or bulk)
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin", "analyst"),
  createTransaction
);

// Get transactions with filters, search, pagination
// Example: /api/transactions?type=income&category=Food&page=1&limit=5&search=restaurant
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin", "analyst", "viewer"),
  getTransactions
);

// Update transaction
router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "analyst"),
  updateTransaction
);

// Delete transaction
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteTransaction
);

module.exports = router;