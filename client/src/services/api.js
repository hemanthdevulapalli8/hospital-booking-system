import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Auth
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// Doctors
export const getDoctors = () => API.get("/doctors");
export const getDoctorById = (id) => API.get(`/doctors/${id}`);

// Appointments
export const bookAppointment = (data) => API.post("/appointments", data);
export const getMyAppointments = () => API.get("/appointments/my");
export const getDoctorAppointments = () => API.get("/appointments/doctor/my");
export const cancelAppointment = (id) => API.delete(`/appointments/${id}`);
export const getAllAppointments = () => API.get("/appointments");
export const updateAppointmentStatus = (id, status) =>
  API.put(`/appointments/${id}/status`, { status });

// Users
export const getProfile = () => API.get("/users/profile");
export const updateProfile = (data) => API.put("/users/profile", data);
export const getAllUsers = () => API.get("/users");