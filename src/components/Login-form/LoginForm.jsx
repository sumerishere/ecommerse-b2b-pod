import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, X } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User } from "lucide-react";

const VALID_CREDENTIALS = {
  email: "test@example.com",
  password: "password123"
};

const LoginForm = ({onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();

    // let isValid = true;
    // setEmailError('');
    // setPasswordError('');
    // setLoginError('');

    // // Validation checks...
    // if (!email) {
    //   setEmailError('Email is required.');
    //   isValid = false;
    // } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    //   setEmailError('Please enter a valid email address.');
    //   isValid = false;
    // }

    // if (!password) {
    //   setPasswordError('Password is required.');
    //   isValid = false;
    // } else if (password.length < 6) {
    //   setPasswordError('Password must be at least 6 characters long.');
    //   isValid = false;
    // }

    // if (isValid) {
      try {
        const response = await fetch(`http://localhost:8080/api/users/login?email=${email}&password=${password}`);
        
        if (!response.ok) {
          throw new Error('Login failed');
        }

        const userData = await response.json();
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');
        toast.success('Login successful!');
        onClose();

        setTimeout(() => {
          navigate('/');
        },3000);
        
      } catch (error) {
        // setLoginError('Invalid email or password. Please try again.');
        // toast.error('Login failed. Please try again.');
      }
    // }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="relative w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="relative z-10">
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Welcome back to Bulkify!</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              {emailError && <p className="mt-1 text-xs text-red-500">{emailError}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {passwordError && <p className="mt-1 text-xs text-red-500">{passwordError}</p>}
            </div>

            {loginError && (
              <div className="mb-4">
                <p className="text-sm text-red-500 text-center">{loginError}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105"
            >
              Login
            </button>
            
            <div className="mt-6 text-center">
              <span className="text-gray-600">Create new account - </span>
              <Link to="/Registration" className="text-blue-500 hover:underline hover:text-blue-600 transition duration-300">
                Sign-Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;