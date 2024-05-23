const express = require("express");
const router = express.Router();
const vendorController = require("../controllers/vendor");

router.get("/get-all", vendorController.listAllVendors);
router.delete("/delete/:id", vendorController.deleteVendor)

module.exports = router;

