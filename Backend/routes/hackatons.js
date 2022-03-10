const express = require("express");
const router = express.Router();

const { getHackatons } = require("../controllers/hackatons");

router.route("/").get(getHackatons);

module.exports = router;
