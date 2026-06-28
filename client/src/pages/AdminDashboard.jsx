import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  getAllAppointments,
  updateAppointmentStatus,
  getAllUsers,
} from "../services/api";

function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [tab, setTab] = useState("appointments");
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    Promise.all([getAllAppointments(), getAllUsers()])
      .then(([apptRes, userRes]) => {
        setAppointments(apptRes.data.appointments);
        setUsers(userRes.data.users);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatus = async (id, status) => {
    try {
      await updateAppointmentStatus(id, status);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-blue-700">Admin Dashboard</h1>

        <div className="flex gap-4 mt-8">
          <button
            onClick={() => setTab("appointments")}
            className={`px-6 py-2 rounded-lg font-medium ${
              tab === "appointments"
                ? "bg-blue-700 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Appointments
          </button>
          <button
            onClick={() => setTab("users")}
            className={`px-6 py-2 rounded-lg font-medium ${
              tab === "users"
                ? "bg-blue-700 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Users
          </button>
        </div>

        {loading ? (
          <p className="mt-8 text-gray-500">Loading...</p>
        ) : tab === "appointments" ? (
          <div className="mt-8 space-y-4">
            {appointments.map((appt) => (
              <div
                key={appt._id}
                className="bg-white shadow rounded-xl p-6 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-bold">
                    {appt.patient?.name} → {appt.doctor?.name}
                  </h3>
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
                {appt.status === "pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatus(appt._id, "Approved")}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatus(appt._id, "Rejected")}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white shadow rounded-xl p-6 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-bold">{user.name}</h3>
                  <p className="text-gray-500">{user.email}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    user.role === "admin"
                      ? "bg-purple-100 text-purple-700"
                      : user.role === "doctor"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default AdminDashboard;