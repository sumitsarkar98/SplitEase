import pool from "../configs/db.config.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const getGoals = asyncHandler(async (req, res) => {
  const userId = req.user?.id || 1;

  if (!userId) {
    throw new ApiError(401, "Unauthorized access");
  }

  let { month } = req.query;

  // convert to number
  month = month ? parseInt(month) : null;

  let query = `
    SELECT 
      b.id,
      c.title AS category,
      b.budget_limit AS budgetLimit,
      b.spent,
      b.month
    FROM budgets b
    LEFT JOIN categories c 
      ON b.category_id = c.id
    WHERE 
      b.user_id = ?
      AND b.year = YEAR(CURDATE())
  `;

  const params = [userId];

  // safer check
  if (month !== null && !isNaN(month)) {
    query += ` AND b.month = ?`;
    params.push(month);
  }

  query += ` ORDER BY b.month ASC`;

  const [rows] = await pool.execute(query, params);

  if (!rows.length) {
    return res.status(200).json(
      new ApiResponse("user has no budgets yet", {
        user_id: userId,
        budgets: [],
      }),
    );
  }

  return res.status(200).json(
    new ApiResponse("Budgets retrieved successfully", {
      total: rows.length,
      budgets: rows,
    }),
  );
});

export { getGoals };
