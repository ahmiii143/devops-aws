const mongoose = require("mongoose");
const User = require("../models/userModel");

// Define the migration function
const migrateAdminUser = async () => {
  try {
    // Check if the user collection is empty
    const userCount = await User.countDocuments();

    // If the user collection is empty, add an admin user
    if (userCount === 0) {
      const adminUser = new User({
        name: "Admin User",
        username: "admin",
        email: "admin@gmail.com",
        password: "admin@123",
        role: "admin",
      });
      await adminUser.save();
      console.log("Admin user added successfully.");
    } else {
      console.log("Admin user already exists in the database.");
    }
  } catch (error) {
    console.error("Migration failed:", error);
  }
};

module.exports = migrateAdminUser;
