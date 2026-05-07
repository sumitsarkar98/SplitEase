import pool from "../configs/db.config.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const getCategories = asyncHandler(async (req, res) => {
  const [categories] = await pool.query("SELECT id,title,type FROM categories");
  if (!categories.length) throw new ApiError(404, "No categories found");
  res
    .status(200)
    .json(new ApiResponse("categories fetched successfully !", categories));
});

const getCategoryExpenses = asyncHandler(async (req, res) => {
  const userId = req.user?.id || 1;

  const [rows] = await pool.query(
    `SELECT
  C.id,
  C.title,
  T.type,
  COALESCE(SUM(T.amount), 0) AS total_amount
FROM splitease.transactions T
INNER JOIN splitease.categories C
  ON C.id = T.category_id
WHERE
  T.user_id = ?
  AND T.transaction_date >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
  AND T.transaction_date < DATE_ADD(DATE_FORMAT(CURDATE(), '%Y-%m-01'), INTERVAL 1 MONTH)
GROUP BY
  C.id, C.title, T.type`,
    [userId],
  );

  return res
    .status(200)
    .json(new ApiResponse("category expenses fetched successfully !", rows));
});



export { getCategories, getCategoryExpenses };
