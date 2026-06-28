const services = [
  "General Physician",
  "Cardiologist",
  "Orthopedic",
  "Neurologist",
  "Dermatologist",
  "Pediatrician",
];

function Services() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-blue-700">
          Our Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {services.map((service) => (
            <div
              key={service}
              className="shadow-lg rounded-xl p-8 hover:shadow-2xl transition"
            >
              <h3 className="text-2xl font-semibold">
                {service}
              </h3>

              <p className="mt-3 text-gray-600">
                Quality healthcare provided by experienced specialists.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;