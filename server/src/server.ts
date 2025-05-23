// backend/src/server.ts

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import blogRoutes from "./routes/blogRoutes";

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS for all origins (for development)
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Blog Platform Backend API is running!");
});

// Error handling middleware (optional, but good practice)
// This will catch any errors thrown by async routes
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  }
);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT}`);
});
