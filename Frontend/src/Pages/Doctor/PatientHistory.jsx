import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FileText, User, Calendar } from "react-feather";

export default function PatientHistory() {
  const { patientId } = useParams();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/medhistory/${patientId}`,
        );
        setHistory(res.data.data.history);
      } catch (error) {
        console.error("History fetch error", error);
      }
    };
    fetchData();
  }, [patientId]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Medical History</h1>

      {history.length === 0 ? (
        <p className="text-gray-400">No medical history found.</p>
      ) : (
        history.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex justify-between mb-3">
              <h2 className="font-semibold text-lg">{item.diagnosis}</h2>
              <span className="text-sm text-gray-400">
                {item.createdAt?.split("T")[0]}
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-2">
              <strong>Treatment:</strong> {item.treatment}
            </p>

            {item.notes && (
              <p className="text-gray-500 text-sm">
                <strong>Notes:</strong> {item.notes}
              </p>
            )}

            <div className="mt-4 text-xs text-gray-400 flex justify-between">
              <span>Doctor: {item.doctor?.full_name}</span>
              <span>Appointment ID: {item.med_appointment?.id}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
