const express = require("express");
const userRoutes = require("./user");
const router = new express.Router();

router.use("/user", userRoutes);


module.exports = router;