import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pkg from "pg";
import dotenv from 'dotenv';
const { Pool } = pkg;
const router = express.Router();
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'prof_db',
  password: 'new_password',
  port: 5432,
  ssl: false // Set to true if using SSL in production
});



router.post("/request", async (req, res) => {
  const { requester_id, receiver_id } = req.body;
  await pool.query("INSERT INTO connections (requester_id,receiver_id,status) VALUES ($1,$2,'pending')", [requester_id, receiver_id]);
  res.send("Request sent");
});
router.post("/accept", async (req, res) => {
  const { id } = req.body;
  await pool.query("UPDATE connections SET status='accepted' WHERE id=$1", [id]);
  res.send("Accepted");
});

export default router;

