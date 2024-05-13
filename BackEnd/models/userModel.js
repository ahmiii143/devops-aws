const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define schema for leave request
const leaveRequestSchema = new Schema(
  {
    leaveSubject: { type: String, required: true },
    leaveType: {
      type: String,
      enum: ["paid", "unpaid"],
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    leaveDays: { type: Number },
    status: {
      type: String,
      enum: ["pending", "approved", "disapproved"],
      default: "pending",
    },
  },
  { timestamps: true },
);

// Define schema for user model
const userModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      default: null,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    leaveCount: {
      type: Number,
      default: 24,
    },
    unpaidLeaves: {
      type: Number,
      default: 0,
    },
    leaveRequests: [leaveRequestSchema],
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userModel);

module.exports = User;
