const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const initialize = (passport) => {
  const authenticateUser = async (email, password, done) => {
    let user = await User.findOne({ email: email });
    User.findOne({ email: email });
    if (!user) {
      return done(null, false, {
        message: "That email is not registered",
      });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user, { message: "User logged in" });
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (e) {
      return done(e);
    }
  };
  passport.use(new localStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};

module.exports = initialize;
