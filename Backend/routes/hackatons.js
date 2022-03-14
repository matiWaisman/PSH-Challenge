const express = require("express");
const router = express.Router();
const checkAuthenticated = require("../middleware/checkAuthenticated");

const { getHackatons } = require("../controllers/hackatons");

router.route("/", checkAuthenticated).get(getHackatons);

module.exports = router;
