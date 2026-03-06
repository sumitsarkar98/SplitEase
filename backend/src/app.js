import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/auth.routes.js";
import transactionRoutes from "./routes/transactions.routes.js";
import authMiddleware from "./middlewares/auth.middleware.js";

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
});

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/transactions", authMiddleware, transactionRoutes);

export default app;
