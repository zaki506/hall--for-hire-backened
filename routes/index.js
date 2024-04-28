const express = require("express");
const userRoutes = require("./user");
const hallRoutes = require("./halls");
const router = new express.Router();

router.use("/user", userRoutes);
router.use("/halls", hallRoutes);


module.exports = router;