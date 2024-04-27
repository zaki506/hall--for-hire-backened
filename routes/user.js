const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.post("/register", userController.createUser);
router.get("/get-all", userController.getAllusers);

router.post("/login", userController.login);
router.get("/:id/verify/:token", userController.verifyToken);

module.exports = router;
