require("dotenv").config({ path: "./.env" });

const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Connect MongoDB
const { dbConnect } = require("./databaseConfig/connect.database.js");
dbConnect()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection failed:", err));

const port = process.env.PORT || 8080;

// Middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: "http://localhost:5173", // React frontend origin
  credentials: true,
}));

// Routers
const authRouter = require("./routes/auth.routes.js");
const studentRouter = require("./routes/user/student/student.route.js");
const employeeRouter = require("./routes/user/employee/employee.route.js");
const adminRouter = require("./routes/admin/admin.route.js");
const dosaRouter = require("./routes/user/dosa/dosa.routes.js");
const vcRouter = require("./routes/user/vc/vc.routes.js");
const registrarRouter = require("./routes/registrar/registrar.routes.js");
const supportRouter = require("./routes/support.js"); // support route

// Use Routers
app.use("/", authRouter);
app.use("/student", studentRouter);
app.use("/employee", employeeRouter);
app.use("/admin", adminRouter);
app.use("/dosa", dosaRouter);
app.use("/vc", vcRouter);
app.use("/registrar", registrarRouter);
app.use("/api/support", supportRouter); //  added support form route

// Health check / root
app.get("/", (req, res) => {
  res.send("Grievance Management System Backend is Running");
});



// Prevent browser from caching protected pages
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});







// Start Server
app.listen(port, () => {
  console.log(` Server running at: http://localhost:${port}`);
});
