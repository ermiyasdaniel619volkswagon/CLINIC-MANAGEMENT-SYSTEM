import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, User, ClipboardList } from "lucide-react";

export default function Sidebar({ role }) {
  const linkBase =
    "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 text-gray-600";

  const activeStyle =
    "text-blue-600 shadow-[inset_3px_3px_6px_#c3c9d4,inset_-3px_-3px_6px_#ffffff]";

  const hoverStyle =
    "hover:shadow-[3px_3px_8px_#c3c9d4,-3px_-3px_8px_#ffffff] hover:text-blue-600";

  return (
    <div
      className="
        group
        w-20 hover:w-64
        bg-[#e6ecf3]
        transition-all duration-300
        overflow-hidden
        flex flex-col
        shadow-[5px_5px_12px_#c3c9d4,-5px_-5px_12px_#ffffff]
      "
    >
      {/* Role Title */}
      <div className="p-4 text-center font-semibold text-gray-700 opacity-0 group-hover:opacity-100 transition">
        {role} Panel
      </div>

      <nav className="flex flex-col gap-3 px-3">
        {/* ================= ADMIN ================= */}
        {role === "Admin" && (
          <>
            <NavItem
              to="/admin/dashboard"
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              linkBase={linkBase}
              activeStyle={activeStyle}
              hoverStyle={hoverStyle}
            />
            <NavItem
              to="/admin/users"
              icon={<Users size={20} />}
              label="Manage Users"
              linkBase={linkBase}
              activeStyle={activeStyle}
              hoverStyle={hoverStyle}
            />
          </>
        )}

        {/* ================= DOCTOR ================= */}
        {role === "Doctor" && (
          <>
            <NavItem
              to="/doctor/dashboard"
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              linkBase={linkBase}
              activeStyle={activeStyle}
              hoverStyle={hoverStyle}
            />
            <NavItem
              to="/doctor/medical-history"
              icon={<User size={20} />}
              label="medical history"
              linkBase={linkBase}
              activeStyle={activeStyle}
              hoverStyle={hoverStyle}
            />
            <NavItem
              to="/doctor/patients-history"
              icon={<User size={20} />}
              label="patients history"
              linkBase={linkBase}
              activeStyle={activeStyle}
              hoverStyle={hoverStyle}
            />
          </>
        )}

        {/* ================= RECEPTION ================= */}
        {role === "Reception" && (
          <>
            <NavItem
              to="/reception/dashboard"
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              linkBase={linkBase}
              activeStyle={activeStyle}
              hoverStyle={hoverStyle}
            />
            <NavItem
              to="/reception/create-patient"
              icon={<ClipboardList size={20} />}
              label="Register Patient"
              linkBase={linkBase}
              activeStyle={activeStyle}
              hoverStyle={hoverStyle}
            />
            <NavItem
              to="/reception/patients"
              icon={<Users size={20} />}
              label="Patients list"
              linkBase={linkBase}
              activeStyle={activeStyle}
              hoverStyle={hoverStyle}
            />
            <NavItem
              to="/reception/book-appointment"
              icon={<Users size={20} />}
              label="Apointments"
              linkBase={linkBase}
              activeStyle={activeStyle}
              hoverStyle={hoverStyle}
            />
          </>
        )}
      </nav>
    </div>
  );
}

function NavItem({ to, icon, label, linkBase, activeStyle, hoverStyle }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${linkBase} ${isActive ? activeStyle : hoverStyle}`
      }
    >
      {icon}
      <span className="opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
        {label}
      </span>
    </NavLink>
  );
}
