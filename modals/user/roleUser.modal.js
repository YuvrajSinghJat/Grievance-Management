const mongoose = require("mongoose");

const roleUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["dosa", "vc", "registrar"],
    required: true,
    lowercase: true,
  },
}, {
  timestamps: true,
});

const RoleUser = mongoose.model("RoleUser", roleUserSchema);
module.exports = { RoleUser };
