const mongoose = require("mongoose");
// const { schema } = require("./subjectsModel");
const { Schema } = mongoose;
const classesModel = require("./classesModel");

const studentClassSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "student",
      required: [true, "studentID is require"],
    },
    classes: {
      type: Schema.Types.ObjectId,
      ref: "classes",
      required: [true, "classesID is require"],
    },
    score: {
      lab: {
        type: Array,
        default: [],
      },
      quiz: {
        type: Array,
        default: [],
      },
      asm: {
        type: Array,
        default: [],
      },
      reward: {
        type: Number,
        default: 0,
      },
      positive: {
        type: Number,
        default: 0,
      },
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

studentClassSchema.index({ student: 1, classes: 1 }, { unique: true });

studentClassSchema.pre(/^find/, function (next) {
  this.populate([
    { path: "student", select: "-__v" },
    { path: "classes", select: "-__v" },
  ]);
  next();
});

module.exports = mongoose.model("studentClass", studentClassSchema);
