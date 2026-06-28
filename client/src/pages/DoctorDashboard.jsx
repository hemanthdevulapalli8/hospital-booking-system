import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getDoctorAppointments } from "../services/api";
import { useAuth } from "../context/AuthContext";

function DoctorDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoctorAppointments()
      .then((res) => setAppointments(res.data.appointments))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-blue-700">
          Doctor Dashboard
        </h1>
        <p className="text-gray-600 mt-2">Welcome, {user?.name}</p>

        {loading ? (
          <p className="mt-8 text-gray-500">Loading...</p>
        ) : appointments.length === 0 ? (
          <p className="mt-8 text-gray-500">No appointments yet.</p>
        ) : (
          <div className="mt-8 space-y-4">
            {appointments.map((appt) => (
              <div
                key={appt._id}
                className="bg-white shadow rounded-xl p-6"
              >
                <h3 className="text-xl font-bold">{appt.patient?.name}</h3>
                <p className="text-gray-500">{appt.patient?.email}</p>
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
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default DoctorDashboard;