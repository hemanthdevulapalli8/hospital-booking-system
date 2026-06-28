import { Link } from "react-router-dom";

const femaleNames = [
  "keerthi", "priya", "anita", "sunita", "meena",
  "pooja", "divya", "sneha", "rekha", "kavya",
  "lakshmi", "deepa", "nisha", "sonia", "rani",
];

const maleDoctorImages = [
  "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/6234600/pexels-photo-6234600.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400",
];

const femaleDoctorImage =
  "https://images.pexels.com/photos/5214950/pexels-photo-5214950.jpeg?auto=compress&cs=tinysrgb&w=400";

function DoctorCard({ doctor, index }) {
  const nameLower = doctor.name.toLowerCase();
  const isFemale = femaleNames.some((name) => nameLower.includes(name));

  const image = isFemale
    ? femaleDoctorImage
    : maleDoctorImages[index % maleDoctorImages.length];

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
      <img
        src={image}
        alt={doctor.name}
        className="w-full h-64 object-cover object-top"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://randomuser.me/api/portraits/men/41.jpg";
        }}
      />

      <div className="p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">{doctor.name}</h3>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            Available
          </span>
        </div>

        <p className="text-blue-700 mt-2 font-medium">{doctor.specialization}</p>
        <p className="text-gray-500 mt-2">{doctor.experience} Years Experience</p>
        <p className="text-gray-500 mt-1">Fee: ₹{doctor.consultationFee}</p>

        <Link
          to={`/doctors/${doctor._id}`}
          className="mt-6 w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition block text-center"
        >
          Book Appointment
        </Link>
      </div>
    </div>
  );
}

export default DoctorCard;