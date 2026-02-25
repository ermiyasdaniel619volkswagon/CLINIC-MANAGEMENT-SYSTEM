// export default function Dashboard() {
//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

//       <div className="grid grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="text-lg font-semibold">Total Doctors</h2>
//           <p className="text-3xl mt-2 text-blue-600">12</p>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="text-lg font-semibold">Total Patients</h2>
//           <p className="text-3xl mt-2 text-green-600">243</p>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="text-lg font-semibold">Revenue</h2>
//           <p className="text-3xl mt-2 text-amber-600">120,000 ETB</p>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "axios";
import { Users, UserCheck, Shield } from "react-feather";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    doctors: 0,
    admins: 0,
  });

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const users = res.data.data.users;

      setStats({
        total: users.length,
        doctors: users.filter((u) => u.role === "Doctor").length,
        admins: users.filter((u) => u.role === "Admin").length,
      });
    } catch (error) {
      console.error("Dashboard error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUsers();
    };
    fetchData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <Card
          title="Total Users"
          value={stats.total}
          icon={<Users size={28} />}
          color="text-blue-600"
        />
        <Card
          title="Doctors"
          value={stats.doctors}
          icon={<UserCheck size={28} />}
          color="text-green-600"
        />
        <Card
          title="Admins"
          value={stats.admins}
          icon={<Shield size={28} />}
          color="text-purple-600"
        />
      </div>
    </div>
  );
}

function Card({ title, value, icon, color }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500">{title}</p>
          <h2 className="text-3xl font-bold mt-2">{value}</h2>
        </div>
        <div className={color}>{icon}</div>
      </div>
    </div>
  );
}
