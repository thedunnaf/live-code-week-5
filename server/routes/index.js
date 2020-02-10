const express = require("express");
const router = express.Router();
const User = require("./user");
const { authentication } = require("../middlewares/auth");
const Comic = require("./comic");

router.use("/", User);
router.use(authentication);
router.use("/comics", Comic);

module.exports = router;
