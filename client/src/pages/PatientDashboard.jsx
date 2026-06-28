import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getMyAppointments, cancelAppointment } from "../services/api";
import { useAuth } from "../context/AuthContext";

function PatientDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = () => {
    getMyAppointments()
      .then((res) => setAppointments(res.data.appointments))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this appointment?")) return;
    try {
      await cancelAppointment(id);
      fetchAppointments();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-blue-700">
          Welcome, {user?.name}
        </h1>
        <p className="text-gray-600 mt-2">Your upcoming appointments</p>

        {loading ? (
          <p className="mt-8 text-gray-500">Loading...</p>
        ) : appointments.length === 0 ? (
          <p className="mt-8 text-gray-500">No appointments found.</p>
        ) : (
          <div className="mt-8 space-y-4">
            {appointments.map((appt) => (
              <div
                key={appt._id}
                className="bg-white shadow rounded-xl p-6 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-bold">{appt.doctor?.name}</h3>
                  <p className="text-gray-500">{appt.doctor?.specialization}</p>
                  <p className="text-gray-500">
                    {new Date(appt.appointmentDate).toLocaleString()}
                  </p>
                  <p className="text-gray-500">Reason: {appt.reason}</p>
                  <span
                    className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      appt.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : appt.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {appt.status}
                  </span>
                </div>
                <button
                  onClick={() => handleCancel(appt._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default PatientDashboard;