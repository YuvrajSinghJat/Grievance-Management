require('dotenv').config({ 
    path: './.env' 
})
const express = require("express")
const app = express()
const mongoose = require("mongoose");
const { dbConnect } = require('./databaseConfig/connect.database.js');
const { userRouter } = require('./routes/user/user.route.js');

const port = process.env.PORT || 8080;

// Connect database from server
dbConnect()
.then(()=>{
    console.log("Database is connected")
})
.catch((err)=>{
    console.log(err)
});

//Making instance for server listening
app.listen(port,()=>{
    console.log("Server is listeming TO PORT = ",port)
})

//Tow makes gateway for users
app.use("/",userRouter);
app.use("/admin");




// app.get("/home",(req,res)=>{
//     res.send("Hello Home !!")
//     console.log(process.env.MONGO_URL)
// })

