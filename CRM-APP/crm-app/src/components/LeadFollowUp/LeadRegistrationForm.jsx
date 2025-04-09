import { useState } from "react";
import "./LeadRegistrationForm.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";

const LeadRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    email: "",
    CourseType: "", // Ensure correct field name
    source: "",
    referName: "",
    qualification: "", // New field for Qualification
    category: "",
    followUpDate: "",
    assignTo: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    mobile: "",
    address: "",
    email: "",
  });

  const [loading, setLoading] = useState(false); // State to control loading spinner

  const validate = (field, value) => {
    let isValid = true;
    let errorMessage = "";

    switch (field) {
      case "name": {
        const namePattern = /^[a-zA-Z][a-zA-Z\s]*$/;
        if (!namePattern.test(value)) {
          errorMessage =
            "Name should not start with a digit and should only contain letters and spaces.";
          isValid = false;
        }
        break;
      }

      case "mobile": {
        const mobilePattern = /^[0-9]+$/;
        if (!mobilePattern.test(value)) {
          errorMessage = "Mobile number must be digits only.";
          isValid = false;
        }
        break;
      }

      case "address": {
        if (value.trim() === "") {
          errorMessage = "Address is required.";
          isValid = false;
        }
        break;
      }

      case "email": {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          errorMessage = "Invalid email format.";
          isValid = false;
        }
        break;
      }

      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMessage,
    }));

    return isValid;
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
  
    switch (id) {
      case "lead-name":
        setFormData((prev) => ({ ...prev, name: value }));
        break;
      case "lead-mobile":
        setFormData((prev) => ({ ...prev, mobile: value }));
        break;
      case "lead-address":
        setFormData((prev) => ({ ...prev, address: value }));
        break;
      case "lead-email":
        setFormData((prev) => ({ ...prev, email: value }));
        break;
      case "lead-course-type":
        setFormData((prev) => ({ ...prev, CourseType: value }));
        break;
      case "lead-source":
        setFormData((prev) => ({ ...prev, source: value }));
        break;
      case "lead-referName":
        setFormData((prev) => ({ ...prev, referName: value }));
        break;
      case "lead-qualification":
        setFormData((prev) => ({ ...prev, qualification: value }));
        break;
      case "lead-category-drop":
        setFormData((prev) => ({ ...prev, category: value }));
        break;
      case "lead-followUpDate":
        setFormData((prev) => ({ ...prev, followUpDate: value }));
        break;
      case "lead-assignTo":  // Fix for the 'Assign To' field
        setFormData((prev) => ({ ...prev, assignTo: value }));
        break;
      default:
        break;
    }
  
    // Validate the input field
    validate(id.split("-")[1], value);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formIsValid = true;

    Object.keys(formData).forEach((key) => {
      if (!validate(key, formData[key])) {
        formIsValid = false;
      }
    });

    if (formIsValid) {
      setLoading(true); // Show the spinner

      try {
        const response = await fetch("http://localhost:8080/save-lead", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            mobileNumber: formData.mobile,
            address: formData.address,
            courseType: formData.CourseType, // Ensure correct field name
            source: formData.source,
            referName: formData.referName,
            qualification: formData.qualification, // Sending the qualification
            category: formData.category,
            followUpDate: formData.followUpDate,
            assignTo: formData.assignTo,
          }),
        });

        if (response.ok) {
          toast.success("Lead Added successfully!!");
          setFormData({
            name: "",
            mobile: "",
            address: "",
            email: "",
            CourseType: "", // Reset the field correctly
            source: "",
            referName: "",
            qualification: "", // Reset qualification field
            category: "",
            followUpDate: "",
            assignTo: "",
          });
        } else {
          const errorText = await response.text();
          toast.error("Failed to submit the form.", errorText);
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      } finally {
        setLoading(false); // Hide the spinner
      }
    }
  };

  // Get the current date and time in the format required by the datetime-local input
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 relative">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <ClipLoader color="#ffffff" loading={loading} size={100} />
        </div>
      )}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <ToastContainer />
        <h2 className="text-2xl font-bold text-center mb-6">Lead Registration</h2>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row md:gap-6">
            {/* Left Column */}
            <div className="w-full md:w-1/2 space-y-4">
              <div className="mb-4">
                <label htmlFor="lead-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name:
                </label>
                <input
                  id="lead-name"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && (
                  <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                )}
              </div>
  
              <div className="mb-4">
                <label htmlFor="lead-mobile" className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number:
                </label>
                <input
                  id="lead-mobile"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
                {errors.mobile && (
                  <div className="text-red-500 text-sm mt-1">{errors.mobile}</div>
                )}
              </div>
  
              <div className="mb-4">
                <label htmlFor="lead-address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address:
                </label>
                <input
                  id="lead-address"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                {errors.address && (
                  <div className="text-red-500 text-sm mt-1">{errors.address}</div>
                )}
              </div>
  
              <div className="mb-4">
                <label htmlFor="lead-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email:
                </label>
                <input
                  id="lead-email"
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && (
                  <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                )}
              </div>
  
              <div className="mb-4">
                <label htmlFor="lead-course-type" className="block text-sm font-medium text-gray-700 mb-1">
                  Course Type:
                </label>
                <select
                  id="lead-course-type"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                  value={formData.CourseType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a course type</option>
                  <option value="Java fullStack development">Java fullStack development</option>
                  <option value="Automation Testing">Automation Testing</option>
                  <option value="UI/UX">UI/UX</option>
                  <option value="MERN Stack">MERN Stack</option>
                  <option value="REST Api">REST Api</option>
                </select>
              </div>
            </div>
  
            {/* Right Column */}
            <div className="w-full md:w-1/2 space-y-4">
              <div className="mb-4">
                <label htmlFor="lead-source" className="block text-sm font-medium text-gray-700 mb-1">
                  Source:
                </label>
                <select
                  id="lead-source"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                  value={formData.source}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a source</option>
                  <option value="Website">Website</option>
                  <option value="Referral">Referral</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Direct">Direct</option>
                </select>
              </div>
  
              <div className="mb-4">
                <label htmlFor="lead-referName" className="block text-sm font-medium text-gray-700 mb-1">
                  Refer Name:
                </label>
                <input
                  id="lead-referName"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter the refer name if available"
                  value={formData.referName}
                  onChange={handleChange}
                />
              </div>
  
              <div className="mb-4">
                <label htmlFor="lead-qualification" className="block text-sm font-medium text-gray-700 mb-1">
                  Qualification:
                </label>
                <input
                  id="lead-qualification"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  required
                />
              </div>
  
              <div className="mb-4">
                <label htmlFor="lead-category" className="block text-sm font-medium text-gray-700 mb-1">
                  Lead category:
                </label>
                <select
                  id="lead-category-drop"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select lead category</option>
                  <option value="hot">Hot</option>
                  <option value="warm">Warm</option>
                  <option value="cold">Cold</option>
                </select>
              </div>
  
              <div className="mb-4">
                <label htmlFor="lead-followUpDate" className="block text-sm font-medium text-gray-700 mb-1">
                  FollowUp-Date:
                </label>
                <input
                  id="lead-followUpDate"
                  type="datetime-local"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.followUpDate}
                  onChange={handleChange}
                  min={getCurrentDateTime()}
                />
              </div>
  
              <div className="mb-4">
                <label htmlFor="lead-assignTo" className="block text-sm font-medium text-gray-700 mb-1">
                  Assign-To:
                </label>
                <input
                  id="lead-assignTo"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Name"
                  value={formData.assignTo}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
  
          <div className="mt-8 flex justify-center">
            <button 
              type="submit" 
              className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-8 rounded-md transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadRegistrationForm;
