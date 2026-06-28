const express = require("express");
const router = express.Router();

const {
  addDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Get all doctors (public)
router.get("/", getDoctors);

// Get doctor by ID (public)
router.get("/:id", getDoctorById);

// Add a new doctor (admin only)
router.post("/", authMiddleware, roleMiddleware("admin"), addDoctor);

// Update doctor (admin only)
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateDoctor);

// Delete doctor (admin only)
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteDoctor);

module.exports = router;