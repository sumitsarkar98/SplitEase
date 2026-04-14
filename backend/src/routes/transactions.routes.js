import express from "express";
import authMiiddleware from "../middlewares/auth.middleware.js";

import {
  getAllTransactions,
  newTransaction,
  editTransaction,
  deleteTransaction,
} from "../controllers/transaction.controllers.js";

const router = express.Router();

router.post("/new", newTransaction);
router.get("/all", getAllTransactions);
router.put("/edit/:transactionId", editTransaction);
router.delete("/delete/:transactionId", deleteTransaction);

export default router;
