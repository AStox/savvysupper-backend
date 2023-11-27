import express from "express";
import pool from "./db";
import { vectorDBClient } from "./vectorDB";
import dotenv from "dotenv";
import { getMeal } from "./api";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    res.json(users.rows);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(500).send("Server error");
    } else {
      console.error("Unexpected error", err);
      res.status(500).send("Unexpected server error");
    }
  }
});

app.get("/api/queryVectorDB", async (req, res) => {
  try {
    const count = 10;
    const query = (req.query.q as string) || "";
    const results = await vectorDBClient.query(query, count);
    // results.sort

    res.json(results);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/getMeal", getMeal);

export default app;
