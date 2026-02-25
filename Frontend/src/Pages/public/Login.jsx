import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Demo authentication
    localStorage.setItem("token", "demo-token");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e6ecf3] px-6">
      <div
        className="w-full max-w-md bg-[#e6ecf3] rounded-3xl p-10 
                    shadow-[9px_9px_16px_#c3c9d4,-9px_-9px_16px_#ffffff] 
                    transition-all duration-300 hover:shadow-[12px_12px_20px_#c3c9d4,-12px_-12px_20px_#ffffff]"
      >
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <div
            className="w-20 h-20 mx-auto mb-4 rounded-full 
                        bg-[#e6ecf3] 
                        shadow-[5px_5px_10px_#c3c9d4,-5px_-5px_10px_#ffffff]
                        flex items-center justify-center"
          >
            <span className="text-xl font-bold text-blue-600">CMS</span>
          </div>

          <h2 className="text-2xl font-semibold text-gray-700">
            Clinic<span className="text-blue-600">MS</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Sign in to access your dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-4 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#e6ecf3]
                       shadow-[inset_5px_5px_10px_#c3c9d4,inset_-5px_-5px_10px_#ffffff]
                       focus:outline-none focus:shadow-[inset_2px_2px_5px_#c3c9d4,inset_-2px_-2px_5px_#ffffff]
                       transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-4 text-gray-400" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-12 pr-12 py-3 rounded-xl bg-[#e6ecf3]
                       shadow-[inset_5px_5px_10px_#c3c9d4,inset_-5px_-5px_10px_#ffffff]
                       focus:outline-none focus:shadow-[inset_2px_2px_5px_#c3c9d4,inset_-2px_-2px_5px_#ffffff]
                       transition-all duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-gray-400 hover:text-blue-600 transition"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 text-center animate-pulse">
              {error}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-medium text-white
                     bg-linear-to-r from-blue-500 to-teal-500
                     shadow-[5px_5px_10px_#c3c9d4,-5px_-5px_10px_#ffffff]
                     hover:scale-105 active:scale-95
                     transition-all duration-300"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Demo: enter any email & password
        </p>
      </div>
    </div>
  );
}

export default Login;
