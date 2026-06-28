import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getDashboardLink = () => {
    if (user?.role === "patient") return "/dashboard/patient";
    if (user?.role === "doctor") return "/dashboard/doctor";
    if (user?.role === "admin") return "/dashboard/admin";
  };

  return (
    <nav className="bg-blue-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        <Link to="/" className="text-3xl font-bold text-white">
          🏥 MediCare+
        </Link>

        <div className="flex items-center gap-6 text-white font-medium">
          <Link to="/" className="hover:text-yellow-300 transition">
            Home
          </Link>

          <Link to="/doctors" className="hover:text-yellow-300 transition">
            Doctors
          </Link>

          {user ? (
            <>
              <Link
                to={getDashboardLink()}
                className="hover:text-yellow-300 transition"
              >
                Dashboard
              </Link>
              <span className="text-yellow-300">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-700 px-4 py-2 rounded-lg hover:bg-yellow-300 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-yellow-300 transition">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-700 px-4 py-2 rounded-lg hover:bg-yellow-300 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;