const mongoose = require("mongoose");
const Schema= mongoose.Schema;

//Define Grievance schema
const grievanceSchema= Schema(
    {
        /*grievanceid:{
            type: Number,
            required: true,
            unique: true
        },*/
        grievanceType:{
            type: String,
            required: true
        },
        grievanceTitle:{
            type: String,
            required: true
        },
        grievanceDesc:{
            type:String,
            required: true
        },
        /*scholarno:{
            type: Number,
            required: true,
            unique: true
        },*/
        proof:{
            type: String
        },
        actionByDosa:{
            type: String,
            default: null
        },
        actionByVC:{
            type: String,
            default: null
        },
        actionByCommittee:{
            type: String,
            default: null,
            //reportGenerated: String
        },
        actionOnReportByVC:{
            type: String,
            default: null
        }/*,
        actionByRegistrar:{
            type: String,
            default: null
        }*/
        
    },
    {
        timestamps: true 
    }
);

//Define Grievance Model
const Grievance = mongoose.model('Grievance', grievanceSchema);

module.exports = { Grievance }