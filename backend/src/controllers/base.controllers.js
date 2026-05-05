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

export { getCategories };
