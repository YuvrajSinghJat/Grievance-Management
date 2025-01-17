/*const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Define schema for grievanceStatus
const grievanceStatusSchema = Schema(
    {
        grievanceid:{
            type: Number,
            required: true,
            unique: true
        },
        status:{
            type: String,
            required: true
        },
        comment:{
            type: String,
            required: true
        }
        },
        {
            timestamp: true
        }
    );
        
        //Define Grievance Status Model
        const GrievanceStatus = mongoose.model('GrievanceStatus', grievanceStatusSchema);
        
        module.exports = { GrievanceStatus }*/