import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-blue-50 py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-6xl font-bold text-blue-700">
          Your Health,
          <br />
          Our Priority
        </h1>

        <p className="mt-6 text-xl text-gray-600">
          Book appointments with experienced doctors anytime, anywhere.
        </p>

        <div className="mt-10 space-x-4">
          <Link
            to="/doctors"
            className="bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 inline-block"
          >
            Book Appointment
          </Link>

          <Link
            to="/doctors"
            className="border-2 border-blue-700 text-blue-700 px-8 py-3 rounded-lg hover:bg-blue-700 hover:text-white inline-block"
          >
            View Doctors
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;