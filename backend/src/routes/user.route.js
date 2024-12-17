const express = require("express");
const pool = require("../config/db");
const router = express.Router();
const asyncHandler = require("express-async-handler");

//1. register user
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    let { email, password } = req.body;
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",[email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Account exists." });
    }
    const newUser = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *", [email, password]
    );
    res.json({ message: "User added", user: newUser.rows[0] });
  })
);

// 2. Login user
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0 || user.rows[0].password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({ message: "User logged in", user: user.rows[0] });
  })
);

// 3. Logout user
router.post(
  "/logout",
  asyncHandler(async (req, res) => {
    res.json({ message: "Logout successful" });
  })
);

module.exports = router;