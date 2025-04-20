import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const SignUpComp = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  // --- State variables remain the same ---
  const [formData, setFormData] = useState({
    fullName: "", address: "", mobileNumber: "", email: "",
    organizationName: "", userName: "", password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    fullName: "", address: "", mobileNumber: "", email: "",
    organizationName: "", userName: "", password: "",
  });
  const [logoFile, setLogoFile] = useState(null);

  // --- Validation constants and functions remain the same ---
    const NAME_isVALID = /^[a-zA-Z][a-zA-Z\s'-]*$/;
    const ADDRESS_isVALID = /^(?=.*\S)[A-Za-z0-9\s'#,.\-/()]+$/;
    const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const USERNAME_PATTERN = /^[a-zA-Z0-9_]{3,20}$/;

  const validate = (field, value) => {
        let errorMessage = "";
        const trimmedValue = typeof value === 'string' ? value.trim() : value;

        switch (field) {
          case "fullName":
            if (!trimmedValue) errorMessage = "Full Name is required";
            else if (!NAME_isVALID.test(trimmedValue)) errorMessage = "Please enter a valid name (letters, spaces, hyphens, apostrophes)";
            break;
          case "address":
            if (!trimmedValue) errorMessage = "Address is required";
            else if (!ADDRESS_isVALID.test(trimmedValue)) errorMessage = "Please enter a valid address";
            break;
          case "email":
            if (!trimmedValue) errorMessage = "Email is required";
            else if (!EMAIL_PATTERN.test(trimmedValue)) errorMessage = "Please enter a valid email format";
            break;
          case "organizationName":
             if (!trimmedValue) errorMessage = "Organization Name is required";
             else if (!NAME_isVALID.test(trimmedValue)) errorMessage = "Please enter a valid organization name";
             break;
          case "userName":
            if (!trimmedValue) errorMessage = "Username is required";
            else if (!USERNAME_PATTERN.test(trimmedValue)) errorMessage = "Username must be 3-20 characters (letters, numbers, underscore)";
            break;
          case "password":
            if (!trimmedValue) errorMessage = "Password is required";
            else if (trimmedValue.length < 6) errorMessage = "Password must be at least 6 characters long";
            break;
          default: break;
        }
        setErrors((prevErrors) => ({ ...prevErrors, [field]: errorMessage }));
        return !errorMessage;
  };

  // --- Handlers remain the same (handleChange, handleSubmit, goToLoginPage, handleMobileChange) ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'mobileNumber') { handleMobileChange(e); return; }
        setFormData((prev) => ({ ...prev, [name]: value }));
        validate(name, value);
    };

    const handleMobileChange = (e) => {
        const { name, value } = e.target;
        const numericValue = value.replace(/\D/g, "").slice(0, 10);
        setFormData((prevState) => ({ ...prevState, [name]: numericValue }));
        if (numericValue.length !== 10 && numericValue.length > 0) {
            setErrors((prev) => ({...prev, mobileNumber: 'Mobile number must be 10 digits'}));
        } else {
            setErrors((prev) => ({...prev, mobileNumber: ''}));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fieldsToValidate = ['fullName', 'address', 'mobileNumber', 'email', 'organizationName', 'userName', 'password'];
        let isFormValid = true;
        const currentErrors = {};

        fieldsToValidate.forEach(field => {
            if (field === 'mobileNumber') {
                if (!formData.mobileNumber || formData.mobileNumber.length !== 10) {
                     currentErrors[field] = "Mobile number must be exactly 10 digits"; isFormValid = false;
                } else { currentErrors[field] = ""; }
            } 
            else if (!validate(field, formData[field])) {
                isFormValid = false;
                currentErrors[field] = errors[field] || "This field is required";
            } else { currentErrors[field] = ""; }
        });

        setErrors(currentErrors);

        if (!isFormValid) { 
          toast.warn("Please fix the errors in the form.", 
            { position: "top-center" }); 
            return; 
        }

        const formDataToSend = new FormData();
        formDataToSend.append( "user", new Blob([JSON.stringify(formData)], { type: "application/json" }));
        if (logoFile) { formDataToSend.append("logo", logoFile); }

        try {

          const response = await fetch("http://localhost:8080/save-user-info", {
             method: "POST", body: formDataToSend 
            });

          const responseText = await response.text();

          if (!response.ok) { 
            toast.error(`Error: ${responseText || 'Unknown server error'}`, 
            { position: "top-center" }); 
            console.error("Server Error:", responseText); 
            return; 
          }

          if (responseText.toLowerCase().includes("success")) {
              toast.success("Sign up successful! Redirecting to login...", 
                { position: "top-center", autoClose: 2000 });

              setFormData({ 
                fullName: "", 
                address: "", 
                mobileNumber: "", 
                email: "", 
                organizationName:"", 
                userName: "", 
                password: "" 
              });

              setErrors({});
              setLogoFile(null);
              document.getElementById('logo-upload-id')?.form.reset();

              setTimeout(() => { 
                navigate('/'); }, 3000
              );

          } 
          else { toast.info(`Server response: ${responseText}`, { position: "top-center" }); }
        } 
        catch (error) { 
          toast.error(`Error submitting form: ${error.message}`,
          { position: "top-center" });
          console.error("Submission error:", error); 
        }
    };

    const goToLoginPage = () => { 
      navigate("/");
    };

  // --- Helper function for input classes remains the same ---
  const getInputClasses = (fieldName) => {
    const baseClasses = "w-full px-3 py-2 border rounded-md focus:outline-none focus:border-transparent focus:ring-2 transition duration-200 ease-in-out";
    const errorClasses = "border-red-500 focus:ring-red-500";
    const validClasses = "border-gray-300 focus:ring-purple-500";
    return `${baseClasses} ${errors[fieldName] ? errorClasses : validClasses}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50 p-4">
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Main Card Container: Flex Column on small, Flex Row on Large */}
      <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-lg w-full max-w-md lg:max-w-5xl overflow-hidden">

        {/* Left Column: Image */}
        {/* Added aspect-video lg:aspect-auto for better control */}
        <div className="w-full lg:w-1/2 bg-purple-100 p-6 flex items-center justify-center aspect-video lg:aspect-auto">
          <img
            className="w-full h-full max-h-[400px] lg:max-h-full object-contain" // Max height added, object-contain
            src="/images/signup-png.png" // Ensure this path is correct
            alt="Sign Up Illustration"
          />
        </div>

        {/* Right Column: Form */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10 overflow-y-auto"> {/* Allow vertical scroll if needed */}
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
                Sign Up
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* --- Form Fields Remain the Same --- */}

                {/* Full Name */}
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name:</label>
                    <input id="fullName" name="fullName" className={getInputClasses('fullName')} type="text" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} aria-invalid={!!errors.fullName} aria-describedby="fullName-error" required />
                    {errors.fullName && <span id="fullName-error" className="block text-xs text-red-600 mt-1">{errors.fullName}</span>}
                </div>

                {/* Address */}
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address:</label>
                    <input id="address" name="address" className={getInputClasses('address')} type="text" placeholder="Enter your address" value={formData.address} onChange={handleChange} aria-invalid={!!errors.address} aria-describedby="address-error" required />
                    {errors.address && <span id="address-error" className="block text-xs text-red-600 mt-1">{errors.address}</span>}
                </div>

                {/* Mobile Number */}
                <div>
                    <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number:</label>
                    <input id="mobileNumber" name="mobileNumber" className={getInputClasses('mobileNumber')} type="tel" value={formData.mobileNumber} onChange={handleMobileChange} maxLength="10" pattern="[0-9]{10}" placeholder="Enter 10-digit mobile number" aria-invalid={!!errors.mobileNumber} aria-describedby="mobileNumber-error" required />
                     {errors.mobileNumber && <span id="mobileNumber-error" className="block text-xs text-red-600 mt-1">{errors.mobileNumber}</span>}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
                    <input id="email" name="email" className={getInputClasses('email')} type="email" placeholder="Enter your Email" value={formData.email} onChange={handleChange} aria-invalid={!!errors.email} aria-describedby="email-error" required />
                    {errors.email && <span id="email-error" className="block text-xs text-red-600 mt-1">{errors.email}</span>}
                </div>

                {/* Organization Name */}
                <div>
                    <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-1">Organization Name:</label>
                    <input id="organizationName" name="organizationName" className={getInputClasses('organizationName')} type="text" placeholder="Enter Organization Name" value={formData.organizationName} onChange={handleChange} aria-invalid={!!errors.organizationName} aria-describedby="organizationName-error" required />
                    {errors.organizationName && <span id="organizationName-error" className="block text-xs text-red-600 mt-1">{errors.organizationName}</span>}
                </div>

                {/* Create Username */}
                <div>
                    <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">Create Username:</label>
                    <input id="userName" name="userName" className={getInputClasses('userName')} type="text" placeholder="Choose a username (e.g., john_doe)" value={formData.userName} onChange={handleChange} aria-invalid={!!errors.userName} aria-describedby="userName-error" required />
                     {errors.userName && <span id="userName-error" className="block text-xs text-red-600 mt-1">{errors.userName}</span>}
                </div>

                {/* Create Password */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Create Password:</label>
                    <input id="password" name="password" className={getInputClasses('password')} type={showPassword ? "text" : "password"} placeholder="Enter new password (min 6 characters)" value={formData.password} onChange={handleChange} aria-invalid={!!errors.password} aria-describedby="password-error" required />
                     {errors.password && <span id="password-error" className="block text-xs text-red-600 mt-1">{errors.password}</span>}
                     <div className="flex items-center mt-2">
                        <input id="pass-check-box" type="checkbox" className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                        <label htmlFor="pass-check-box" className="ml-2 block text-sm text-gray-700 cursor-pointer">Show Password</label>
                     </div>
                </div>

                {/* Upload Logo */}
                <div>
                    <label htmlFor="logo-upload-id" className="block text-sm font-medium text-gray-700 mb-1">Upload Logo (Optional):</label>
                    <input id="logo-upload-id" type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files[0])} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"/>
                    {logoFile && <p className="text-xs text-gray-600 mt-1">Selected: {logoFile.name}</p>}
                </div>

                {/* Submit Button */}
                <button id="SignUp-submit-btn" type="submit" className="w-full mt-6 py-2.5 px-4 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200 ease-in-out">
                    Sign Up
                </button>

                {/* Go to Login Link/Button */}
                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{' '}
                    <button type="button" onClick={goToLoginPage} className="font-medium text-purple-500 hover:text-purple-700 underline bg-transparent border-none p-0 cursor-pointer">
                        Go to Login
                    </button>
                </p>
            </form>
        </div>

      </div> 
    </div> 
  );
};

SignUpComp.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default SignUpComp;