const express = require("express");
const pool = require("../config/db");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

//1. register user
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    let { email, password } = req.body;
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Account exists." });
    }
    const newUser = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, password]
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
    const token = jwt.sign(
      { user_id: user.rows[0].user_id, username: user.rows[0].username },
      "secret",
      { expiresIn: "12d" }
    );
    res.json({ message: "User logged in", token: token, user: user.rows[0] });
  })
);

// 3. Logout user
router.post(
  "/logout",
  asyncHandler(async (req, res) => {
    res.json({ message: "Logout successful" });
  })
);

// 4. login status
router.get("/status", async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.json({ isLoggedIn: false });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
    decoded.user_id,
  ]);
  if (user.rows.length > 0) {
    res.json({ isLoggedIn: true, user: user.rows[0] });
  } else {
    res.json({ isLoggedIn: false });
  }
});

module.exports = router;
