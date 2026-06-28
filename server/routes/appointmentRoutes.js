const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  getAllAppointments,
  cancelAppointment,
} = require("../controllers/appointmentController");

// Patient Routes
router.post("/", authMiddleware, bookAppointment);
router.get("/my", authMiddleware, getMyAppointments);
router.delete("/:id", authMiddleware, cancelAppointment);

// Doctor Routes
router.get("/doctor/my", authMiddleware, roleMiddleware("doctor"), getDoctorAppointments);

// Admin Routes
router.get("/", authMiddleware, roleMiddleware("admin"), getAllAppointments);
router.put("/:id/status", authMiddleware, roleMiddleware("admin"), updateAppointmentStatus);

module.exports = router;