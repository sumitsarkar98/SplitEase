import pool from "../configs/db.config.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const getCardData = asyncHandler(async (req, res) => {
  const userId = req.user?.id || 1;
  let period = req.period;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  if (!["weekly", "monthly", "yearly"].includes(period)) {
    period = "monthly";
  }

  // ===== DATE FILTER =====
  let dateFilter = "";

  if (period === "weekly") {
    dateFilter = "AND t.created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)";
  } else if (period === "monthly") {
    dateFilter = `
      AND MONTH(t.created_at) = MONTH(CURDATE()) 
      AND YEAR(t.created_at) = YEAR(CURDATE())
    `;
  } else if (period === "yearly") {
    dateFilter = "AND YEAR(t.created_at) = YEAR(CURDATE())";
  }

  // ===== SQL QUERY =====
  const query = `
    SELECT 
        t.user_id,

        SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END) -
        SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END) -
        SUM(CASE WHEN t.type = 'goal' THEN t.amount ELSE 0 END) 
        AS available_balance,

        SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END) 
        AS total_spending,

        SUM(CASE WHEN t.type = 'goal' THEN t.amount ELSE 0 END) 
        AS goal_progress,

        ROUND(
            (SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END) /
            NULLIF(SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END),0)) * 100
        ,2) AS spending_percentage,

        ROUND(
            (SUM(CASE WHEN t.type = 'goal' THEN t.amount ELSE 0 END) /
            NULLIF(SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END),0)) * 100
        ,2) AS goal_percentage,

        ROUND(
            (
                (SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END) -
                 SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END) -
                 SUM(CASE WHEN t.type = 'goal' THEN t.amount ELSE 0 END)
                ) /
                NULLIF(SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END),0)
            ) * 100
        ,2) AS balance_percentage,

        (
            SELECT c.title
            FROM transactions t2
            JOIN categories c ON t2.category_id = c.id
            WHERE t2.user_id = t.user_id
              AND t2.type = 'expense'
           ${dateFilter.replace(/t\./g, "t2.")}
            GROUP BY c.title
            ORDER BY SUM(t2.amount) DESC
            LIMIT 1
        ) AS top_category,

        (
            SELECT ROUND(
                SUM(t2.amount) /
                NULLIF(
                    (SELECT SUM(amount) 
                     FROM transactions 
                     WHERE user_id = t.user_id 
                       AND type = 'expense'
                       ${dateFilter.replace(/t\./g, "transactions.")}
                    ),0
                ) * 100
            ,2)
            FROM transactions t2
            WHERE t2.user_id = t.user_id
              AND t2.type = 'expense'
              ${dateFilter.replace(/t\./g, "t2.")}
            GROUP BY t2.category_id
            ORDER BY SUM(t2.amount) DESC
            LIMIT 1
        ) AS topcategory_percentage

    FROM transactions t
    WHERE t.user_id = ?
    ${dateFilter}
    GROUP BY t.user_id;
  `;

  // ===== EXECUTE =====
  const [rows] = await pool.execute(query, [userId]);
  if (!rows.length) {
    throw new ApiError(404, "data not found");
  }

  const safeData = rows[0];

  // ===== RESPONSE FORMAT =====
  const OverviewData = [
    {
      title: "available_balance",
      value: parseFloat(safeData.available_balance) || 0,
      percentage: parseFloat(safeData.balance_percentage) || 0,
    },
    {
      title: "total_spending",
      value: parseFloat(safeData.total_spending) || 0,
      percentage: parseFloat(safeData.spending_percentage) || 0,
    },
    {
      title: "top_category",
      value: safeData.top_category || "N/A",
      percentage: parseFloat(safeData.topcategory_percentage) || 0,
    },
    {
      title: "goal_progress",
      value: parseFloat(safeData.goal_progress) || 0,
      percentage: parseFloat(safeData.goal_percentage) || 0,
    },
  ];

  return res.status(200).json(
    new ApiResponse("overviewcard data retrieved successfully", {
      user_id: userId,
      period,
      overview: OverviewData,
    }),
  );
});

const getCategoryTransactions = asyncHandler(async (req, res) => {
  const userId = req.user?.id || 1;
  let period = req.period;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  if (!["weekly", "monthly", "yearly"].includes(period)) {
    period = "monthly";
  }

  // ===== DATE FILTER =====
  let dateFilter = "";

  if (period === "weekly") {
    dateFilter = "AND t.created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)";
  } else if (period === "monthly") {
    dateFilter = `
      AND MONTH(t.created_at) = MONTH(CURDATE()) 
      AND YEAR(t.created_at) = YEAR(CURDATE())
    `;
  } else if (period === "yearly") {
    dateFilter = "AND YEAR(t.created_at) = YEAR(CURDATE())";
  }

  // ===== QUERY =====
  const query = `
    SELECT 
      c.title,
      SUM(t.amount) AS total_expense
    FROM transactions t
    INNER JOIN categories c
      ON t.category_id = c.id
    WHERE 
      t.type = 'expense'
      AND t.user_id = ?
      ${dateFilter}
    GROUP BY t.category_id, c.title
  `;

  // ===== EXECUTE =====
  const [rows] = await pool.execute(query, [userId]);

  if (!rows.length) {
    throw new ApiError(404, "data not found");
  }
  const safedata = rows;

  return res.status(200).json(
    new ApiResponse("category expenses data retrieved successfully", {
      user_id: userId,
      period,
      data: safedata,
    }),
  );
});

export { getCardData, getCategoryTransactions };
