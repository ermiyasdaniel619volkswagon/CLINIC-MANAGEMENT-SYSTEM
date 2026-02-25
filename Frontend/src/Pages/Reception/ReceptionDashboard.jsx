import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Users, UserPlus, Calendar, TrendingUp, Activity } from "react-feather";

export default function ReceptionDashboard() {
  const [totalPatients, setTotalPatients] = useState(0);
  const [todayAppointments, setTodayAppointments] = useState(0);
  const [recentPatients, setRecentPatients] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const patientsRes = await axios.get("http://localhost:5000/patient");
      setTotalPatients(patientsRes.data.length);
      setRecentPatients(patientsRes.data.slice(-5).reverse());

      const today = new Date().toISOString().split("T")[0];

      const appointmentsRes = await axios.get(
        `http://localhost:5000/appointment?date=${today}`,
      );
      setTodayAppointments(appointmentsRes.data.results || 0);
    } catch (error) {
      console.error("Dashboard fetch error", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchDashboardData();
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Reception Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Manage patients and appointments efficiently
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Patients</p>
              <h2 className="text-2xl font-bold mt-1">{totalPatients}</h2>
            </div>
            <Users className="text-blue-600" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Today's Appointments</p>
              <h2 className="text-2xl font-bold mt-1">{todayAppointments}</h2>
            </div>
            <Calendar className="text-green-600" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">System Activity</p>
              <h2 className="text-2xl font-bold mt-1">Active</h2>
            </div>
            <Activity className="text-purple-600" size={32} />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Link
          to="/reception/create-patient"
          className="srom-blue-600 to-teal-500 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition"
        >
          <div className="flex items-center gap-4">
            <UserPlus size={28} />
            <div>
              <h2 className="text-lg font-semibold">Register New Patient</h2>
              <p className="text-sm opacity-90">
                Quickly add new patients to the system
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/reception/patients"
          className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
        >
          <div className="flex items-center gap-4">
            <Users size={28} className="text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold">Manage Patients</h2>
              <p className="text-gray-500 text-sm">
                View, search and update patient records
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Patients */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            Recently Registered Patients
          </h2>
          <TrendingUp size={18} className="text-gray-400" />
        </div>

        {recentPatients.length === 0 ? (
          <p className="text-gray-400 text-sm">No recent patients found.</p>
        ) : (
          <ul className="space-y-3">
            {recentPatients.map((patient) => (
              <li
                key={patient.id}
                className="flex justify-between items-center border-b pb-2 text-sm"
              >
                <span className="font-medium text-gray-700">
                  {patient.full_name}
                </span>
                <span className="text-gray-400">{patient.phone}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
