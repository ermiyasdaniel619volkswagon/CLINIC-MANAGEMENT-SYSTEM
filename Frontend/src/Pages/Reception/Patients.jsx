
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Search, UserPlus, Eye, Calendar, Users } from "react-feather";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/patient");
      setPatients(res.data);
    } catch (err) {
      console.error("Error fetching patients", err);
    } finally {
      setLoading(false);
    }
  };

  // Filtering + Sorting
  const filteredPatients = useMemo(() => {
    let filtered = [...patients];

    // Search by name
    if (search) {
      filtered = filtered.filter((p) =>
        p.full_name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Sort
    if (sortBy === "recent") {
      filtered.sort(
        (a, b) =>
          new Date(b.created_at || b.id) - new Date(a.created_at || a.id),
      );
    }

    if (sortBy === "name") {
      filtered.sort((a, b) => a.full_name.localeCompare(b.full_name));
    }

    return filtered;
  }, [patients, search, sortBy]);

  return (
    <div className="bg-gray-100 flex justify-center py-10">
      <div className="w-full max-w-6xl px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <Users size={28} /> Patients Management
            </h1>
            <p className="text-gray-500 text-sm">
              Manage and monitor registered patients
            </p>
          </div>

          <Link
            to="/reception/create-patient"
            className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-teal-500
          text-white px-5 py-3 rounded-xl shadow-lg hover:scale-105 transition"
          >
            <UserPlus size={18} />
            Add Patient
          </Link>
        </div>

        {/* Search + Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="relative w-full md:w-1/3">
            <Search
              className="absolute left-4 top-3.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by patient name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200
            focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
          </div>

          <div className="flex items-center gap-3">
            <Calendar size={18} className="text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200
            focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="recent">Recently Added</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">
              Loading patients...
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                <tr>
                  <th className="p-5">Name</th>
                  <th className="p-5">Gender</th>
                  <th className="p-5">Phone</th>
                  <th className="p-5">Region</th>
                  <th className="p-5 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center p-8 text-gray-400">
                      No patients found.
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="border-b hover:bg-blue-50 transition"
                    >
                      <td className="p-5 font-medium text-gray-800">
                        {patient.full_name}
                      </td>
                      <td className="p-5">{patient.gender}</td>
                      <td className="p-5">{patient.phone}</td>
                      <td className="p-5">{patient.region}</td>
                      <td className="p-5 text-center">
                        <Link
                          to={`/patients/${patient.id}`}
                          className="inline-flex items-center gap-2 text-blue-600
                        hover:text-blue-800 font-medium transition"
                        >
                          <Eye size={16} />
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
