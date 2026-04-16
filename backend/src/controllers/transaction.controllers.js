import pool from "../configs/db.config.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

/* ---------------- HELPERS ---------------- */

const updateGoalAmount = async (userId, goal_id, amountChange) => {
  if (!goal_id) return;

  await pool.execute(
    `
    UPDATE goals 
    SET saved_amount = GREATEST(saved_amount + ?, 0)
    WHERE id = ? AND user_id = ?
    `,
    [amountChange, goal_id, userId],
  );
};

const updateBudgetSpent = async (userId, category_id, amountChange, date) => {
  if (!category_id) return;

  const txMonth = new Date(date).getMonth() + 1;
  const txYear = new Date(date).getFullYear();

  const [budget] = await pool.execute(
    `
    SELECT id FROM budgets 
    WHERE user_id = ? 
    AND category_id = ? 
    AND month = ? 
    AND year = ?
    `,
    [userId, category_id, txMonth, txYear],
  );

  if (budget.length) {
    await pool.execute(
      `
      UPDATE budgets 
      SET spent = GREATEST(spent + ?, 0)
      WHERE id = ?
      `,
      [amountChange, budget[0].id],
    );
  }
};

// add transactions
const newTransaction = asyncHandler(async (req, res) => {
  const userId = req.user?.id || 1;

  const { category_id, goal_id, amount, note, transaction_date, type } =
    req.body;

  // validation
  if (!transaction_date || !type) {
    throw new ApiError(400, "type and transaction_date are required");
  }

  if (!amount || isNaN(amount) || amount <= 0) {
    throw new ApiError(400, "Valid amount is required");
  }

  const validTypes = ["income", "expense", "goal"];
  if (!validTypes.includes(type)) {
    throw new ApiError(400, "Invalid transaction type");
  }

  if (type === "expense" && !category_id) {
    throw new ApiError(400, "category_id required for expense");
  }

  if (type === "goal" && !goal_id) {
    throw new ApiError(400, "goal_id required for goal");
  }

  // insert
  const [result] = await pool.execute(
    `
    INSERT INTO transactions 
    (user_id, category_id, goal_id, type, amount, note, transaction_date)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      userId,
      category_id || null,
      goal_id || null,
      type,
      amount,
      note?.trim() || null,
      transaction_date,
    ],
  );

  // apply effect
  if (type === "goal") {
    await updateGoalAmount(userId, goal_id, amount);
  }

  if (type === "expense") {
    await updateBudgetSpent(userId, category_id, amount, transaction_date);
  }

  return res.status(201).json(
    new ApiResponse("Transaction created successfully", {
      id: result.insertId,
    }),
  );
});

// edit transactions
const editTransaction = asyncHandler(async (req, res) => {
  const userId = req.user?.id || 1;
  const { transactionId } = req.params;

  const { category_id, goal_id, amount, note, transaction_date, type } =
    req.body;

  const [rows] = await pool.execute(
    "SELECT * FROM transactions WHERE id = ? AND user_id = ?",
    [transactionId, userId],
  );

  if (!rows.length) throw new ApiError(404, "Transaction not found");

  const existing = rows[0];

  const updated = {
    category_id: category_id ?? existing.category_id,
    goal_id: goal_id ?? existing.goal_id,
    amount: amount ?? existing.amount,
    note: note ?? existing.note,
    transaction_date: transaction_date ?? existing.transaction_date,
    type: type ?? existing.type,
  };

  // validation on type switch
  if (updated.type === "expense" && !updated.category_id) {
    throw new ApiError(400, "category_id required for expense");
  }

  if (updated.type === "goal" && !updated.goal_id) {
    throw new ApiError(400, "goal_id required for goal");
  }

  // 🔁 reverse old
  if (existing.type === "goal") {
    await updateGoalAmount(userId, existing.goal_id, -existing.amount);
  }

  if (existing.type === "expense") {
    await updateBudgetSpent(
      userId,
      existing.category_id,
      -existing.amount,
      existing.transaction_date,
    );
  }

  // ➕ apply new
  if (updated.type === "goal") {
    await updateGoalAmount(userId, updated.goal_id, updated.amount);
  }

  if (updated.type === "expense") {
    await updateBudgetSpent(
      userId,
      updated.category_id,
      updated.amount,
      updated.transaction_date,
    );
  }

  // update transaction
  await pool.execute(
    `
    UPDATE transactions 
    SET category_id = ?, goal_id = ?, type = ?, amount = ?, note = ?, transaction_date = ?
    WHERE id = ? AND user_id = ?
    `,
    [
      updated.category_id || null,
      updated.goal_id || null,
      updated.type,
      updated.amount,
      updated.note,
      updated.transaction_date,
      transactionId,
      userId,
    ],
  );

  return res.status(200).json(
    new ApiResponse("Transaction updated successfully", {
      id: Number(transactionId),
    }),
  );
});

// delete transactions
const deleteTransaction = asyncHandler(async (req, res) => {
  const userId = req.user?.id || 1;
  const { transactionId } = req.params;

  const [rows] = await pool.execute(
    "SELECT * FROM transactions WHERE id = ? AND user_id = ?",
    [transactionId, userId],
  );

  if (!rows.length) throw new ApiError(404, "Transaction not found");

  const existing = rows[0];

  // reverse effect
  if (existing.type === "goal") {
    await updateGoalAmount(userId, existing.goal_id, -existing.amount);
  }

  if (existing.type === "expense") {
    await updateBudgetSpent(
      userId,
      existing.category_id,
      -existing.amount,
      existing.transaction_date,
    );
  }

  await pool.execute("DELETE FROM transactions WHERE id = ? AND user_id = ?", [
    transactionId,
    userId,
  ]);

  return res.status(200).json(
    new ApiResponse("Transaction deleted successfully", {
      id: Number(transactionId),
    }),
  );
});

// get all transactions
const getAllTransactions = asyncHandler(async (req, res) => {
  const userId = req.user?.id || 1;

  const [transactions] = await pool.execute(
    `
    SELECT *
    FROM transactions
    WHERE user_id = ?
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

export {
  newTransaction,
  editTransaction,
  deleteTransaction,
  getAllTransactions,
};
