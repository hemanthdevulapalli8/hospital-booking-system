import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getDoctorById, bookAppointment } from "../services/api";
import { useAuth } from "../context/AuthContext";

function DoctorDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [form, setForm] = useState({ appointmentDate: "", reason: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDoctorById(id).then((res) => setDoctor(res.data)).catch(() => {});
  }, [id]);

  const handleBook = async (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");
    setLoading(true);
    setError("");
    setMessage("");
    try {
      await bookAppointment({ doctor: id, ...form });
      setMessage("Appointment booked successfully!");
      setForm({ appointmentDate: "", reason: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    }
    setLoading(false);
  };

  if (!doctor) return <div className="text-center mt-20">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white shadow-xl rounded-2xl p-10">
          <h1 className="text-4xl font-bold text-blue-700">{doctor.name}</h1>
          <p className="text-gray-600 mt-2">{doctor.specialization}</p>
          <p className="text-gray-500 mt-1">{doctor.experience} Years Experience</p>
          <p className="text-gray-500 mt-1">Fee: ₹{doctor.consultationFee}</p>
          <p className="text-gray-500 mt-1">Available: {doctor.availableDays?.join(", ")}</p>
          <p className="text-gray-500 mt-1">Time: {doctor.availableTime}</p>

          <hr className="my-8" />

          <h2 className="text-2xl font-bold text-blue-700">Book Appointment</h2>

          {message && <p className="mt-4 text-green-600">{message}</p>}
          {error && <p className="mt-4 text-red-500">{error}</p>}

          <form className="mt-6 space-y-4" onSubmit={handleBook}>
            <div>
              <label className="font-medium">Appointment Date</label>
              <input
                type="datetime-local"
                className="w-full mt-2 border p-3 rounded-lg"
                value={form.appointmentDate}
                onChange={(e) => setForm({ ...form, appointmentDate: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="font-medium">Reason</label>
              <textarea
                placeholder="Describe your symptoms or reason"
                className="w-full mt-2 border p-3 rounded-lg"
                rows={4}
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800"
            >
              {loading ? "Booking..." : "Book Appointment"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default DoctorDetail;