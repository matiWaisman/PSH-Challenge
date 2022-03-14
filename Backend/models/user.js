const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "You must enter a name"],
  },
  email: {
    type: String,
    required: [true, "You must enter an email"],
  },
  password: {
    type: String,
    required: [true, "You must enter an password"],
  },
});

module.exports = mongoose.model("User", UserSchema);
