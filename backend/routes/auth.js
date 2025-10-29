import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pkg from "pg";
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


router.post("/register", async (req, res) => {
  const { name, email, password, role, location, bio } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await pool.query("INSERT INTO users (name,email,password,role,location,bio) VALUES ($1,$2,$3,$4,$5,$6)",
  [name, email, hashed, role, location, bio]);
  res.send("User registered");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
  if (!user.rows.length) return res.status(400).send("No user");
  const valid = await bcrypt.compare(password, user.rows[0].password);
  if (!valid) return res.status(400).send("Wrong password");
  const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET);
  res.json({ token });
});

export default router;
