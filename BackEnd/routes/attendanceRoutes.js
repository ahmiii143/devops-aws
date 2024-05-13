const express = require("express");
const {
  getAttendance,
  getOneAttendance,
  createAttendance,
  updateAttendance,
  getPresentOnes,
  getTodayAttendances,
  getMonthlyAttendances,
  getAttendanceReport,
} = require("../controllers/attendanceController");

const router = express.Router();

// Get one month  report
router.get("/report", getAttendanceReport);

router.get("/all", getTodayAttendances);

//single day history
router.get("/:userName", getOneAttendance);

//insert new record to history
router.post("/", createAttendance);

//update attendance check out time
router.put("/:userName", updateAttendance);

//update attendance history
router.put("/", updateAttendance);

// Monthly attendance history for a specific user
router.get("/monthly/:userName", getMonthlyAttendances);

module.exports = router;
