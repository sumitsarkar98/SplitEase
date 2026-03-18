import express from "express";
import { periodMiddleware } from "../middlewares/period.middleware.js";
import {
  getCardData,
  getCategoryTransactions,
} from "../controllers/dashboard.controllers.js";

const router = express.Router();

router.get("/card", periodMiddleware, getCardData);
router.get("/category", periodMiddleware, getCategoryTransactions);

export default router;
