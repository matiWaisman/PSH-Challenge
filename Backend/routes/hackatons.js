const express = require("express");
const router = express.Router();
const checkAuthenticated = require("../middleware/checkAuthenticated");
const checkNotAuthenticated = require("../middleware/checkNotAuthenticated");

router.use(checkAuthenticated);
router.use(checkNotAuthenticated);

const { getHackatons } = require("../controllers/hackatons");

router.route("/", checkAuthenticated).get(getHackatons);

module.exports = router;
