export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-10">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h3 className="text-xl font-bold text-white">ClinicMS</h3>
        <p className="mt-4 text-sm">
          © {new Date().getFullYear()} Clinic Management System. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
