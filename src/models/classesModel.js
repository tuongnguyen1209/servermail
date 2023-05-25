const mongoose = require("mongoose");
const { Schema } = mongoose;

const classesSchema = new Schema(
  {
    term: {
      type: Schema.Types.ObjectId,
      ref: "term",
      required: [true, "termID is require"],
    },
    name: {
      type: String,
      required: [true, "name is require"],
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: "subject",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    createAt: {
      type: Date,
      default: new Date(),
    },
    createBy: {
      type: String,
      default: "ADMIN",
    },
    deadline: {
      type: Array,
      default: [],
    },
  },
  {
    strict: true,
  }
);

classesSchema.pre(/^find/, function (next) {
  this.populate([
    { path: "term", select: "-__v" },
    { path: "subject", select: "-__v" },
    { path: "user", select: "-__v" },
  ]);
  next();
});

module.exports = mongoose.model("classes", classesSchema);
