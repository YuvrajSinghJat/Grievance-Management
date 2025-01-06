const mongoose = require("mongoose");
const Schema= mongoose.Schema();

//Define Grievance schema
const grievanceSchema= new Schema(
    {
        grievanceid:{
            type: Number,
            required: true,
            unique: true
        },
        subject:{
            type: String,
            required: true
        },
        description:{
            type:String,
            required: true
        },
        scholarno:{
            type: Number,
            required: true,
            unique: true
        },
        proof:{
            type: String
        }
    },
    {
        timestamps: true 
    }
);

//Define Grievance Model
const Grievance = mongoose.model('Grievance', grievanceSchema);

module.exports = { Grievance }