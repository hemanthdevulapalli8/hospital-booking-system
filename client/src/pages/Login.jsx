import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await loginUser(form);
      login(res.data.token, res.data.user);
      const role = res.data.user.role;
      if (role === "admin") navigate("/dashboard/admin");
      else if (role === "doctor") navigate("/dashboard/doctor");
      else navigate("/dashboard/patient");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-blue-50 flex justify-center items-center">
        <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-blue-700">Login</h2>

          {error && (
            <p className="mt-4 text-red-500 text-center">{error}</p>
          )}

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full mt-2 border p-3 rounded-lg"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full mt-2 border p-3 rounded-lg"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-700 font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;