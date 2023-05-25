const mongoose = require("mongoose");
const AppError = require("../utils/AppError");

const { Schema } = mongoose;

const subjectSchema = new Schema(
  {
    subjectID: {
      type: String,
      required: [true, "subjectID is require"],
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    typeScore: {
      type: Schema.Types.ObjectId,
      ref: "typeScore",
      default: new mongoose.Types.ObjectId("62495e229956a960490537ed"),
    },
  },
  {
    strict: true,
  }
);

subjectSchema.post("save", (error, doc, next) => {
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

subjectSchema.pre(/^find/, function (next) {
  this.populate([{ path: "typeScore", select: "-__v" }]);
  next();
});

module.exports = mongoose.model("subject", subjectSchema);
