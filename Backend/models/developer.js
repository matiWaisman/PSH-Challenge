const mongoose = require("mongoose");

const DeveloperSchema = new mongoose.Schema({
  gender: {
    type: String,
    required: [true, "You must enter a gender"],
  },
  name: {
    first: {
      type: String,
      required: [true, "You must enter a first name"],
    },
    last: {
      type: String,
      required: [true, "You must enter a last name"],
    },
  },
  email: {
    type: String,
    required: [true, "You must enter an email"],
  },
  age: {
    type: Number,
    required: [true, "You must enter an age"],
  },
  score: {
    type: Number,
    required: [true, "You must enter a score"],
  },
});

module.exports = mongoose.model("Developer", DeveloperSchema);
