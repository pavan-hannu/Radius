import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo.js";
import { handleLogin, handleVerifyToken, handleLogout } from "./routes/auth.js";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  // Authentication routes
  app.post("/api/auth/login", handleLogin);
  app.get("/api/auth/verify", handleVerifyToken);
  app.post("/api/auth/logout", handleLogout);

  // Example API routes
  app.get("/api/demo", handleDemo);

  return app;
}
