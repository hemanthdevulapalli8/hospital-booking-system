import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import DoctorCard from "../components/DoctorCard";
import Footer from "../components/Footer";
import { getDoctors } from "../services/api";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoctors()
      .then((res) => setDoctors(res.data.doctors))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-blue-700">Our Doctors</h1>
          <p className="mt-4 text-gray-600">
            Choose the best specialist for your healthcare needs.
          </p>
        </div>
      </div>

      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <p className="text-center text-gray-500">Loading doctors...</p>
          ) : doctors.length === 0 ? (
            <p className="text-center text-gray-500">No doctors found.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {doctors.map((doctor, index) => (
                <DoctorCard key={doctor._id} doctor={doctor} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Doctors;