export default function Hero() {
  return (
    <section className="pt-32 pb-20 bg-linear-to-br from-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold text-slate-800 leading-tight">
          Modern Clinic <span className="text-blue-600">Management</span>
          <br /> Simplified
        </h1>

        <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
          Streamline appointments, manage patients, and improve efficiency with
          our intelligent clinic management system.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Get Started
          </a>
          <a
            href="#services"
            className="px-6 py-3 border border-slate-300 rounded-xl hover:bg-slate-100 transition"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
