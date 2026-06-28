const Doctor = require("../models/Doctor");

// ===============================
// ADD DOCTOR (ADMIN ONLY)
// ===============================
const addDoctor = async (req, res) => {
  try {
    const {
      user,
      name,
      specialization,
      experience,
      consultationFee,
      availableDays,
      availableTime,
    } = req.body;

    const doctor = await Doctor.create({
      user,
      name,
      specialization,
      experience,
      consultationFee,
      availableDays,
      availableTime,
    });

    res.status(201).json({
      message: "Doctor added successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// ===============================
// GET ALL DOCTORS
// ===============================
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate(
      "user",
      "name email role"
    );

    res.status(200).json({
      count: doctors.length,
      doctors,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// ===============================
// GET DOCTOR BY ID
// ===============================
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate(
      "user",
      "name email role"
    );

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// ===============================
// UPDATE DOCTOR (ADMIN ONLY)
// ===============================
const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      message: "Doctor updated successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// ===============================
// DELETE DOCTOR (ADMIN ONLY)
// ===============================
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// ===============================
// EXPORT ALL
// ===============================
module.exports = {
  addDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};