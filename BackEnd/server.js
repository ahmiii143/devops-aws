require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const migrateAdminUser = require("./migration/migrateAdminUser");
const path = require("path");

app.use(cors());
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());

// //Working for Live Server
// const _dirname = path.dirname("");
// const buildpath = path.join(_dirname, "../FrontEnd/dist");
// app.use(express.static(buildpath));

// Serve static files from the 'Images' directory within 'uploads'
app.use(
  "/uploads/Images",
  express.static(path.join(__dirname, "uploads/Images"))
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/users", userRoutes);
app.use("/api/attendance", attendanceRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    // Call your migration function here
    await migrateAdminUser();

    //listening to requests
    app.listen(port, () => {
      console.log(`Connected to DB && listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
