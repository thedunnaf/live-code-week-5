const express = require("express");
const router = express.Router();
const Controller = require("../controllers/comic");

router.get("/", Controller.findAll);
router.get("/:id", Controller.findOne);
router.put("/:id", Controller.update)

module.exports = router;
