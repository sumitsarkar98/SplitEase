import express from "express";
import { getAllTransactions } from "../controllers/transaction.controllers.js";
import { getAllExpenses } from "../controllers/transaction.controllers.js";

const router = express.Router();

router.get("/all", getAllTransactions);
router.get("/expenses", getAllExpenses);

export default router;
