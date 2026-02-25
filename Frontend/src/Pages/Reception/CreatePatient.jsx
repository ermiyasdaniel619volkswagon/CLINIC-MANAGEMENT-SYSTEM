// // import React, { useState } from "react";
// // import { User, Phone, Calendar, Users } from "react-feather";

// // const CreatePatient = () => {
// //   const [form, setForm] = useState({
// //     full_name: "",
// //     phone: "",
// //     age: "",
// //     gender: "",
// //   });
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const handleChange = (e) => {
// //     setForm({
// //       ...form,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError("");
// //     // Add your submit logic here
// //     setTimeout(() => {
// //       setLoading(false);
// //       setForm({
// //         full_name: "",
// //         phone: "",
// //         age: "",
// //         gender: "",
// //       });
// //     }, 1000);
// //   };

// //   return (
// //     <div className="px-6 py-10 bg-[#e6ecf3]">
// //       <div
// //         className="w-full max-w-3xl mx-auto bg-[#e6ecf3] rounded-3xl p-10
// //         shadow-[9px_9px_16px_#c3c9d4,-9px_-9px_16px_#ffffff]
// //         transition-all duration-300 hover:shadow-[12px_12px_20px_#c3c9d4,-12px_-12px_20px_#ffffff]"
// //       >
// //         {/* Title */}
// //         <div className="text-center mb-8">
// //           <div
// //             className="w-20 h-20 mx-auto mb-4 rounded-full
// //             bg-[#e6ecf3]
// //             shadow-[5px_5px_10px_#c3c9d4,-5px_-5px_10px_#ffffff]
// //             flex items-center justify-center"
// //           >
// //             <User className="text-blue-600" />
// //           </div>

// //           <h2 className="text-2xl font-semibold text-gray-700">
// //             Register <span className="text-blue-600">Patient</span>
// //           </h2>
// //           <p className="text-gray-500 text-sm mt-1">
// //             Add a new patient to the system
// //           </p>
// //         </div>

// //         <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
// //           {/* Full Name */}
// //           <div className="relative">
// //             <User className="absolute left-4 top-4 text-gray-400" size={18} />
// //             <input
// //               type="text"
// //               name="full_name"
// //               placeholder="Full Name"
// //               value={form.full_name}
// //               onChange={handleChange}
// //               required
// //               className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#e6ecf3]
// //               shadow-[inset_5px_5px_10px_#c3c9d4,inset_-5px_-5px_10px_#ffffff]
// //               focus:outline-none transition"
// //             />
// //           </div>

// //           {/* Phone */}
// //           <div className="relative">
// //             <Phone className="absolute left-4 top-4 text-gray-400" size={18} />
// //             <input
// //               type="text"
// //               name="phone"
// //               placeholder="Phone Number"
// //               value={form.phone}
// //               onChange={handleChange}
// //               required
// //               className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#e6ecf3]
// //               shadow-[inset_5px_5px_10px_#c3c9d4,inset_-5px_-5px_10px_#ffffff]
// //               focus:outline-none transition"
// //             />
// //           </div>

// //           {/* Age */}
// //           <div className="relative">
// //             <Calendar
// //               className="absolute left-4 top-4 text-gray-400"
// //               size={18}
// //             />
// //             <input
// //               type="number"
// //               name="age"
// //               placeholder="Age"
// //               value={form.age}
// //               onChange={handleChange}
// //               required
// //               className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#e6ecf3]
// //               shadow-[inset_5px_5px_10px_#c3c9d4,inset_-5px_-5px_10px_#ffffff]
// //               focus:outline-none transition"
// //             />
// //           </div>

// //           {/* Gender */}
// //           <div className="relative">
// //             <Users className="absolute left-4 top-4 text-gray-400" size={18} />
// //             <select
// //               name="gender"
// //               value={form.gender}
// //               onChange={handleChange}
// //               required
// //               className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#e6ecf3]
// //               shadow-[inset_5px_5px_10px_#c3c9d4,inset_-5px_-5px_10px_#ffffff]
// //               focus:outline-none transition appearance-none"
// //             >
// //               <option value="">Select Gender</option>
// //               <option value="Male">Male</option>
// //               <option value="Female">Female</option>
// //             </select>
// //           </div>

// //           {/* Error Full Width */}
// //           {error && (
// //             <p className="col-span-2 text-sm text-red-500 text-center animate-pulse">
// //               {error}
// //             </p>
// //           )}

// //           {/* Submit Full Width */}
// //           <div className="col-span-2">
// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="w-full py-3 rounded-xl font-medium text-white
// //               bg-linear-to-r from-blue-500 to-teal-500
// //               shadow-[5px_5px_10px_#c3c9d4,-5px_-5px_10px_#ffffff]
// //               hover:scale-105 active:scale-95
// //               transition-all duration-300"
// //             >
// //               {loading ? "Saving..." : "Save Patient"}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CreatePatient;
// import React, { useState } from "react";
// import { User, Phone, Calendar, Users } from "react-feather";

// const CreatePatient = () => {
//   const [form, setForm] = useState({
//     full_name: "",
//     phone: "",
//     age: "",
//     gender: "",
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Prevent negative age while typing
//     if (name === "age" && value < 0) return;

//     setForm({
//       ...form,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("");

//     // Age validation
//     if (form.age < 1 || form.age > 120) {
//       setError("Age must be between 1 and 120");
//       return;
//     }

//     setLoading(true);

//     // Simulated submit
//     setTimeout(() => {
//       setLoading(false);
//       setForm({
//         full_name: "",
//         phone: "",
//         age: "",
//         gender: "",
//       });
//     }, 1000);
//   };

//   return (
//     <div className="px-6 py-10 bg-[#e6ecf3]">
//       <div
//         className="w-full max-w-3xl mx-auto bg-[#e6ecf3] rounded-3xl p-10
//         shadow-[9px_9px_16px_#c3c9d4,-9px_-9px_16px_#ffffff]
//         transition-all duration-300 hover:shadow-[12px_12px_20px_#c3c9d4,-12px_-12px_20px_#ffffff]"
//       >
//         {/* Title */}
//         <div className="text-center mb-8">
//           <div
//             className="w-20 h-20 mx-auto mb-4 rounded-full
//             bg-[#e6ecf3]
//             shadow-[5px_5px_10px_#c3c9d4,-5px_-5px_10px_#ffffff]
//             flex items-center justify-center"
//           >
//             <User className="text-blue-600" />
//           </div>

//           <h2 className="text-2xl font-semibold text-gray-700">
//             Register <span className="text-blue-600">Patient</span>
//           </h2>
//           <p className="text-gray-500 text-sm mt-1">
//             Add a new patient to the system
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
//           {/* Full Name */}
//           <div className="relative">
//             <User className="absolute left-4 top-4 text-gray-400" size={18} />
//             <input
//               type="text"
//               name="full_name"
//               placeholder="Full Name"
//               value={form.full_name}
//               onChange={handleChange}
//               required
//               className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#e6ecf3]
//               shadow-[inset_5px_5px_10px_#c3c9d4,inset_-5px_-5px_10px_#ffffff]
//               focus:outline-none transition"
//             />
//           </div>

//           {/* Phone */}
//           <div className="relative">
//             <Phone className="absolute left-4 top-4 text-gray-400" size={18} />
//             <input
//               type="text"
//               name="phone"
//               placeholder="Phone Number"
//               value={form.phone}
//               onChange={handleChange}
//               required
//               className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#e6ecf3]
//               shadow-[inset_5px_5px_10px_#c3c9d4,inset_-5px_-5px_10px_#ffffff]
//               focus:outline-none transition"
//             />
//           </div>

//           {/* Age */}
//           <div className="relative">
//             <Calendar
//               className="absolute left-4 top-4 text-gray-400"
//               size={18}
//             />
//             <input
//               type="number"
//               name="age"
//               placeholder="Age"
//               value={form.age}
//               onChange={handleChange}
//               required
//               min="1"
//               max="120"
//               className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#e6ecf3]
//               shadow-[inset_5px_5px_10px_#c3c9d4,inset_-5px_-5px_10px_#ffffff]
//               focus:outline-none transition"
//             />
//           </div>

//           {/* Gender */}
//           <div className="relative">
//             <Users className="absolute left-4 top-4 text-gray-400" size={18} />
//             <select
//               name="gender"
//               value={form.gender}
//               onChange={handleChange}
//               required
//               className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#e6ecf3]
//               shadow-[inset_5px_5px_10px_#c3c9d4,inset_-5px_-5px_10px_#ffffff]
//               focus:outline-none transition appearance-none"
//             >
//               <option value="">Select Gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//             </select>
//           </div>

//           {/* Error */}
//           {error && (
//             <p className="col-span-2 text-sm text-red-500 text-center animate-pulse">
//               {error}
//             </p>
//           )}

//           {/* Submit */}
//           <div className="col-span-2">
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3 rounded-xl font-medium text-white
//               bg-gradient-to-r from-blue-500 to-teal-500
//               shadow-[5px_5px_10px_#c3c9d4,-5px_-5px_10px_#ffffff]
//               hover:scale-105 active:scale-95
//               transition-all duration-300"
//             >
//               {loading ? "Saving..." : "Save Patient"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreatePatient;
// import React, { useState } from "react";
// import { User, Phone, Calendar, Users, Smartphone } from "react-feather";

// const CreatePatient = () => {
//   const [form, setForm] = useState({
//     full_name: "",
//     phonePrefix: "+2519",
//     phone: "",
//     age: "",
//     gender: "",
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Prevent negative age
//     if (name === "age" && value < 0) return;

//     // Allow only numbers for phone
//     if (name === "phone" && !/^[0-9]*$/.test(value)) return;

//     setForm({
//       ...form,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("");

//     if (form.age < 1 || form.age > 120) {
//       setError("Age must be between 1 and 120");
//       return;
//     }

//     if (form.phone.length !== 8) {
//       setError("Phone number must be 8 digits after prefix");
//       return;
//     }

//     setLoading(true);

//     setTimeout(() => {
//       setLoading(false);
//       setForm({
//         full_name: "",
//         phonePrefix: "+2519",
//         phone: "",
//         age: "",
//         gender: "",
//       });
//     }, 1000);
//   };

//   return (
//     <div className="px-6 py-10 bg-[#e6ecf3]">
//       <div
//         className="w-full max-w-3xl mx-auto bg-[#e6ecf3] rounded-3xl p-10
//         shadow-[9px_9px_16px_#c3c9d4,-9px_-9px_16px_#ffffff]
//         transition-all duration-300 hover:shadow-[12px_12px_20px_#c3c9d4,-12px_-12px_20px_#ffffff]"
//       >
//         {/* Title */}
//         <div className="text-center mb-8">
//           <div
//             className="w-20 h-20 mx-auto mb-4 rounded-full
//             bg-[#e6ecf3]
//             shadow-[5px_5px_10px_#c3c9d4,-5px_-5px_10px_#ffffff]
//             flex items-center justify-center"
//           >
//             <User className="text-blue-600" />
//           </div>

//           <h2 className="text-2xl font-semibold text-gray-700">
//             Register <span className="text-blue-600">Patient</span>
//           </h2>
//           <p className="text-gray-500 text-sm mt-1">
//             Add a new patient to the system
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
//           {/* Full Name */}
//           <div className="relative">
//             <User className="absolute left-4 top-4 text-gray-400" size={18} />
//             <input
//               type="text"
//               name="full_name"
//               placeholder="Full Name"
//               value={form.full_name}
//               onChange={handleChange}
//               required
//               className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#e6ecf3]
//               shadow-[inset_5px_5px_10px_#c3c9d4,inset_-5px_-5px_10px_#ffffff]
//               focus:outline-none transition"
//             />
//           </div>

//           {/* Phone with Prefix */}
//           <div className="relative">
//             <Smartphone
//               className="absolute left-4 top-4 text-gray-400"
//               size={18}
//             />

//             <div className="flex">
//               <select
//                 name="phonePrefix"
//                 value={form.phonePrefix}
//                 onChange={handleChange}
//                 className="pl-10 pr-2 py-3 rounded-l-xl bg-[#e6ecf3]
//                 shadow-[inset_5px_5px_10px_#c3c9d4,inset_-5px_-5px_10px_#ffffff]
//                 focus:outline-none appearance-none"
//               >
//                 <option value="+2519">+2519 (Tele)</option>
//                 <option value="+2517">+2517 (Safaricom)</option>
//               </select>

//               <input
//                 type="text"
//                 name="phone"
//                 placeholder="XXXXXXXX"
//                 value={form.phone}
//                 onChange={handleChange}
//                 required
//                 maxLength="8"
//                 className="w-full px-4 py-3 rounded-r-xl bg-[#e6ecf3]
//                 shadow-[inset_5px_5px_10px_#c3c9d4,inset_-5px_-5px_10px_#ffffff]
//                 focus:outline-none transition"
//               />
//             </div>
//           </div>

//           {/* Age */}
//           <div className="relative">
//             <Calendar
//               className="absolute left-4 top-4 text-gray-400"
//               size={18}
//             />
//             <input
//               type="number"
//               name="age"
//               placeholder="Age"
//               value={form.age}
//               onChange={handleChange}
//               required
//               min="1"
//               max="120"
//               className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#e6ecf3]
//               shadow-[inset_5px_5px_10px_#c3c9d4,inset_-5px_-5px_10px_#ffffff]
//               focus:outline-none transition"
//             />
//           </div>

//           {/* Gender */}
//           <div className="relative">
//             <Users className="absolute left-4 top-4 text-gray-400" size={18} />
//             <select
//               name="gender"
//               value={form.gender}
//               onChange={handleChange}
//               required
//               className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#e6ecf3]
//               shadow-[inset_5px_5px_10px_#c3c9d4,inset_-5px_-5px_10px_#ffffff]
//               focus:outline-none transition appearance-none"
//             >
//               <option value="">Select Gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//             </select>
//           </div>

//           {/* Error */}
//           {error && (
//             <p className="col-span-2 text-sm text-red-500 text-center animate-pulse">
//               {error}
//             </p>
//           )}

//           {/* Submit */}
//           <div className="col-span-2">
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3 rounded-xl font-medium text-white
//               bg-gradient-to-r from-blue-500 to-teal-500
//               shadow-[5px_5px_10px_#c3c9d4,-5px_-5px_10px_#ffffff]
//               hover:scale-105 active:scale-95
//               transition-all duration-300"
//             >
//               {loading
//                 ? "Saving..."
//                 : `Save Patient (${form.phonePrefix}${form.phone})`}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreatePatient;
import React, { useState } from "react";
import {
  User,
  Phone,
  Calendar,
  Users,
  Smartphone,
  MapPin,
  Globe,
  AlertCircle,
} from "react-feather";

const CreatePatient = () => {
  const [form, setForm] = useState({
    full_name: "",
    gender: "",
    date_of_birth: "",
    phonePrefix: "+2519",
    phone: "",
    nationality: "",
    region: "",
    woreda: "",
    kebele: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only numbers for phone fields
    if (
      (name === "phone" || name === "emergency_contact_phone") &&
      !/^[0-9]*$/.test(value)
    )
      return;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (form.phone.length !== 8) {
      setError("Phone number must be 8 digits after prefix");
      return;
    }

    if (form.emergency_contact_phone.length < 9) {
      setError("Emergency contact phone is invalid");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setForm({
        full_name: "",
        gender: "",
        date_of_birth: "",
        phonePrefix: "+2519",
        phone: "",
        nationality: "",
        region: "",
        woreda: "",
        kebele: "",
        emergency_contact_name: "",
        emergency_contact_phone: "",
      });
    }, 1000);
  };

  return (
    <div className="px-6 py-10 bg-[#e6ecf3] min-h-screen">
      <div
        className="w-full max-w-5xl mx-auto bg-[#e6ecf3] rounded-3xl p-10
        shadow-[9px_9px_16px_#c3c9d4,-9px_-9px_16px_#ffffff]"
      >
        {/* Title */}
        <div className="text-center mb-10">
          <div
            className="w-20 h-20 mx-auto mb-4 rounded-full
            bg-[#e6ecf3]
            shadow-[5px_5px_10px_#c3c9d4,-5px_-5px_10px_#ffffff]
            flex items-center justify-center"
          >
            <User className="text-blue-600" />
          </div>

          <h2 className="text-2xl font-semibold text-gray-700">
            Register <span className="text-blue-600">Patient</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Complete patient registration information
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          {/* Full Name */}
          <InputField
            icon={<User size={18} />}
            name="full_name"
            placeholder="Full Name"
            value={form.full_name}
            onChange={handleChange}
          />

          {/* Gender */}
          <SelectField
            icon={<Users size={18} />}
            name="gender"
            value={form.gender}
            onChange={handleChange}
            options={["Male", "Female"]}
            placeholder="Select Gender"
          />

          {/* Date of Birth */}
          <InputField
            icon={<Calendar size={18} />}
            type="date"
            name="date_of_birth"
            value={form.date_of_birth}
            onChange={handleChange}
          />

          {/* Nationality */}
          <InputField
            icon={<Globe size={18} />}
            name="nationality"
            placeholder="Nationality"
            value={form.nationality}
            onChange={handleChange}
          />

          {/* Region */}
          <InputField
            icon={<MapPin size={18} />}
            name="region"
            placeholder="Region"
            value={form.region}
            onChange={handleChange}
          />

          {/* Woreda */}
          <InputField
            icon={<MapPin size={18} />}
            name="woreda"
            placeholder="Woreda"
            value={form.woreda}
            onChange={handleChange}
          />

          {/* Kebele */}
          <InputField
            icon={<MapPin size={18} />}
            name="kebele"
            placeholder="Kebele"
            value={form.kebele}
            onChange={handleChange}
          />

          {/* Phone */}
          <div className="relative">
            <Smartphone
              className="absolute left-4 top-4 text-gray-400"
              size={18}
            />
            <div className="flex">
              <select
                name="phonePrefix"
                value={form.phonePrefix}
                onChange={handleChange}
                className="pl-10 pr-2 py-3 rounded-l-xl bg-[#e6ecf3]
                shadow-[inset_5px_5px_10px_#c3c9d4,inset_-5px_-5px_10px_#ffffff]
                focus:outline-none"
              >
                <option value="+2519">+2519</option>
                <option value="+2517">+2517</option>
              </select>

              <input
                type="text"
                name="phone"
                placeholder="XXXXXXXX"
                value={form.phone}
                onChange={handleChange}
                maxLength="8"
                required
                className="w-full px-4 py-3 rounded-r-xl bg-[#e6ecf3]
                shadow-[inset_5px_5px_10px_#c3c9d4,inset_-5px_-5px_10px_#ffffff]
                focus:outline-none"
              />
            </div>
          </div>

          {/* Emergency Contact Name */}
          <InputField
            icon={<AlertCircle size={18} />}
            name="emergency_contact_name"
            placeholder="Emergency Contact Name"
            value={form.emergency_contact_name}
            onChange={handleChange}
          />

          {/* Emergency Contact Phone */}
          <InputField
            icon={<Phone size={18} />}
            name="emergency_contact_phone"
            placeholder="Emergency Contact Phone"
            value={form.emergency_contact_phone}
            onChange={handleChange}
          />

          {/* Error */}
          {error && (
            <p className="col-span-2 text-sm text-red-500 text-center animate-pulse">
              {error}
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
              hover:scale-105 active:scale-95 transition-all duration-300"
            >
              {loading ? "Saving..." : "Save Patient"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* Reusable Input */
const InputField = ({
  icon,
  name,
  placeholder,
  value,
  onChange,
  type = "text",
}) => (
  <div className="relative">
    <div className="absolute left-4 top-4 text-gray-400">{icon}</div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#e6ecf3]
      shadow-[inset_5px_5px_10px_#c3c9d4,inset_-5px_-5px_10px_#ffffff]
      focus:outline-none transition"
    />
  </div>
);

/* Reusable Select */
const SelectField = ({ icon, name, value, onChange, options, placeholder }) => (
  <div className="relative">
    <div className="absolute left-4 top-4 text-gray-400">{icon}</div>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#e6ecf3]
      shadow-[inset_5px_5px_10px_#c3c9d4,inset_-5px_-5px_10px_#ffffff]
      focus:outline-none appearance-none transition"
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default CreatePatient;
