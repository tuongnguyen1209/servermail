const mongoose = require("mongoose");
const { Schema } = mongoose;

const typeScoreSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is require"],
  },
  types: [
    {
      _id: false,
      pointPattern: {
        type: Schema.Types.ObjectId,
        ref: "pointPattern",
      },
      quantity: Number,
    },
  ],
});
typeScoreSchema.pre(/^find/, function (next) {
  this.populate([{ path: "types.pointPattern", select: "-__v,-_id" }]);
  next();
});

module.exports = mongoose.model("typeScore", typeScoreSchema);
