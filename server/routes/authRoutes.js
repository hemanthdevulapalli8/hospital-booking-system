const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// REGISTER ROUTE
router.post("/register", authController.register);

// LOGIN ROUTE
router.post("/login", authController.login);

module.exports = router;