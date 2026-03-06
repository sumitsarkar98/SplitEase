import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  registerUser,
  loginUser,
  logout,
  secureMe,
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logout);
router.get("/me", authMiddleware, secureMe);

export default router;
