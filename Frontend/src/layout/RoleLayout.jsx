// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import { Outlet } from "react-router-dom";

// export default function RoleLayout({ role }) {
//   return (
//     <div className="h-screen overflow-hidden">
//       {/* Navbar */}
//       <Navbar />

//       {/* Main Section */}
//       <div className="flex pt-16 h-[calc(100vh-64px)]">
//         <Sidebar role={role} />

//         <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function RoleLayout({ role }) {
  return (
    <div className="min-h-screen bg-[#e6ecf3] flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Space below navbar */}
      <div className="pt-20 px-6 flex-1 flex flex-col">
        {/* Main Content Wrapper with spacing */}
        <div className="flex flex-1 gap-6">
          {/* Sidebar */}
          <div className="mt-4 mb-4">
            <Sidebar role={role} />
          </div>

          {/* Page Content */}
          <main
            className="flex-1 bg-[#e6ecf3] rounded-3xl p-6 
                           shadow-[9px_9px_16px_#c3c9d4,-9px_-9px_16px_#ffffff]
                           overflow-y-auto mt-4 mb-4"
          >
            <Outlet />
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
