const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const attendanceModel = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      base64: true,
      required: true,
    },
    entranceTime: {
      type: Date,
      // default: Date.now(),
      required: true,
    },
    leavingTime: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Add timestamps (createdAt, updatedAt)
  }
);

const Attendance = mongoose.model("Attendance", attendanceModel);

module.exports = Attendance;
