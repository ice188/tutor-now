const express = require("express");
const pool = require("../config/db");
const router = express.Router();
const asyncHandler = require("express-async-handler");

//1. add tutorial
router.post(
  "/",
  asyncHandler(async (req, res) => {
    let { location, tid, cid, capacity, spots, time, tutor_date, frequency } = req.body;

    const newTutorial = await pool.query(
      "INSERT INTO tutorials (tutoring_location, tutor_id, course_id, capacity, spots_remaining, session_time, tutor_date, frequency) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [location, tid, cid, capacity, spots, time, tutor_date, frequency]
    );
    res.json({ message: "Tutorial added", tutorial: newTutorial.rows[0] });
  })
);

//2. get tutorials
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const tutorials = await pool.query("SELECT * FROM tutorials");
    res.json({ message: "Tutorials obtained", tutorials: tutorials.rows });
  })
);

//3. get tutorials by course id
router.get(
  "/:id",
  
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const tutorials = await pool.query(
      "SELECT * FROM tutorials WHERE course_id = $1",
      [id]
    );
    res.json({ message: "Tutorials obtained", tutorials: tutorials.rows });
  })
);

module.exports = router;