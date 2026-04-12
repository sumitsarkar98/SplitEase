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
        SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END) 
        AS savings,

        SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END) 
        AS total_spending,

        SUM(CASE WHEN t.type = 'goal' THEN t.amount ELSE 0 END) 
        AS goal_progress,

        ROUND(
            (SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END) /
            NULLIF(SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END),0)) * 100
        ,2) AS spending_percentage,


        ROUND(
            (
                (SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END) -
                 SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END)
                ) /
                NULLIF(SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END),0)
            ) * 100
        ,2) AS savings_percentage,

        -- % of income allocated to goals
        ROUND(
            (SUM(CASE WHEN t.type = 'goal' THEN t.amount ELSE 0 END) /
            NULLIF(SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END),0)) * 100
        ,2) AS goal_percentage

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
      title: "savings",
      value: parseFloat(safeData.savings) || 0,
      percentage: parseFloat(safeData.savings_percentage) || 0,
    },
    {
      title: "spending",
      value: parseFloat(safeData.total_spending) || 0,
      percentage: parseFloat(safeData.spending_percentage) || 0,
    },
    {
      title: "goal",
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
    t.type,
    SUM(t.amount) AS total
  FROM transactions t
  INNER JOIN categories c
    ON t.category_id = c.id
  WHERE 
    t.user_id = ?
    ${dateFilter}
  GROUP BY t.category_id, c.title, t.type
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

const getTrends = asyncHandler(async (req, res) => {
  const userId = req.user?.id || 1;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  const query = `
  SELECT 
    MONTH(t.transaction_date) AS month,

    SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END) AS income,

    SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END) AS expense

  FROM transactions t

  WHERE 
    t.user_id = ?
    AND YEAR(t.transaction_date) = YEAR(CURDATE())

  GROUP BY MONTH(t.transaction_date)
  ORDER BY month ASC;
`;

  const [rows] = await pool.execute(query, [userId]);

  if (!rows.length) {
    throw new ApiError(404, "No trend data found");
  }

  // optional: map month number → name
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formatted = rows.map((row) => ({
    month: monthNames[row.month - 1],
    income: Number(row.income) || 0,
    expense: Number(row.expense) || 0,
  }));

  return res.status(200).json(
    new ApiResponse("Trends retrieved successfully", {
      user_id: userId,
      year: new Date().getFullYear(),
      data: formatted,
    }),
  );
});

const recentIncome = asyncHandler(async (req, res) => {
  const userId = req.user?.id || 1;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  const query = `
    SELECT 
      t.id,
      t.amount,
      t.note,
      t.type,
      t.transaction_date,
      c.title AS category
    FROM transactions t
    LEFT JOIN categories c 
      ON t.category_id = c.id
    WHERE 
      t.user_id = ?
      AND t.type = 'income'
      AND MONTH(t.transaction_date) = MONTH(CURDATE())
      AND YEAR(t.transaction_date) = YEAR(CURDATE())
    ORDER BY t.transaction_date DESC
    LIMIT 5;
  `;

  const [rows] = await pool.execute(query, [userId]);

  if (!rows.length) {
    throw new ApiError(404, "No recent income found");
  }

  const formatted = rows.map((item) => ({
    id: item.id,
    amount: Number(item.amount),
    category: item.category || "Other",
    type: item.type || "unknown",
    note: item.note || "",
    date: item.transaction_date,
  }));

  return res.status(200).json(
    new ApiResponse("Recent income retrieved successfully", {
      user_id: userId,
      count: formatted.length,
      data: formatted,
    }),
  );
});

export { getCardData, getCategoryTransactions, getTrends, recentIncome };
