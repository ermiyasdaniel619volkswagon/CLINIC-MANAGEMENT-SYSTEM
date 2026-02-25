// import { useState } from "react";
// import axios from "axios";

// export default function Admin() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "Receptionist",
//     status: "Active",
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       await axios.post("http://localhost:5000/api/users", formData);
//       setMessage("User created successfully");
//       setFormData({
//         name: "",
//         email: "",
//         password: "",
//         role: "Receptionist",
//         status: "Active",
//       });
//     } catch {
//       setMessage("Error creating user");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-xl p-8">
//       <h2 className="text-2xl font-bold text-blue-700 mb-6">
//         Admin - Create User
//       </h2>

//       {message && (
//         <div className="mb-4 p-3 rounded bg-gray-100 text-center">
//           {message}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-5">
//         {/* Name */}
//         <div>
//           <label className="block mb-1 font-medium">Full Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Email */}
//         <div>
//           <label className="block mb-1 font-medium">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Password */}
//         <div>
//           <label className="block mb-1 font-medium">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Role */}
//         <div>
//           <label className="block mb-1 font-medium">Role</label>
//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="Admin">Admin</option>
//             <option value="Doctor">Doctor</option>
//             <option value="Receptionist">Receptionist</option>
//           </select>
//         </div>

//         {/* Status */}
//         <div>
//           <label className="block mb-1 font-medium">Status</label>
//           <select
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
//         >
//           {loading ? "Creating..." : "Create User"}
//         </button>
//       </form>
//     </div>
//   );
// }
import { useState } from "react";
import axios from "axios";
import { User, Mail, Lock, Shield, Activity } from "react-feather";

export default function Admin() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Receptionist",
    status: "Active",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:5000/api/users", formData);

      setMessage("✅ User created successfully");

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "Receptionist",
        status: "Active",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Error creating user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-10 bg-[#e6ecf3] min-h-[calc(100vh-140px)]">
      <div
        className="w-full max-w-3xl mx-auto bg-[#e6ecf3] rounded-3xl p-10
        shadow-[9px_9px_16px_#c3c9d4,-9px_-9px_16px_#ffffff]
        transition-all duration-300 hover:shadow-[12px_12px_20px_#c3c9d4,-12px_-12px_20px_#ffffff]"
      >
        {/* Title */}
        <div className="text-center mb-8">
          <div
            className="w-20 h-20 mx-auto mb-4 rounded-full 
            bg-[#e6ecf3] 
            shadow-[5px_5px_10px_#c3c9d4,-5px_-5px_10px_#ffffff]
            flex items-center justify-center"
          >
            <Shield className="text-blue-600" />
          </div>

          <h2 className="text-2xl font-semibold text-gray-700">
            Create <span className="text-blue-600">System User</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Add new staff members to the clinic system
          </p>
        </div>

        {/* Message */}
        {message && (
          <div className="mb-6 text-center text-sm text-gray-600">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-4 top-4 text-gray-400" size={18} />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#e6ecf3]
              shadow-[inset_5px_5px_10px_#c3c9d4,inset_-5px_-5px_10px_#ffffff]
              focus:outline-none transition"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-4 text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#e6ecf3]
              shadow-[inset_5px_5px_10px_#c3c9d4,inset_-5px_-5px_10px_#ffffff]
              focus:outline-none transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-4 text-gray-400" size={18} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#e6ecf3]
              shadow-[inset_5px_5px_10px_#c3c9d4,inset_-5px_-5px_10px_#ffffff]
              focus:outline-none transition"
            />
          </div>

          {/* Role */}
          <div className="relative">
            <Shield className="absolute left-4 top-4 text-gray-400" size={18} />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#e6ecf3]
              shadow-[inset_5px_5px_10px_#c3c9d4,inset_-5px_-5px_10px_#ffffff]
              focus:outline-none appearance-none transition"
            >
              <option value="Admin">Admin</option>
              <option value="Doctor">Doctor</option>
              <option value="Receptionist">Receptionist</option>
            </select>
          </div>

          {/* Status */}
          <div className="relative md:col-span-2">
            <Activity
              className="absolute left-4 top-4 text-gray-400"
              size={18}
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#e6ecf3]
              shadow-[inset_5px_5px_10px_#c3c9d4,inset_-5px_-5px_10px_#ffffff]
              focus:outline-none appearance-none transition"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

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
              {loading ? "Creating..." : `Create ${formData.role}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
