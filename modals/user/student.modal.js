const mongoose = require('mongoose');
const Schema= mongoose.Schema();

// Define Studente Schema
const studentSchema= new Schema(
  {
    enrollmentno: { 
      type: String, 
      required: true, 
      unique: true 
    },
    scholarno: { 
      type: Number, 
      required: true, 
      unique: true 
    },
    studentname: { 
      type: String, 
      required: true 
    },
    program:{
      type: String,
      required: true
    },
    department: { 
      type: String, 
      required: true 
    },
    faculty: { 
      type: String, 
      required: true 
    },
    mobile: { 
      type: Number, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    parentname: { 
      type: String, 
      required: true 
    },
    parentcontact:{
      type: Number,
      required: true
    }
  });

// Define Student Model
const Student = mongoose.model('Student', studentSchema);