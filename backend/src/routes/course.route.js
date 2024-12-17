const express = require("express");
const pool = require("../config/db");
const router = express.Router();
const asyncHandler = require("express-async-handler");

//1. add course
router.post(
  "/",
  asyncHandler(async (req, res) => {
    let { name, code } = req.body;

    const newCourse = await pool.query(
      "INSERT INTO courses (course_name, course_code) VALUES ($1, $2) RETURNING *",
      [name, code]
    );
    res.json({ message: "Course added", course: newCourse.rows[0] });
  })
);

//2. get course
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const course = await pool.query("SELECT * FROM courses");
    res.json({ message: "Courses obtained", courses: course.rows });
  })
);

//3. get course name
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const course = await pool.query(
      "SELECT * FROM courses WHERE course_id=$1",
      [id]
    );
    res.json({ message: "Course obtained", courses: course.rows[0] });
  })
);

module.exports = router;
