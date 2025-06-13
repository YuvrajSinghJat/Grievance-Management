require("dotenv").config({ path: "./.env" });

const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");

//  Serve uploaded files correctly
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Custom Modules 
const { dbConnect } = require("./databaseConfig/connect.database.js");

// Import routers
const studentRouter = require("./routes/user/student/student.route.js");
const employeeRouter = require("./routes/user/employee/employee.route.js");
const adminRouter = require("./routes/admin/admin.route.js");

//  Middleware Setup
app.use(cors({
  origin: "http://localhost:5173", // Replace with your React frontend origin
  credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Database Connection
const port = process.env.PORT || 8080;

dbConnect()
  .then(() => console.log(" Database connected successfully"))
  .catch((err) => console.error(" Database connection failed:", err));

//Routes Setup
app.use("/student", studentRouter);
app.use("/employee", employeeRouter);
app.use("/admin", adminRouter);

//  Root Route 
app.get("/", (req, res) => {
  res.send("Grievance Management System Backend Running");
});

//Start Server 
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
