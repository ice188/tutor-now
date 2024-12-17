const express = require("express");
const pool = require("../config/db");
const router = express.Router();
const asyncHandler = require("express-async-handler");

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
module.exports = router;
