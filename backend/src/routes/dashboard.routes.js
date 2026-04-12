import express from "express";
import { periodMiddleware } from "../middlewares/period.middleware.js";
import {
  getCardData,
  getCategoryTransactions,
  getTrends,
  recentIncome,
} from "../controllers/dashboard.controllers.js";

const router = express.Router();

router.get("/card", periodMiddleware, getCardData);
router.get("/category", periodMiddleware, getCategoryTransactions);
router.get("/trends", periodMiddleware, getTrends);
router.get("/recent-income", periodMiddleware, recentIncome);

export default router;
