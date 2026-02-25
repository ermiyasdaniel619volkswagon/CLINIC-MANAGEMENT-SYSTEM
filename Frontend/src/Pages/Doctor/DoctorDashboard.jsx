import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, CheckCircle, Clock, Users, Activity } from "react-feather";

export default function DoctorDashboard() {
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  const doctorId = localStorage.getItem("doctorId"); // adjust if needed

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];

        const res = await axios.get(
          `http://localhost:5000/appointment?doctor_id=${doctorId}&date=${today}`,
        );

        const appointments = res.data.data.appointments || [];

        setTodayAppointments(appointments);
        setCompletedCount(
          appointments.filter((a) => a.status === "Completed").length,
        );
        setPendingCount(
          appointments.filter((a) => a.status !== "Completed").length,
        );
      } catch (error) {
        console.error("Doctor dashboard error", error);
      }
    };

    fetchDoctorData();
  }, [doctorId]);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Doctor Dashboard</h1>
        <p className="text-gray-500">Overview of today's appointments</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Today's Appointments</p>
              <h2 className="text-2xl font-bold">{todayAppointments.length}</h2>
            </div>
            <Calendar className="text-blue-600" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Completed</p>
              <h2 className="text-2xl font-bold">{completedCount}</h2>
            </div>
            <CheckCircle className="text-green-600" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Pending</p>
              <h2 className="text-2xl font-bold">{pendingCount}</h2>
            </div>
            <Clock className="text-orange-500" size={32} />
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Today's Schedule</h2>

        {todayAppointments.length === 0 ? (
          <p className="text-gray-400 text-sm">No appointments today.</p>
        ) : (
          <ul className="space-y-3">
            {todayAppointments.map((a) => (
              <li
                key={a.id}
                className="flex justify-between border-b pb-2 text-sm"
              >
                <span className="font-medium">{a.patient?.full_name}</span>
                <span className="text-gray-500">{a.appointment_time}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
