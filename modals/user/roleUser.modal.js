const mongoose = require("mongoose");

const roleUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["dosa", "vc", "registrar"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const RoleUser = mongoose.model("RoleUser", roleUserSchema);
module.exports = { RoleUser };
