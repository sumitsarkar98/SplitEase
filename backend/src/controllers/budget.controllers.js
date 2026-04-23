import pool from "../configs/db.config.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

// GET ALL BUDGETS
const getBudgets = asyncHandler(async (req, res) => {
  const userId = req.user?.id || 1;

  let { month, viewAll } = req.query;

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  let query = `
    SELECT 
      b.id,
      c.title AS category,
      b.budget_limit AS budgetLimit,
      b.spent,
      b.month,

      CASE
        WHEN (b.year < YEAR(CURDATE())) 
          OR (b.year = YEAR(CURDATE()) AND b.month < MONTH(CURDATE())) 
          THEN 'expired'

        WHEN b.spent >= b.budget_limit 
          THEN 'exceeded'

        ELSE 'active'
      END AS status

    FROM budgets b
    LEFT JOIN categories c 
      ON b.category_id = c.id
    WHERE b.user_id = ?
    AND b.year = ?
  `;

  const params = [userId, currentYear];

  // DEFAULT → current month only
  if (!viewAll) {
    query += ` AND b.month = ?`;
    params.push(currentMonth);
  }

  // OPTIONAL → specific month filter
  if (month) {
    query += ` AND b.month = ?`;
    params.push(Number(month));
  }

  query += ` ORDER BY b.month ASC`;

  const [rows] = await pool.execute(query, params);

  return res.status(200).json(
    new ApiResponse("Budgets retrieved successfully", {
      total: rows.length,
      budgets: rows,
    }),
  );
});
// CREATE NEW BUDGET
const createBudget = asyncHandler(async (req, res) => {
  const userId = req.user?.id || 1;

  const { category_id, budget_limit, month } = req.body;

  if (!category_id || !budget_limit || !month) {
    throw new ApiError(
      400,
      "category_id, budget_limit, and month are required",
    );
  }

  //  Prevent duplicate budget
  const [existing] = await pool.execute(
    `SELECT id FROM budgets 
     WHERE user_id = ? 
     AND category_id = ? 
     AND month = ? 
     AND year = YEAR(CURDATE())`,
    [userId, category_id, month],
  );

  if (existing.length) {
    throw new ApiError(400, "Budget already exists for this category & month");
  }

  const [result] = await pool.execute(
    `
    INSERT INTO budgets (user_id, category_id, budget_limit, month, year)
    VALUES (?, ?, ?, ?, YEAR(CURDATE()))
    `,
    [userId, category_id, budget_limit, month],
  );

  if (result.affectedRows === 0) {
    throw new ApiError(500, "Failed to create budget");
  }

  return res.status(201).json(
    new ApiResponse("Budget created successfully", {
      id: result.insertId,
    }),
  );
});

// UPDATE EXISTING BUDGET
const updateBudget = asyncHandler(async (req, res) => {
  const userId = req.user?.id || 1;
  const { budgetId } = req.params;

  const { budget_limit, month } = req.body;

  const [rows] = await pool.execute(
    `SELECT * FROM budgets WHERE id = ? AND user_id = ?`,
    [budgetId, userId],
  );

  if (!rows.length) {
    throw new ApiError(404, "Budget not found");
  }

  const existing = rows[0];

  const updatedMonth = month ?? existing.month;

  // Prevent duplicate (same category, since category is fixed)
  const [duplicate] = await pool.execute(
    `SELECT id FROM budgets 
     WHERE user_id = ? 
     AND category_id = ? 
     AND month = ? 
     AND year = YEAR(CURDATE())
     AND id != ?`,
    [userId, existing.category_id, updatedMonth, budgetId],
  );

  if (duplicate.length) {
    throw new ApiError(
      400,
      "Another budget already exists for this category & month",
    );
  }

  const [result] = await pool.execute(
    `
    UPDATE budgets 
    SET 
      budget_limit = ?, 
      month = ?
    WHERE id = ? AND user_id = ?
    `,
    [budget_limit ?? existing.budget_limit, updatedMonth, budgetId, userId],
  );

  if (result.affectedRows === 0) {
    throw new ApiError(500, "Failed to update budget");
  }

  return res.status(200).json(
    new ApiResponse("Budget updated successfully", {
      id: Number(budgetId),
    }),
  );
});

// DELETE BUDGET
const deleteBudget = asyncHandler(async (req, res) => {
  const userId = req.user?.id || 1;
  const { budgetId } = req.params;

  const [result] = await pool.execute(
    "DELETE FROM budgets WHERE id = ? AND user_id = ?",
    [budgetId, userId],
  );

  if (result.affectedRows === 0) {
    throw new ApiError(404, "Budget not found or unauthorized");
  }

  return res.status(200).json(
    new ApiResponse("Budget deleted successfully", {
      id: Number(budgetId),
    }),
  );
});

export { getBudgets, createBudget, updateBudget, deleteBudget };
