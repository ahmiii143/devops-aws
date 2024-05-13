const User = require("../models/userModel");
const multer = require("multer");
const path = require("path");
// const mongoose = require("mongoose");

//get all Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" })
      .sort({ created_at: 1 })
      .populate("leaveRequests"); // Populate the leaveRequests field

    const totalEmployees = users.length;

    // Extract leave request details for each user
    const usersWithLeaveDetails = users.map((user) => {
      const leaveDetails = user.leaveRequests.map((request) => ({
        _id: request._id,
        leaveType: request.leaveType,
        leaveSubject: request.leaveSubject,
        startDate: request.startDate.toDateString(),
        endDate: request.endDate.toDateString(),
        reason: request.reason,
        status: request.status,
        leaveDays: request.leaveDays, // Include leave count
      }));

      // Add leave count to each user
      const userWithLeaveCount = {
        _id: user._id,
        name: user.name,
        dob: user.dob,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        unpaidLeaves: user.unpaidLeaves,
        leaveRequests: leaveDetails,
      };

      return userWithLeaveCount;
    });

    res.status(200).json({ totalEmployees, users: usersWithLeaveDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get a single User with leave details
const getSingleUser = async (req, res) => {
  const { userName } = req.params;
  try {
    const user = await User.findOne({ username: userName }).populate(
      "leaveRequests",
    );

    if (!user) {
      return res.status(404).json({ error: "No user found" });
    }

    // Extract leave request details for the user
    const leaveDetails = user.leaveRequests.map((request) => ({
      _id: request._id,
      leaveType: request.leaveType,
      leaveSubject: request.leaveSubject,
      startDate: request.startDate.toDateString(),
      endDate: request.endDate.toDateString(),
      reason: request.reason,
      status: request.status,
      leaveDays: request.leaveDays,
    }));
    console.log(leaveDetails);

    // Create user object with leave details
    const userWithLeaveDetails = {
      _id: user._id,
      name: user.name,
      username: user.username,
      dob: user.dob,
      email: user.email,
      profilePicture: user.profilePicture,
      phoneNumber: user.phoneNumber,
      leaveCount: user.leaveCount,
      unpaidLeaves: user.unpaidLeaves,
      leaveRequests: leaveDetails,
    };

    res.status(200).json(userWithLeaveDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//CREATE a new User
const createUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  //ADD doc to DB
  try {
    const newUser = await User.create({
      name,
      username,
      email,
      password,
    });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete a User
const deleteUser = async (req, res) => {
  const { userName } = req.params;

  // if (!mongoose.Types.ObjectId.isValid(userName)) {
  //   return res.status(404).json({ error: "No such user found, try again!" });
  // }

  const user = await User.findOneAndDelete({ username: userName });

  if (!user) {
    return res.status(404).json(user);
  }
  res.status(200).json(user);
};

//profile picture updation logic starts here...

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images/"); //specify the destination folder
  },
  filename: (req, file, cb) => {
    //using username and timeStamp to create File name
    const timeStamp = new Date().toISOString().replace(/[-:.]/g, "");
    const filename = `${req.params.userName}_${timeStamp}_${file.originalname}`;
    console.log(file.originalname);
    console.log(filename);
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  //allow only images
  if (file.mimetype.match(/^image\/(jpg|jpeg|png)$/)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid File Type, please upload an image"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, //limiting to 5MB
  },
});

//update a ProfilePicture of User
const updatePicture = async (req, res) => {
  console.log(req.body);
  const { userName } = req.params;

  try {
    // using multer to handle file upload
    upload.single("profilePicture")(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      //extracting the file name
      const fileName = req.file.filename;
      console.log(fileName);

      // updating the mongoDB with picName
      const updateRes = User.findOneAndUpdate(
        { username: userName },
        { profilePicture: fileName },
        { new: true },
      ).then((user) => {
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        //otherwise respond with success message
        res
          .status(200)
          .json({ message: "Profile picture updated successfully" });
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//updating a profile of user
const updateProfile = async (req, res) => {
  const { userName } = req.params;
  const { name, username, email, dob, phoneNo, password } = req.body;

  try {
    let updateFields = {};

    // Check if each field is provided in the request body and update accordingly
    if (name) updateFields.name = name;
    if (username) updateFields.username = username;
    if (dob) updateFields.dob = dob;
    if (email) updateFields.email = email;
    if (phoneNo) updateFields.phoneNumber = phoneNo;
    if (password) updateFields.password = password;

    // Update the user document with the provided fields
    const newUser = await User.findOneAndUpdate(
      { username: userName },
      updateFields,
      { new: true },
    );

    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//login a user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    // Check user role
    if (user.role === "admin") {
      return res
        .status(200)
        .json({ message: "Admin Login successful", role: "admin" });
    } else {
      return res
        .status(200)
        .json({ message: "User Login successful", role: "user" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

async function UserExist(req, res) {
  const { userName } = req.params;
  try {
    const user = await User.findOne({ username: userName }).exec();
    if (user) {
      // User found, so it exists
      return res.status(200).json({ exists: true });
    } else {
      // User not found, so it does not exist
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Create Leave request

const createLeaveRequest = async (req, res) => {
  const { userName } = req.params;
  const { leaveType, leaveSubject, startDate, endDate, reason } = req.body;

  try {
    const user = await User.findOne({ username: userName });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Calculate the number of days in the leave request
    const start = new Date(startDate);
    const end = new Date(endDate);
    const leaveDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    const newLeaveRequest = {
      leaveType,
      leaveSubject,
      startDate,
      endDate,
      reason,
      status: "pending",
      leaveDays,
    };

    if (leaveType === "paid") {
      // Check if the user has enough leave count for paid leave
      if (user.leaveCount < leaveDays) {
        return res.status(400).json({ error: "Insufficient leave balance" });
      }

      // Deduct leave days from total leave count only after approval
      newLeaveRequest.deducted = false;
    } else if (leaveType === "unpaid") {
      user.unpaidLeaves += leaveDays; // Increase unpaid leave count
    }

    user.leaveRequests.push(newLeaveRequest);
    await user.save();

    res.status(201).json({ message: "Leave request created successfully" });
  } catch (error) {
    console.error("Error creating leave request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// update Leave request
const updateLeaveRequest = async (req, res) => {
  const { userName } = req.params;
  const { leaveRequestId, newStatus } = req.body;

  try {
    const user = await User.findOne({ username: userName });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const leaveRequest = user.leaveRequests.id(leaveRequestId);
    if (!leaveRequest) {
      return res.status(404).json({ error: "Leave request not found" });
    }

    // Update the status of the leave request
    leaveRequest.status = newStatus;

    if (newStatus === "approved") {
      // Deduct leave count only when the leave request is approved
      const leaveDays = leaveRequest.leaveDays;
      if (leaveRequest.leaveType === "paid") {
        if (user.leaveCount < leaveDays) {
          return res.status(400).json({ error: "Insufficient leave balance" });
        }
        user.leaveCount -= leaveDays;
      } else if (leaveRequest.leaveType === "unpaid") {
        user.unpaidLeaves -= leaveDays;
      }
    }

    await user.save();

    res.status(200).json({ message: "Leave request updated successfully" });
  } catch (error) {
    console.error("Error updating leave request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//exporting modules
module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updatePicture,
  updateProfile,
  loginUser,
  createLeaveRequest,
  upload,
  UserExist,
  updateLeaveRequest,
};
