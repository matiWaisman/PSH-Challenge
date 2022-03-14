const User = require("../models/user");
const bcrypt = require("bcryptjs");

const postRegister = async (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }
  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }
  let posibleUser = await User.findOne({ email: email });
  if (posibleUser) {
    errors.push({ msg: "There is already a user logged in with that email" });
  }
  if (errors.length > 0) {
    res.status(401).send(errors);
  } else {
    const newUser = new User({
      name: name,
      email: email,
      password: password,
    });
    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        newUser.password = hash;
        newUser
          .save()
          .then(res.status(200).json({ msg: "User registered" }))
          .catch((err) => console.log(err));
      })
    );
  }
};

module.exports = {
  postRegister,
};
