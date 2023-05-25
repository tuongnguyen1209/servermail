const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is require"],
    unique: true,
  },
  fullname: {
    type: String,
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    enum: {
      values: ["ADMIN", "USER"],
      message: "{VALUE} is not support",
    },
    required: [true, "Role is require"],
    default: "USER",
  },
  status: {
    type: String,
    enum: {
      values: ["ACTIVE", "STOP WORKING"],
      message: "{VALUE} is not support",
    },
    required: [true, "status is require"],
    default: "ACTIVE",
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
  createBy: {
    type: String,
    default: "ADMIN",
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
