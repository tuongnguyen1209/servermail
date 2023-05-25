const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const { Schema } = mongoose;

const StudentSchema = new Schema(
  {
    studentID: {
      type: String,
      required: [true, "MSSV is require"],
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      default: "STUDYING",
    },
  },
  {
    strict: true,
  }
);

StudentSchema.post("save", (error, doc, next) => {
  if (error.code === 11000) {
    next(
      new AppError(
        `'${Object.keys(
          error.keyValue
        )}' is unique, value is duplicate: '${Object.values(error.keyValue)}'`
      )
    );
  } else {
    next(error);
  }
});

module.exports = mongoose.model("student", StudentSchema);
