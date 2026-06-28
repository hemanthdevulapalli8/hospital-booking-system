const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

const bookAppointment = async (req, res) => {
  try {
    const { doctor, appointmentDate, reason } = req.body;

    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor,
      appointmentDate,
      reason,
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user._id })
      .populate("doctor")
      .populate("patient", "-password");

    res.status(200).json({ count: appointments.length, appointments });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getDoctorAppointments = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user._id });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    const appointments = await Appointment.find({ doctor: doctor._id })
      .populate("patient", "-password")
      .populate("doctor");

    res.status(200).json({ count: appointments.length, appointments });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "-password")
      .populate("doctor");

    res.status(200).json({ count: appointments.length, appointments });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Status must be Approved or Rejected" });
    }

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status;
    appointment.approvedBy = req.user._id;
    appointment.approvedAt = new Date();

    await appointment.save();

    res.status(200).json({
      message: `Appointment ${status.toLowerCase()} successfully`,
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.patient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to cancel this appointment" });
    }

    await appointment.deleteOne();

    res.status(200).json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  getAllAppointments,
  updateAppointmentStatus,
  cancelAppointment,
};