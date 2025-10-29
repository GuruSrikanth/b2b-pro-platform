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


router.get("/", async (req, res) => {
  const result = await pool.query("SELECT id,name,role,location,bio FROM users");
  res.json(result.rows);
});

export default router;
