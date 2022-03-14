const express = require("express");
const router = express.Router();
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
require("dotenv").config();

router.use(express.urlencoded({ extended: false }));
router.use(flash());
router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
router.use(passport.initialize());
router.use(passport.session());

const initializePassport = require("../config/passport-config");
initializePassport(passport);

const { postRegister } = require("../controllers/register");
router.route("/register").post(postRegister);

router.route("/login").post(
  passport.authenticate("local", {
    successRedirect: "/hackatons",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

module.exports = router;
