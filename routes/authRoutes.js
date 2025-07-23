const express = require("express");
const router = express.Router();
const AuthController = require("../controller/AuthController");

router.post("/create", AuthController.register);
module.exports = router;
