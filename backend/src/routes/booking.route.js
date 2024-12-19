const express = require("express");
const pool = require("../config/db");
const router = express.Router();
const asyncHandler = require("express-async-handler");

//1. create booking
router.post(
  "/",
  asyncHandler(async (req, res) => {
    let { uid, tid } = req.body;

    const newBooking = await pool.query(
      "INSERT INTO bookings (user_id, tutorial_id) VALUES ($1, $2) RETURNING *",
      [uid, tid]
    );
    res.json({
      message: "Booking added.",
      booking: newBooking.rows[0],
    });
  })
);

//2. fetch booking by user id
router.get(
  "/:uid",
  asyncHandler(async (req, res) => {
    let { uid } = req.params;

    const bookings = await pool.query(
      "SELECT * FROM bookings WHERE user_id = $1",
      [uid]
    );
    res.json({
      message: "Bookings obtained",
      bookings: bookings.rows,
    });
  })
);

module.exports = router;
