const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const DeveloperSchema = require("./developer");

const HackatonSchema = new mongoose.Schema({
  place: {
    type: String,
    required: [true, "You must enter a place"],
  },
  year: {
    type: Number,
    required: [true, "You must enter a date"],
  },
  developer: { type: DeveloperSchema, red: "Developer" },
});

module.exports = mongoose.model("Hackaton", HackatonSchema);
