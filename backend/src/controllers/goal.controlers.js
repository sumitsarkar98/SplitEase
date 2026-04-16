import pool from "../configs/db.config.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

// GET ALL GOALS
const getGoals = asyncHandler(async (req, res) => {
  const userId = req.user?.id || 1;

  let query = `
    SELECT 
      id,
      title,
      target_amount AS targetAmount,
      saved_amount AS savedAmount,
      target_date AS targetDate,

      CASE
        WHEN saved_amount >= target_amount THEN 'completed'
        ELSE 'active'
      END AS status

    FROM goals
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  const [rows] = await pool.execute(query, [userId]);

  return res.status(200).json(
    new ApiResponse(
      rows.length ? "Goals retrieved successfully" : "No goals found",
      {
        total: rows.length,
        goals: rows,
      },
    ),
  );
});

// CREATE GOAL
const createGoal = asyncHandler(async (req, res) => {
  const userId = req.user?.id || 1;

  const { title, target_amount, target_date } = req.body;

  if (!title || !target_amount) {
    throw new ApiError(400, "title and target_amount are required");
  }

  const [result] = await pool.execute(
    `
    INSERT INTO goals (user_id, title, target_amount, target_date)
    VALUES (?, ?, ?, ?)
    `,
    [userId, title, target_amount, target_date || null],
  );

  if (result.affectedRows === 0) {
    throw new ApiError(500, "Failed to create goal");
  }

  return res.status(201).json(
    new ApiResponse("Goal created successfully", {
      id: result.insertId,
    }),
  );
});

// UPDATE GOAL
const updateGoal = asyncHandler(async (req, res) => {
  const userId = req.user?.id || 1;
  const { goalId } = req.params;

  const { title, target_amount, saved_amount, target_date } = req.body;

  const [rows] = await pool.execute(
    `SELECT * FROM goals WHERE id = ? AND user_id = ?`,
    [goalId, userId],
  );

  if (!rows.length) {
    throw new ApiError(404, "Goal not found");
  }

  const existing = rows[0];

  const updatedData = {
    title: title ?? existing.title,
    target_amount: target_amount ?? existing.target_amount,
    saved_amount: saved_amount ?? existing.saved_amount,
    target_date: target_date ?? existing.target_date,
  };

  const [result] = await pool.execute(
    `
    UPDATE goals 
    SET 
      title = ?, 
      target_amount = ?, 
      saved_amount = ?, 
      target_date = ?
    WHERE id = ? AND user_id = ?
    `,
    [
      updatedData.title,
      updatedData.target_amount,
      updatedData.saved_amount,
      updatedData.target_date,
      goalId,
      userId,
    ],
  );

  if (result.affectedRows === 0) {
    throw new ApiError(500, "Failed to update goal");
  }

  return res.status(200).json(
    new ApiResponse("Goal updated successfully", {
      id: Number(goalId),
    }),
  );
});

// DELETE GOAL
const deleteGoal = asyncHandler(async (req, res) => {
  const userId = req.user?.id || 1;
  const { goalId } = req.params;

  const [result] = await pool.execute(
    `DELETE FROM goals WHERE id = ? AND user_id = ?`,
    [goalId, userId],
  );

  if (result.affectedRows === 0) {
    throw new ApiError(404, "Goal not found or unauthorized");
  }

  return res.status(200).json(
    new ApiResponse("Goal deleted successfully", {
      id: Number(goalId),
    }),
  );
});

export { getGoals, createGoal, updateGoal, deleteGoal };
