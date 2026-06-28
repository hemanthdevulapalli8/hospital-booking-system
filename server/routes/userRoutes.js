const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getProfile,
  updateProfile,
  getAllUsers,
} = require("../controllers/userController");
const roleMiddleware = require("../middleware/roleMiddleware");

// Get logged-in user profile
router.get("/profile", authMiddleware, getProfile);

// Update logged-in user profile
router.put("/profile", authMiddleware, updateProfile);

// Admin - get all users
router.get("/", authMiddleware, roleMiddleware("admin"), getAllUsers);

module.exports = router;