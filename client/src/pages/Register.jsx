import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";
import Navbar from "../components/Navbar";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "patient" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await registerUser(form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-blue-50 flex justify-center items-center">
        <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-blue-700">Register</h2>

          {error && (
            <p className="mt-4 text-red-500 text-center">{error}</p>
          )}

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border p-3 rounded-lg"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border p-3 rounded-lg"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border p-3 rounded-lg"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />

            <select
              className="w-full border p-3 rounded-lg"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-700 font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;