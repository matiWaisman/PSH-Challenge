const express = require("express");
const router = express.Router();
const passport = require("passport");

const initializePassport = require("../config/passport-config");
initializePassport(passport);

const { postRegister } = require("../controllers/register");
router.route("/register").post(postRegister);

router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    res.status(200).json({ message: info.message, user: user.name });
    isLoggedIn = true;
  })(req, res, next);
});

router.delete("/logout", (req, res) => {
  console.log(req.session);
  //req.logOut();
  isLoggedIn = false;
  res.status(200).json({ msg: "Logged out" });
});

module.exports = router;
