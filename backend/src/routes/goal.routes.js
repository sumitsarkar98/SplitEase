import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} from "../controllers/goal.controlers.js";

const router = express.Router();

// Protect route (IMPORTANT)
router.get("/", getGoals);
router.post("/", createGoal);
router.put("/:goalId", updateGoal);
router.delete("/:goalId", deleteGoal);

export default router;
