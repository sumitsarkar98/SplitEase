import pool from "../configs/db.config.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

/* CREATE NEW TRANSACTION */
const newTransaction = asyncHandler(async (req, res) => {
  const userId = req.user?.id || 1;

  if (!userId) throw new ApiError(401, "Unauthorized access");

  const { category_id, amount, note, transaction_date, type } = req.body;

  // Validation
  if (!category_id || !transaction_date || !type) {
    throw new ApiError(
      400,
      "Category, type, and transaction date are required",
    );
  }

  if (!amount || isNaN(amount) || amount <= 0) {
    throw new ApiError(400, "Valid amount is required");
  }

  const validTypes = ["income", "expense", "goal"];
  if (!validTypes.includes(type)) {
    throw new ApiError(400, "Invalid transaction type");
  }

  const noteValue = note?.trim() || null;

  const [result] = await pool.execute(
    `INSERT INTO transactions 
    (user_id, category_id, amount, note, transaction_date, type) 
    VALUES (?, ?, ?, ?, ?, ?)`,
    [userId, category_id, amount, noteValue, transaction_date, type],
  );

  return res.status(201).json(
    new ApiResponse("Transaction created successfully", {
      id: result.insertId,
      user_id: userId,
      category_id,
      amount: Number(amount),
      note: noteValue,
      transaction_date,
      type,
    }),
  );
});

/* GET ALL TRANSACTIONS (with pagination + category) */
const getAllTransactions = asyncHandler(async (req, res) => {
  const userId = req.user?.id || 1;

  if (!userId) throw new ApiError(401, "Unauthorized access");

  const baseQuery = `
    FROM transactions
    WHERE user_id = ?
  `;

  const [transactions] = await pool.execute(
    `
    SELECT *
    ${baseQuery}
    ORDER BY transaction_date DESC
    LIMIT 10
    `,
    [userId],
  );

  return res.status(200).json(
    new ApiResponse("Transactions fetched successfully", {
      transactions_count: transactions.length,
      transaction_details: transactions,
    }),
  );
});

/* EDIT TRANSACTION */
const editTransaction = asyncHandler(async (req, res) => {
  const userId = req.user?.id || 1;

  if (!userId) throw new ApiError(401, "Unauthorized access");

  const { transactionId } = req.params;
  const { category_id, amount, note, transaction_date, type } = req.body;

  // 1. Get existing transaction
  const [rows] = await pool.execute(
    "SELECT * FROM transactions WHERE id = ? AND user_id = ?",
    [transactionId, userId],
  );

  if (!rows.length) {
    throw new ApiError(404, "Transaction not found");
  }

  const existing = rows[0];

  // 2. Merge (fallback to old values if not provided)
  const updatedData = {
    category_id: category_id ?? existing.category_id,
    amount: amount ?? existing.amount,
    note: note ?? existing.note,
    transaction_date: transaction_date ?? existing.transaction_date,
    type: type ?? existing.type,
  };

  // Optional validation
  if (updatedData.amount <= 0) {
    throw new ApiError(400, "Valid amount is required");
  }

  // 3. Update
  await pool.execute(
    `
    UPDATE transactions 
    SET category_id = ?, amount = ?, note = ?, transaction_date = ?, type = ?
    WHERE id = ? AND user_id = ?
    `,
    [
      updatedData.category_id,
      updatedData.amount,
      updatedData.note,
      updatedData.transaction_date,
      updatedData.type,
      transactionId,
      userId,
    ],
  );

  return res.status(200).json(
    new ApiResponse("Transaction updated successfully", {
      id: Number(transactionId),
      ...updatedData,
    }),
  );
});

/* DELETE TRANSACTION */
const deleteTransaction = asyncHandler(async (req, res) => {
  const userId = req.user?.id || 1;

  if (!userId) throw new ApiError(401, "Unauthorized access");

  const { transactionId } = req.params;

  const [result] = await pool.execute(
    "DELETE FROM transactions WHERE id = ? AND user_id = ?",
    [transactionId, userId],
  );

  if (result.affectedRows === 0) {
    throw new ApiError(404, "Transaction not found or unauthorized");
  }

  return res.status(200).json(
    new ApiResponse("Transaction deleted successfully", {
      id: Number(transactionId),
    }),
  );
});

export {
  getAllTransactions,
  newTransaction,
  editTransaction,
  deleteTransaction,
};
