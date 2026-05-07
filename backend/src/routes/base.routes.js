import express from "express";
import {
  getCategories,
  getCategoryExpenses,
} from "../controllers/base.controllers.js";
import { getInsights } from "../controllers/insight.controllers.js";

const router = express.Router();

// Basic Route
router.get("/allcategories", getCategories);

router.get("/categoryexpenses", getCategoryExpenses);

router.get("/insights", getInsights);

export default router;
