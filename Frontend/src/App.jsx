// import { Routes, Route, Navigate } from "react-router-dom";
// import Layout from "./layout/Layout";
// import RoleLayout from "./layout/RoleLayout";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Landing from "./Pages/public/Landing";
// import Login from "./Pages/public/Login";
// import AdminDashboard from "./Pages/Admin/AdminDashboard";
// // import ManageUsers from "./Pages/Admin/ManageUsers";
// import DoctorDashboard from "./Pages/Doctor/DoctorDashboard";
// // import MyPatients from ".Pages/Doctor/MyPatients";
// import ReceptionDashboard from "./Pages/Reception/ReceptionDashboard";
// // import RegisterPatient from "./Pages/Reception/RegisterPatient";
// import Patients from "./Pages/Reception/Patients";
// import CreatePatient from "./Pages/Reception/CreatePatient";
// export default function App() {
//   return (
//     <Routes>
//       <Route element={<Layout />}>
//         <Route path="/" element={<Landing />} />
//       </Route>

//       <Route path="/login" element={<Login />} />

//       <Route
//         element={
//           <ProtectedRoute>
//             <RoleLayout role="Admin" />
//           </ProtectedRoute>
//         }
//       >
//         <Route path="/admin/dashboard" element={<AdminDashboard />} />
//         {/* <Route path="/admin/users" element={<ManageUsers />} /> */}
//       </Route>

//       <Route
//         element={
//           <ProtectedRoute>
//             <RoleLayout role="Doctor" />
//           </ProtectedRoute>
//         }
//       >
//         <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
//         {/* <Route path="/doctor/patients" element={<MyPatients />} /> */}
//       </Route>

//       <Route
//         element={
//           <ProtectedRoute>
//             <RoleLayout role="Reception" />
//           </ProtectedRoute>
//         }
//       >
//         <Route path="/reception/dashboard" element={<ReceptionDashboard />} />
//         {/* <Route path="/reception/register" element={<RegisterPatient />} /> */}
//         <Route path="/reception/register" element={<Patients />} />
//         <Route path="/reception/create-patient" element={<CreatePatient />} />
//       </Route>

//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//   );
// }
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import RoleLayout from "./layout/RoleLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Landing from "./Pages/public/Landing";
import Login from "./Pages/public/Login";

// Admin
import AdminDashboard from "./Pages/Admin/AdminDashboard";

// Doctor
import DoctorDashboard from "./Pages/Doctor/DoctorDashboard";

// Reception
import ReceptionDashboard from "./Pages/Reception/ReceptionDashboard";
import Patients from "./Pages/Reception/Patients";
import CreatePatient from "./Pages/Reception/CreatePatient";
import NurseAppointment from "./Pages/Reception/NurseAppointment";
import CreateMedHistory from "./Pages/Doctor/CreateMedHistory";
import PatientHistory from "./Pages/Doctor/PatientHistory";
import Admin from "./Pages/Admin/Admin";
export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
      </Route>

      <Route path="/login" element={<Login />} />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <RoleLayout role="Admin" />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<Admin />} />
      </Route>

      {/* ================= DOCTOR ================= */}
      <Route
        path="/doctor"
        element={
          <ProtectedRoute>
            <RoleLayout role="Doctor" />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DoctorDashboard />} />
        {/* :patientId must be added ok  */}
        <Route path="medical-history/" element={<CreateMedHistory />} />
        <Route path="patients-history/" element={<PatientHistory />} />
      </Route>

      {/* ================= RECEPTION ================= */}
      <Route
        path="/reception"
        element={
          <ProtectedRoute>
            <RoleLayout role="Reception" />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<ReceptionDashboard />} />
        <Route path="patients" element={<Patients />} />
        <Route path="create-patient" element={<CreatePatient />} />
        <Route path="book-appointment" element={<NurseAppointment />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
