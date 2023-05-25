const mongoose = require("mongoose");
const { Schema } = mongoose;

const pointPatternSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is require"],
  },
  gradePoint: {
    type: String,
    enum: {
      values: ["ARRAY", "NUMBER"],
      message: "{VALUE} is not support",
    },
    required: [true, "gradePoint is require"],
    default: "NUMBER",
  },
});

module.exports = mongoose.model("pointPattern", pointPatternSchema);
