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

  console.log("🆔 Goal ID:", goalId);
  console.log("📥 Incoming body:", req.body);

  const { title, target_amount, saved_amount, target_date } = req.body;

  // 🔍 Fetch existing goal
  const [rows] = await pool.execute(
    `SELECT * FROM goals WHERE id = ? AND user_id = ?`,
    [goalId, userId],
  );

  if (!rows.length) {
    throw new ApiError(404, "Goal not found");
  }

  const existing = rows[0];

  // 🛠️ Format date safely for MySQL (YYYY-MM-DD)
  const formatDate = (date) => {
    if (!date) return null;

    const d = new Date(date);
    if (isNaN(d.getTime())) return existing.target_date; // invalid date fallback

    return d.toISOString().split("T")[0];
  };

  // 🧠 Prepare safe updated data
  const updatedData = {
    title: title ?? existing.title,

    target_amount:
      target_amount !== undefined && !isNaN(Number(target_amount))
        ? Number(target_amount)
        : existing.target_amount,

    // ⚠️ Only update if provided (optional)
    saved_amount:
      saved_amount !== undefined && !isNaN(Number(saved_amount))
        ? Number(saved_amount)
        : existing.saved_amount,

    target_date:
      target_date === "" || target_date === undefined
        ? null
        : formatDate(target_date),
  };

  console.log("📦 FINAL UPDATE DATA:", updatedData);

  try {
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
  } catch (err) {
    console.error("DB ERROR:", err);
    throw new ApiError(500, "Database update failed");
  }
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
