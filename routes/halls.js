const express = require("express");
const router = express.Router();
const hallsController = require("../controllers/halls");
// const { checkVendor } = require("../middleware/auth");

router.post("/create", hallsController.createHall);
router.get("/get-all-halls", hallsController.listAllHalls);
router.get("/getHalls/:id", hallsController.listVendorsHalls);

module.exports = router;