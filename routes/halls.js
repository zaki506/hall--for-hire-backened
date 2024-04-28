const express = require("express");
const router = express.Router();
const hallsController = require("../controllers/halls");
const { checkVendor } = require("../middleware/auth");

router.post("/create", checkVendor, hallsController.createHall);

module.exports = router;