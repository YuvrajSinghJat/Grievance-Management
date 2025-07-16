require("dotenv").config({ path: "./.env" });

const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Custom Modules
const { dbConnect } = require("./databaseConfig/connect.database.js");

// Import Routers
const studentRouter = require("./routes/user/student/student.route.js");
const employeeRouter = require("./routes/user/employee/employee.route.js");
const adminRouter = require("./routes/admin/admin.route.js");
const authRouter = require("./routes/auth.routes.js");

// ✅ Corrected paths for Dosa, VC, Registrar routes
const dosaRouter = require("./routes/user/dosa/dosa.routes.js");
const vcRouter = require("./routes/user/vc/vc.routes.js");
const registrarRouter = require("./routes/registrar/registrar.routes.js"); // ✅ corrected path


// Middleware Setup
app.use(cors({
  origin: "http://localhost:5173", // React frontend origin
  credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database Connection
const port = process.env.PORT || 8080;

dbConnect()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => console.error("❌ Database connection failed:", err));

// Routes Setup
app.use("/student", studentRouter);
app.use("/employee", employeeRouter);
app.use("/admin", adminRouter);
app.use("/", authRouter); // Mount universal login at root (/signin)

// New Role Routes
app.use("/dosa", dosaRouter);
app.use("/vc", vcRouter);
app.use("/registrar", registrarRouter);

// Root Route
app.get("/", (req, res) => {
  res.send("🎯 Grievance Management System Backend Running");
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
