import express from "express";
import authMiiddleware from "../middlewares/auth.middleware.js";

import {
  getAllTransactions,
  newTransaction,
  editTransaction,
  deleteTransaction,
} from "../controllers/transaction.controllers.js";

const router = express.Router();

router.post("/", newTransaction);
router.get("/", getAllTransactions);
router.put("/:transactionId", editTransaction);
router.delete("/:transactionId", deleteTransaction);

export default router;
