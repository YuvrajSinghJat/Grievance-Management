require("dotenv").config({
	path: "./.env",
});
const express = require("express");
const app = express();

const path = require("path");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cors = require("cors");
app.use(cors());



const mongoose = require("mongoose");
const { dbConnect } = require("./databaseConfig/connect.database.js");
const { studentRouter } = require("./routes/user/student/student.route.js");
const { employeeRouter } = require("./routes/user/employee/employee.route.js");
const { adminRouter } = require("./routes/admin/admin.route.js");

const port = process.env.PORT || 8080;

// Connect database from server
dbConnect()
	.then(() => {
		console.log("Database is connected");
	})
	.catch((err) => {
		console.log(err);
	});

//Making instance for server listening
app.listen(port, () => {
	console.log("Cors Server is listeming TO PORT = ", port);
});

//Tow makes gateway for users --
app.use("/student", studentRouter);
app.use("/employee", employeeRouter);
app.use("/admin", adminRouter);

// app.get("/home",(req,res)=>{
//     res.send("Hello Home !!")
//     console.log(process.env.MONGO_URL)
// })
