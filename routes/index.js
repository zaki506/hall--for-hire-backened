const express = require("express");
const userRoutes = require("./user");
const hallRoutes = require("./halls");
const vendorRoutes = require("./vendor");
const router = new express.Router();

router.use("/user", userRoutes);
router.use("/halls", hallRoutes);
router.use("/vendor", vendorRoutes);


module.exports = router;