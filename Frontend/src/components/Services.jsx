import { Calendar, Users, FileText, Shield } from "lucide-react";

const services = [
  {
    icon: <Calendar />,
    title: "Appointment Scheduling",
    desc: "Manage bookings efficiently.",
  },
  {
    icon: <Users />,
    title: "Patient Management",
    desc: "Secure patient records and history.",
  },
  {
    icon: <FileText />,
    title: "Digital Records",
    desc: "Paperless documentation system.",
  },
  {
    icon: <Shield />,
    title: "Secure System",
    desc: "Advanced data protection.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-slate-800">
          Our Services
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {services.map((service, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition hover:-translate-y-2"
            >
              <div className="text-blue-600 mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-slate-600 mt-2">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
