import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate if needed

// No illustration component needed

const LoginComponent = ({ onLogin }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate(); // Uncomment if needed

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // --- handleLogin function remains the same ---
  const handleLogin = async (e) => {
      e.preventDefault();
      if (!username || !password) { toast.warn("Please enter both username and password.", { position: "top-center", autoClose: 3000 }); return; }
      try {
        const params = new URLSearchParams({ username, password });
        const response = await fetch( `http://localhost:8080/login?${params.toString()}` );
        if (response.ok) {
          toast.success("Login successful!", { position: "top-center", autoClose: 2000 });
          onLogin(username, password);
        } else { const errorMessage = await response.text(); toast.error(errorMessage || "Login failed. Please check credentials.", { position: "top-center", autoClose: 3000 }); }
      } catch (error) { console.error("Login API error:", error); toast.error("An error occurred. Please check server or network.", { position: "top-center", autoClose: 3000 }); }
    };


  return (
    // Main container centering the login card
    <div className="min-h-screen flex items-center justify-center bg-purple-50 p-4">
      <ToastContainer />
      {/* Login Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-md">
        {/* Form Section (now takes full card width) */}
        <div className="p-6 sm:p-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">
            Login
          </h1>

          {/* Introductory Text */}
          <p className="text-center text-sm text-gray-600 mb-8">
            Welcome back! Please sign in to access your account.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1"> Username </label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Enter your username" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"/>
            </div>

           {/* Password Field */}
<div className="relative">
  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1"> Password </label>
  <input 
    type={passwordVisible ? "text" : "password"} 
    id="password" 
    value={password} 
    onChange={(e) => setPassword(e.target.value)} 
    required 
    placeholder="Enter your password" 
    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
  />
  <span 
    onClick={togglePasswordVisibility} 
    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer hover:text-gray-700 pt-6" 
    title={passwordVisible ? "Hide password" : "Show password"}
  >
    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>

            {/* Submit Button */}
            <button type="submit" className="w-full py-2.5 px-4 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200 ease-in-out">
              Login
            </button>

            {/* Signup Link */}
            <p className="text-center text-sm text-gray-600 mt-6">
              Create a new account?{" "}
              <Link to="/SignUpComp" className="text-purple-500 hover:text-purple-700 font-medium underline"> Sign Up </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

LoginComponent.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginComponent;