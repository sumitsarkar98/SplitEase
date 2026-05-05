import express from "express";
import { getCategories } from "../controllers/base.controllers.js";

const router = express.Router();

// Basic Route
router.get("/allcategories", getCategories);

export default router;
