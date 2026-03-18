import express from "express";
import authMiiddleware from "../middlewares/auth.middleware.js";

import {
  newTransaction,
  getAllTransactions,
} from "../controllers/transaction.controllers.js";

const router = express.Router();

router.post("/new", authMiiddleware, newTransaction);
router.get("/all", authMiiddleware, getAllTransactions);

export default router;
