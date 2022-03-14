const passport = require("passport");

const postLogin = (req, res, next) => {
  console.log("The function has been triggered");
  passport.authenticate("local", {
    successMessage: "Login authenticated",
    failureMessage: "Login failed",
  })(req, res, next);
};

module.exports = {
  postLogin,
};
