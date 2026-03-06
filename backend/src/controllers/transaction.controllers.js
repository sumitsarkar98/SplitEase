import pool from "../configs/db.config.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

/* ======================================================
   GET ALL TRANSACTIONS (with filters + pagination)
====================================================== */
const getAllTransactions = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  if (!userId) throw new ApiError(401, "Unauthorized access");

  const baseQuery = `
    FROM transactions
    WHERE user_id = ?
  `;

  // Get all transactions
  const [transactions] = await pool.execute(
    `SELECT * ${baseQuery}
     ORDER BY transaction_date DESC`,
    [userId],
  );

  // Get summary
  const [summaryResult] = await pool.execute(
    `SELECT 
      COALESCE(SUM(CASE WHEN type='income' THEN amount END),0) AS total_income,
      COALESCE(SUM(CASE WHEN type='expense' THEN amount END),0) AS total_expense,
      COALESCE(SUM(CASE WHEN type='income' THEN amount ELSE -amount END),0) AS balance
     ${baseQuery}`,
    [userId],
  );

  const summary = summaryResult[0];

  return res.status(200).json(
    new ApiResponse("Transactions fetched successfully", {
      transactions,
      summary,
    }),
  );
});

/* ======================================================
   GET ALL EXPENSES
====================================================== */
const getAllExpenses = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  if (!userId) throw new ApiError(401, "Unauthorized access");

  const { startDate, endDate } = req.query;

  let query = `
    SELECT *
    FROM transactions
    WHERE user_id = ?
    AND type = 'expense'
  `;

  const values = [userId];

  if (startDate && endDate) {
    query += ` AND transaction_date BETWEEN ? AND ?`;
    values.push(startDate, endDate);
  }

  query += ` ORDER BY transaction_date DESC LIMIT 10`;

  const [expenses] = await pool.execute(query, values);

  return res
    .status(200)
    .json(new ApiResponse("Expenses fetched successfully", { expenses }));
});

/* ======================================================
   GET ALL INCOME
====================================================== */
/* ======================================================
   GET SINGLE TRANSACTION
====================================================== */
/* ======================================================
   CREATE TRANSACTION
====================================================== */
/* ======================================================
   UPDATE TRANSACTION
====================================================== */
/* ======================================================
   DELETE TRANSACTION
====================================================== */

export { getAllTransactions, getAllExpenses };
