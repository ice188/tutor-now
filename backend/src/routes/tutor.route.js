const express = require("express");
const pool = require("../config/db");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

//1. add tutor
router.post(
  "/",
  asyncHandler(async (req, res) => {
    let { name, email, courses } = req.body;

    const newTutor = await pool.query(
      "INSERT INTO tutors (tutor_name, email, courses) VALUES ($1, $2, $3) RETURNING *",
      [name, email, courses]
    );
    res.json({ message: "Tutor added", tutor: newTutor.rows[0] });
  })
);

//2. get tutor
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const tutors = await pool.query("SELECT * FROM tutors");
    res.json({ message: "Tutor obtained", tutors: tutors.rows });
  })
);

//3. get tutor by id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const tutor = await pool.query("SELECT * FROM tutors WHERE tutor_id=$1", [
      id,
    ]);
    res.json({ message: "Tutor obtained", tutor: tutor.rows[0] });
  })
);

//4. login tutor
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const tutor = await pool.query("SELECT * FROM tutors WHERE email = $1", [
      email,
    ]);
    if (tutor.rows.length === 0 || tutor.rows[0].password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { tutor_id: tutor.rows[0].tutor_id, tutorname: tutor.rows[0].tutorname },
      "tutor-secret",
      { expiresIn: "12d" }
    );
    res.json({
      message: "Tutor logged in",
      token: token,
      tutor: tutor.rows[0],
    });
  })
);

// 5. Login status
router.get("/auth/status", async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.json({ isLoggedIn: false, tutor: null });
  }
  const decoded = jwt.verify(token, "tutor-secret");
 
  const tutor = await pool.query("SELECT * FROM tutors WHERE tutor_id = $1", [
    decoded.tutor_id,
  ]);
  if (tutor.rows.length > 0) {
    res.json({ isLoggedIn: true, tutor: tutor.rows[0] });
  } else {
    res.json({ isLoggedIn: false, tutor: null });
  }
});
module.exports = router;
