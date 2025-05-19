const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/search.controller");

router.get("/", controller.index);
router.get("/autocomplete", controller.autocomplete);

module.exports = router;