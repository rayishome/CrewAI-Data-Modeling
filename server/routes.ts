import type { Express } from "express";
import { createServer } from "http";
import { analyzeCrew } from "./lib/crewai";

export function registerRoutes(app: Express) {
  app.post("/api/analyze", async (req, res) => {
    try {
      const { apiKey, tableSchemas, businessProblems } = req.body;

      if (!apiKey || !tableSchemas || !businessProblems) {
        return res.status(400).send("Missing required fields");
      }

      const results = await analyzeCrew({
        apiKey,
        tableSchemas,
        businessProblems,
      });

      res.json(results);
    } catch (error) {
      console.error("Analysis error:", error);
      res.status(500).send(error.message);
    }
  });

  return createServer(app);
}
