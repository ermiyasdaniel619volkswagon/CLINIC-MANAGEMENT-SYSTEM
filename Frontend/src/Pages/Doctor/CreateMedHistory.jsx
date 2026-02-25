import { useState } from "react";
import axios from "axios";
import { FileText, Activity, Save } from "react-feather";
import { useParams } from "react-router-dom";

export default function CreateMedHistory() {
  const { patientId } = useParams();

  const [form, setForm] = useState({
    diagnosis: "",
    treatment: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const doctorId = localStorage.getItem("doctorId"); // adjust if needed

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:5000/medhistory", {
        ...form,
        patient_id: patientId,
        doctor_id: doctorId,
      });

      setMessage("✅ Medical history added successfully!");
      setForm({
        diagnosis: "",
        treatment: "",
        notes: "",
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Failed to save history");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-10 bg-[#e6ecf3] min-h-[calc(100vh-140px)]">
      <div
        className="w-full max-w-3xl mx-auto bg-[#e6ecf3] rounded-3xl p-10
        shadow-[9px_9px_16px_#c3c9d4,-9px_-9px_16px_#ffffff]"
      >
        {/* Title */}
        <div className="text-center mb-8">
          <div
            className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#e6ecf3]
            shadow-[5px_5px_10px_#c3c9d4,-5px_-5px_10px_#ffffff]
            flex items-center justify-center"
          >
            <Activity className="text-blue-600" />
          </div>

          <h2 className="text-2xl font-semibold text-gray-700">
            Add <span className="text-blue-600">Medical History</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FileText
              className="absolute left-4 top-4 text-gray-400"
              size={18}
            />
            <input
              type="text"
              name="diagnosis"
              placeholder="Diagnosis"
              value={form.diagnosis}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#e6ecf3]
              shadow-[inset_5px_5px_10px_#c3c9d4,inset_-5px_-5px_10px_#ffffff]
              focus:outline-none"
            />
          </div>

          <textarea
            name="treatment"
            placeholder="Treatment"
            value={form.treatment}
            onChange={handleChange}
            required
            rows="3"
            className="w-full p-4 rounded-xl bg-[#e6ecf3]
            shadow-[inset_5px_5px_10px_#c3c9d4,inset_-5px_-5px_10px_#ffffff]
            focus:outline-none"
          />

          <textarea
            name="notes"
            placeholder="Additional Notes"
            value={form.notes}
            onChange={handleChange}
            rows="3"
            className="w-full p-4 rounded-xl bg-[#e6ecf3]
            shadow-[inset_5px_5px_10px_#c3c9d4,inset_-5px_-5px_10px_#ffffff]
            focus:outline-none"
          />

          {message && (
            <p className="text-center text-sm text-gray-600">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-medium text-white
            bg-linear-to-r from-blue-500 to-teal-500
            shadow-[5px_5px_10px_#c3c9d4,-5px_-5px_10px_#ffffff]
            hover:scale-105 transition"
          >
            {loading ? "Saving..." : "Save History"}
          </button>
        </form>
      </div>
    </div>
  );
}
