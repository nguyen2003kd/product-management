const mongoose = require("mongoose");
const generate = require("../helpers/generate.js");
const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  password: String,
  tokenUser: {
    type: String,
    default: generate.generate(20)
  },
  avatar: String,
  status: {
    type: String,
    default: "active"
  },
  deleted: {
    type: Boolean,
    default: false
  },
  acceptFriends: Array,
  requestFriends: Array,
  friendsList: Array,
  statusOnline: String,
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;