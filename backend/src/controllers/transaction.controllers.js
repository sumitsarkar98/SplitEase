import pool from "../configs/db.config.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

/* CREATE NEW TRANSACTION */
const newTransaction = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  if (!userId) throw new ApiError(401, "Unauthorized access");

  const { category_id, amount, note, transaction_date } = req.body;

  if (
    !category_id ||
    amount == null ||
    !note?.trim() ||
    !transaction_date?.trim()
  ) {
    throw new ApiError(
      400,
      "Category, amount, note, and transaction date are required",
    );
  }

  const [result] = await pool.execute(
    "INSERT INTO transactions (user_id, category_id, amount, note, transaction_date) VALUES (?, ?, ?, ?, ?)",
    [userId, category_id, amount, note, transaction_date],
  );

  res
    .status(201)
    .json(new ApiResponse("Transaction created successfully", result));
});

/* GET ALL TRANSACTIONS */
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

  return res.status(200).json(
    new ApiResponse("Transactions fetched successfully", {
      transactions_count: transactions.length,
      transaction_details: transactions,
    }),
  );
});



export { getAllTransactions, newTransaction };
