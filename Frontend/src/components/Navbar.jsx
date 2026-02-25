// import { useState } from "react";
// import { Menu, X } from "lucide-react";
// import { Link } from "react-router-dom";
// import { HashLink } from "react-router-hash-link";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);

//   return (
//     <nav className="fixed top-0 w-full backdrop-blur-md bg-white/80 shadow-sm z-50">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//         {/* Logo */}
//         <Link to="/" className="text-2xl font-bold text-blue-600">
//           Clinic<span className="text-teal-600">MS</span>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex gap-8 font-medium items-center">
//           <HashLink
//             smooth
//             to="/#about"
//             className="hover:text-blue-600 transition"
//           >
//             About
//           </HashLink>

//           <HashLink
//             smooth
//             to="/#services"
//             className="hover:text-blue-600 transition"
//           >
//             Services
//           </HashLink>

//           <HashLink
//             smooth
//             to="/#faq"
//             className="hover:text-blue-600 transition"
//           >
//             FAQ
//           </HashLink>

//           <Link
//             to="/login"
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//           >
//             Login
//           </Link>
//         </div>

//         {/* Mobile Toggle */}
//         <button className="md:hidden" onClick={() => setOpen(!open)}>
//           {open ? <X /> : <Menu />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {open && (
//         <div className="md:hidden bg-white px-6 pb-6 flex flex-col gap-4 font-medium">
//           <HashLink
//             smooth
//             to="/#about"
//             onClick={() => setOpen(false)}
//             className="hover:text-blue-600"
//           >
//             About
//           </HashLink>

//           <HashLink
//             smooth
//             to="/#services"
//             onClick={() => setOpen(false)}
//             className="hover:text-blue-600"
//           >
//             Services
//           </HashLink>

//           <HashLink
//             smooth
//             to="/#faq"
//             onClick={() => setOpen(false)}
//             className="hover:text-blue-600"
//           >
//             FAQ
//           </HashLink>

//           <Link
//             to="/login"
//             onClick={() => setOpen(false)}
//             className="bg-blue-600 text-white py-2 rounded-lg text-center hover:bg-blue-700 transition"
//           >
//             Login
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// }
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 w-full z-50 bg-[#e6ecf3] 
                    shadow-[5px_5px_12px_#c3c9d4,-5px_-5px_12px_#ffffff]"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-semibold text-gray-700 tracking-wide"
        >
          Clinic<span className="text-blue-600">MS</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <HashLink
            smooth
            to="/#about"
            className="px-4 py-2 rounded-xl text-gray-600
                       shadow-[5px_5px_10px_#c3c9d4,-5px_-5px_10px_#ffffff]
                       hover:text-blue-600
                       hover:shadow-[inset_3px_3px_6px_#c3c9d4,inset_-3px_-3px_6px_#ffffff]
                       transition-all duration-300"
          >
            About
          </HashLink>

          <HashLink
            smooth
            to="/#services"
            className="px-4 py-2 rounded-xl text-gray-600
                       shadow-[5px_5px_10px_#c3c9d4,-5px_-5px_10px_#ffffff]
                       hover:text-blue-600
                       hover:shadow-[inset_3px_3px_6px_#c3c9d4,inset_-3px_-3px_6px_#ffffff]
                       transition-all duration-300"
          >
            Services
          </HashLink>

          <HashLink
            smooth
            to="/#faq"
            className="px-4 py-2 rounded-xl text-gray-600
                       shadow-[5px_5px_10px_#c3c9d4,-5px_-5px_10px_#ffffff]
                       hover:text-blue-600
                       hover:shadow-[inset_3px_3px_6px_#c3c9d4,inset_-3px_-3px_6px_#ffffff]
                       transition-all duration-300"
          >
            FAQ
          </HashLink>

          <Link
            to="/login"
            className="px-6 py-2 rounded-xl font-medium text-white
                       bg-linear-to-r from-blue-500 to-teal-500
                       shadow-[5px_5px_10px_#c3c9d4,-5px_-5px_10px_#ffffff]
                       hover:scale-105 active:scale-95
                       transition-all duration-300"
          >
            Login
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-lg
                     shadow-[5px_5px_10px_#c3c9d4,-5px_-5px_10px_#ffffff]
                     active:shadow-[inset_3px_3px_6px_#c3c9d4,inset_-3px_-3px_6px_#ffffff]
                     transition"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4 bg-[#e6ecf3]">
          <HashLink
            smooth
            to="/#about"
            onClick={() => setOpen(false)}
            className="py-2 px-4 rounded-xl text-gray-600
                       shadow-[5px_5px_10px_#c3c9d4,-5px_-5px_10px_#ffffff]
                       text-center"
          >
            About
          </HashLink>

          <HashLink
            smooth
            to="/#services"
            onClick={() => setOpen(false)}
            className="py-2 px-4 rounded-xl text-gray-600
                       shadow-[5px_5px_10px_#c3c9d4,-5px_-5px_10px_#ffffff]
                       text-center"
          >
            Services
          </HashLink>

          <HashLink
            smooth
            to="/#faq"
            onClick={() => setOpen(false)}
            className="py-2 px-4 rounded-xl text-gray-600
                       shadow-[5px_5px_10px_#c3c9d4,-5px_-5px_10px_#ffffff]
                       text-center"
          >
            FAQ
          </HashLink>

          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="py-2 rounded-xl text-white text-center
                       bg-linear-to-r from-blue-500 to-teal-500
                       shadow-[5px_5px_10px_#c3c9d4,-5px_-5px_10px_#ffffff]"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
