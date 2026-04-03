const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const Transaction = require("./models/Transaction");

dotenv.config();

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });

// Dummy users
const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "Admin@123",
    role: "admin",
  },
  {
    name: "Analyst User",
    email: "analyst@example.com",
    password: "Analyst@123",
    role: "analyst",
  },
  {
    name: "Viewer User",
    email: "viewer@example.com",
    password: "Viewer@123",
    role: "viewer",
  },
];

// Dummy transactions
const transactions = [
  { amount: 5000, type: "income", category: "Salary", date: new Date("2026-04-01"), notes: "April salary" },
  { amount: 1500, type: "expense", category: "Food", date: new Date("2026-04-02"), notes: "Groceries" },
  { amount: 800, type: "expense", category: "Transport", date: new Date("2026-04-03"), notes: "Bus pass" },
  { amount: 2000, type: "income", category: "Freelance", date: new Date("2026-04-04"), notes: "Project payment" },
  { amount: 1200, type: "expense", category: "Entertainment", date: new Date("2026-04-05"), notes: "Movies & games" },
  { amount: 1000, type: "expense", category: "Food", date: new Date("2026-04-06"), notes: "Restaurant" },
  { amount: 3000, type: "income", category: "Bonus", date: new Date("2026-04-07"), notes: "Performance bonus" },
];

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Transaction.deleteMany({});

    // Hash user passwords
    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    // Insert users
    const createdUsers = await User.insertMany(hashedUsers);
    console.log("Users seeded:", createdUsers.map((u) => u.email));

    // Assign transactions to admin user
    const adminUserId = createdUsers.find((u) => u.role === "admin")._id;
    const transactionsWithUser = transactions.map((t) => ({ ...t, user: adminUserId }));

    // Insert transactions
    const createdTransactions = await Transaction.insertMany(transactionsWithUser);
    console.log(`Seeded ${createdTransactions.length} transactions`);

    console.log("Seeder completed!");
    process.exit();
  } catch (error) {
    console.error("Seeder failed:", error.message);
    process.exit(1);
  }
};

seedData();