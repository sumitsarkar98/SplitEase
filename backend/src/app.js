import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
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

// auth Routes
app.use("/api/v1/auth", userRoutes);

// Protected Featured Routes
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/transactions", transactionRoutes);

export default app;
