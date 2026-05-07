import pool from "../configs/db.config.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";

/* =========================================================
   HELPER FUNCTIONS
========================================================= */

// 1. TOTAL MONTHLY INCOME
const getTotalMonthlyIncome = async (userId) => {
  const [rows] = await pool.query(
    `
    SELECT 
      COALESCE(SUM(T.amount), 0) AS total_income
    FROM splitease.transactions T
    WHERE T.user_id = ?
      AND T.type = 'income'
      AND YEAR(T.transaction_date) = YEAR(CURDATE())
      AND MONTH(T.transaction_date) = MONTH(CURDATE())
    `,
    [userId],
  );

  const income = Number(rows[0]?.total_income || 0);

  return {
    title: "Total Income",
    type: "income",
    amount: income,
    description: `You earned ₹${income} this month`,
  };
};

// 2. HIGHEST EXPENSE CATEGORY
const getHighestExpenseCategory = async (userId) => {
  const [rows] = await pool.query(
    `
    SELECT 
      C.title AS category_name,
      COALESCE(SUM(T.amount), 0) AS total_expense
    FROM splitease.transactions T
    JOIN splitease.categories C
      ON C.id = T.category_id
    WHERE T.user_id = ?
      AND T.type = 'expense'
      AND YEAR(T.transaction_date) = YEAR(CURDATE())
      AND MONTH(T.transaction_date) = MONTH(CURDATE())
    GROUP BY C.id, C.title
    ORDER BY total_expense DESC
    LIMIT 1
    `,
    [userId],
  );

  if (!rows.length) {
    return null;
  }

  const category = rows[0].category_name;
  const amount = Number(rows[0].total_expense);

  return {
    title: "Highest Expense Category",
    type: "expense-category",
    category,
    amount,
    description: `Most spending was on ${category} (₹${amount})`,
  };
};

// 3. OVER BUDGET CATEGORIES
const getOverBudgetCategories = async (userId) => {
  const [rows] = await pool.query(
    `
    SELECT 
      B.id,
      B.spent,
      B.budget_limit,
      C.title AS category_name,
      (B.spent - B.budget_limit) AS exceeded_amount
    FROM splitease.budgets B
    JOIN splitease.categories C
      ON C.id = B.category_id
    WHERE B.user_id = ?
      AND B.spent > B.budget_limit
    `,
    [userId],
  );

  return rows.map((item) => ({
    title: "Budget Exceeded",
    type: "budget-alert",
    category: item.category_name,
    exceededAmount: Number(item.exceeded_amount),
    spent: Number(item.spent),
    limit: Number(item.budget_limit),
    description: `${item.category_name} exceeded budget by ₹${Number(
      item.exceeded_amount,
    )}`,
  }));
};

// 4. EXPENSE VS INCOME
const compareExpensesToIncome = async (userId) => {
  const [rows] = await pool.query(
    `
    SELECT
      COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) AS total_income,
      COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) AS total_expense
    FROM splitease.transactions
    WHERE user_id = ?
      AND YEAR(transaction_date) = YEAR(CURDATE())
      AND MONTH(transaction_date) = MONTH(CURDATE())
    `,
    [userId],
  );

  const income = Number(rows[0]?.total_income || 0);
  const expense = Number(rows[0]?.total_expense || 0);

  const percentage =
    income > 0 ? Number(((expense / income) * 100).toFixed(1)) : 0;

  return {
    title: "Expense vs Income",
    type: "comparison",
    income,
    expense,
    percentage,
    description: `You spent ${percentage}% of your income this month`,
  };
};

/* =========================================================
   MAIN CONTROLLER
========================================================= */

export const getInsights = asyncHandler(async (req, res) => {
  const userId = req.user?.id || 1;

  const [
    totalIncome,
    highestExpenseCategory,
    overBudgetCategories,
    expenseVsIncome,
  ] = await Promise.all([
    getTotalMonthlyIncome(userId),
    getHighestExpenseCategory(userId),
    getOverBudgetCategories(userId),
    compareExpensesToIncome(userId),
  ]);

  const formattedInsights = [
    totalIncome,
    highestExpenseCategory,
    expenseVsIncome,
    ...overBudgetCategories,
  ].filter(Boolean);

  return res
    .status(200)
    .json(
      new ApiResponse(200, formattedInsights, "Insights fetched successfully"),
    );
});
