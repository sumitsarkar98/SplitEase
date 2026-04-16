import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
} from "../controllers/budget.controllers.js";

const router = express.Router();

// Protect route (IMPORTANT)
router.get("/", getBudgets);
router.post("/", createBudget);
router.put("/:budgetId", updateBudget);
router.delete("/:budgetId", deleteBudget);

export default router;
