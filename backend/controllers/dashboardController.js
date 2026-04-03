const Transaction = require("../models/Transaction");

exports.getDashboardSummary = async (req, res) => {
  try {

    // TOTAL INCOME
    const totalIncome = await Transaction.aggregate([
      { $match: { type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // TOTAL EXPENSES
    const totalExpenses = await Transaction.aggregate([
      { $match: { type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // INCOME CATEGORY BREAKDOWN
    const incomeCategories = await Transaction.aggregate([
      { $match: { type: "income" } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      },
      {
        $project: {
          category: "$_id",
          total: 1,
          _id: 0
        }
      }
    ]);

    // EXPENSE CATEGORY BREAKDOWN
    const expenseCategories = await Transaction.aggregate([
      { $match: { type: "expense" } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      },
      {
        $project: {
          category: "$_id",
          total: 1,
          _id: 0
        }
      }
    ]);

    // RECENT TRANSACTIONS
    const recentTransactions = await Transaction.find()
      .sort({ date: -1 })
      .limit(5);

    // MONTHLY TREND
    const monthlyTrends = await Transaction.aggregate([
      {
        $group: {
          _id: { month: { $month: "$date" }, type: "$type" },
          total: { $sum: "$amount" }
        }
      },
      {
        $project: {
          month: "$_id.month",
          type: "$_id.type",
          total: 1,
          _id: 0
        }
      },
      { $sort: { month: 1 } }
    ]);

    const income = totalIncome[0]?.total || 0;
    const expenses = totalExpenses[0]?.total || 0;
    const totalTransactions = await Transaction.countDocuments();

    res.status(200).json({
      totalIncome: income,
      totalExpenses: expenses,
      netBalance: income - expenses,
      totalTransactions,
      incomeCategories,
      expenseCategories,
      recentTransactions,
      monthlyTrends
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};