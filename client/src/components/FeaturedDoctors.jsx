import { useEffect, useState } from "react";
import DoctorCard from "./DoctorCard";
import { getDoctors } from "../services/api";

function FeaturedDoctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getDoctors()
      .then((res) => setDoctors(res.data.doctors.slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-blue-700">
          Our Top Doctors
        </h2>

        <p className="text-center text-gray-600 mt-4">
          Meet our experienced specialists.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {doctors.map((doctor, index) => (
            <DoctorCard key={doctor._id} doctor={doctor} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedDoctors;