const mongoose = require("mongoose");

const termSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
});

module.exports = mongoose.model("term", termSchema);
