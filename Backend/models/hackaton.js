const mongoose = require("mongoose");

const HackatonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "You must enter a name"],
  },
  place: {
    type: String,
    required: [true, "You must enter a place"],
  },
  date: {
    type: Date,
    required: [true, "You must enter a date"],
  },
});

module.exports = mongoose.model("Hackaton", HackatonSchema);
