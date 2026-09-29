import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import hpp from "hpp";

import config from "./app/config/index.js";
import connectDatabase from "./app/config/db.js";
import errorHandler from "./app/middleware/errorHandler.js";
import authRouter from "./routes/authRoutes.js";
import riderRouter from "./routes/riderRoutes.js";

const app = express();

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(hpp());

// Rate limiting
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
    errors: [],
  },
});
app.use(globalLimiter);

// Body parsing
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Health check
app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Parcelio API is running",
    data: { timestamp: new Date().toISOString() },
  });
});

// API routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/rider", riderRouter);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    errors: [],
  });
});

// Centralized error handler
app.use(errorHandler);

// Start server
const startServer = async () => {
  await connectDatabase();

  app.listen(config.port, () => {
    console.log(`Parcelio server running on port ${config.port}`);
  });
};

startServer();

export default app;
