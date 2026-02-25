import { useEffect, useState } from "react";
import axios from "axios";
import { Users, Calendar, Clock, Activity } from "react-feather";

const NurseAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const [doctorId, setDoctorId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchDoctors();
    fetchPatients();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/doctor");
      setDoctors(res.data);
    } catch (err) {
      console.error("Error fetching doctors", err);
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/patient");
      setPatients(res.data);
    } catch (err) {
      console.error("Error fetching patients", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:5000/appointment", {
        doctor_id: doctorId,
        patient_id: patientId,
        appointment_date: date,
        appointment_time: time,
        status: "Scheduled",
      });

      setMessage("✅ Appointment booked successfully!");
      setDoctorId("");
      setPatientId("");
      setDate("");
      setTime("");
    } catch (err) {
      setMessage(
        err.response?.data?.message || "❌ Failed to book appointment",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-10 bg-[#e6ecf3] min-h-[calc(100vh-140px)]">
      <div
        className="w-full max-w-3xl mx-auto bg-[#e6ecf3] rounded-3xl p-10
        shadow-[9px_9px_16px_#c3c9d4,-9px_-9px_16px_#ffffff]
        transition-all duration-300"
      >
        {/* Title */}
        <div className="text-center mb-8">
          <div
            className="w-20 h-20 mx-auto mb-4 rounded-full 
            bg-[#e6ecf3]
            shadow-[5px_5px_10px_#c3c9d4,-5px_-5px_10px_#ffffff]
            flex items-center justify-center"
          >
            <Calendar className="text-blue-600" />
          </div>

          <h2 className="text-2xl font-semibold text-gray-700">
            Book <span className="text-blue-600">Appointment</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Register a new patient appointment
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          {/* Patient */}
          <div className="relative">
            <Users className="absolute left-4 top-4 text-gray-400" size={18} />
            <select
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#e6ecf3]
              shadow-[inset_5px_5px_10px_#c3c9d4,inset_-5px_-5px_10px_#ffffff]
              focus:outline-none appearance-none"
            >
              <option value="">Select Patient</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.full_name}
                </option>
              ))}
            </select>
          </div>

          {/* Doctor */}
          <div className="relative">
            <Activity
              className="absolute left-4 top-4 text-gray-400"
              size={18}
            />
            <select
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#e6ecf3]
              shadow-[inset_5px_5px_10px_#c3c9d4,inset_-5px_-5px_10px_#ffffff]
              focus:outline-none appearance-none"
            >
              <option value="">Select Doctor</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.full_name} - {d.specialization}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="relative">
            <Calendar
              className="absolute left-4 top-4 text-gray-400"
              size={18}
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#e6ecf3]
              shadow-[inset_5px_5px_10px_#c3c9d4,inset_-5px_-5px_10px_#ffffff]
              focus:outline-none"
            />
          </div>

          {/* Time */}
          <div className="relative">
            <Clock className="absolute left-4 top-4 text-gray-400" size={18} />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#e6ecf3]
              shadow-[inset_5px_5px_10px_#c3c9d4,inset_-5px_-5px_10px_#ffffff]
              focus:outline-none"
            />
          </div>

          {/* Message */}
          {message && (
            <p className="col-span-2 text-center text-sm text-gray-600 animate-pulse">
              {message}
            </p>
          )}

          {/* Submit */}
          <div className="col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-medium text-white
              bg-linear-to-r from-blue-500 to-teal-500
              shadow-[5px_5px_10px_#c3c9d4,-5px_-5px_10px_#ffffff]
              hover:scale-105 active:scale-95
              transition-all duration-300"
            >
              {loading ? "Booking..." : "Book Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NurseAppointment;
