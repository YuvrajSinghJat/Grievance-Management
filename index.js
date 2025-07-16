require("dotenv").config({ path: "./.env" });

const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");


// Allow static file serving for uploads (like profile images or documents)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Parse cookies
app.use(cookieParser());

// Parse URL-encoded data and JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Allow frontend to access backend (CORS setup for React)
app.use(cors({
  origin: "http://localhost:5173", // React dev server
  credentials: true,
}));



const { dbConnect } = require("./databaseConfig/connect.database.js");

const port = process.env.PORT || 8080;

dbConnect()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection failed:", err));



// Universal Auth (SignIn, Send OTP, Reset Password)
const authRouter = require("./routes/auth.routes.js");
app.use("/", authRouter);

// User Role Based Routers
const studentRouter = require("./routes/user/student/student.route.js");
const employeeRouter = require("./routes/user/employee/employee.route.js");
const adminRouter = require("./routes/admin/admin.route.js");
const dosaRouter = require("./routes/user/dosa/dosa.routes.js");
const vcRouter = require("./routes/user/vc/vc.routes.js");
const registrarRouter = require("./routes/registrar/registrar.routes.js");

// Attach Routes
app.use("/student", studentRouter);
app.use("/employee", employeeRouter);
app.use("/admin", adminRouter);
app.use("/dosa", dosaRouter);
app.use("/vc", vcRouter);
app.use("/registrar", registrarRouter);

// Test Root Route
app.get("/", (req, res) => {
  res.send("Grievance Management System Backend Running");
});

app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`);
});
