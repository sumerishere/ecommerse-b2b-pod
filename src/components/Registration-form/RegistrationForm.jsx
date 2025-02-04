import React, { useState } from "react";
import { ChevronRight, Check, ArrowLeft } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    // 1.Basic Information
    firstName: "",
    email: "",
    position: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    zip: "",
    phone: "",
    countryCode: "+91",

    // 2.Professional Details
    shopActNumber: "",
    industry: "",
    organizationWebsite: "",

    // 3.bank details(optional)
    currency: "",
    bankName: "",
    bankAccNumber: "",
    bankIFSC: "",

    // 4.OTP verification
    adharOTP: "",
    digiLockerID: "",
  });

  // State for current step
  const [currentStep, setCurrentStep] = useState(1);

  // State for user type
  const [userType, setUserType] = useState("director");

  // Define steps for the breadcrumb
  const steps = [
    {
      id: 1,
      title: "Basic Details",
      isCompleted: currentStep > 1,
      isActive: currentStep === 1,
    },
    {
      id: 2,
      title: "Professional details",
      isCompleted: currentStep > 2,
      isActive: currentStep === 2,
    },
    {
      id: 3,
      title: "Bank Details(Optional)",
      isCompleted: currentStep > 3,
      isActive: currentStep === 3,
    },
    {
      id: 4,
      title: "OTP Verification",
      isCompleted: currentStep > 4,
      isActive: currentStep === 4,
    },
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  

  // Handle form submission for each step
  const handleContinue = async (e) => {
    e.preventDefault();

    try {
      if (currentStep === 1) {
        // Basic Details API call would go here
        // await fetch('your-api/basic-details', {...})
        setCurrentStep(2);
        toast.success("Basic details done successful!");
      } else if (currentStep === 2) {
        // Professional Details API call would go here
        // await fetch('your-api/professional-details', {...})
        setCurrentStep(3);
        toast.success("Professional details done successful!");
      } else if (currentStep === 3) {
        // Final submission
        // await fetch('your-api/complete-registration', {...})
        setCurrentStep(4);
        toast.success("Bank details done successful!");
      } else if (currentStep === 4) {
        // await fetch('your-api/complete-registration', {...})
        // Handle successful registration
        // setCurrentStep(5);
        // alert("submit successfully")
        toast.success("Registration done successfully!");
      }
    } catch (error) {
      toast.err("Error submitting form:!");
      console.error("Error submitting form:", error);
    }
    console.log("form", formData);
  };

  const handleStep = () => {
    if(currentStep > 1){
      setCurrentStep(currentStep-1);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <ToastContainer />
      {/* Header with progress indicator */}
      <div className="flex gap-4 bg-gray-100 p-2 rounded-2xl mb-6 border">
        <div className="cursor-pointer" >
          <button className="mt-1 h-[20px]" onClick={handleStep}><ArrowLeft /></button>
        </div>
        <div className="flex items-center gap-2">
          <span className="">Account verification</span>
          <div className="bg-indigo-200 rounded-2xl"><span className="text-indigo-700 text-sm px-2">In-progress</span></div>
        </div>
      </div>

      {/* User type selector */}
      <div className="flex justify-end gap-4 mb-8">
        <button
          onClick={() => setUserType("candidate")}
          className={`px-6 py-1 rounded-md ${
            userType === "candidate"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Candidate
        </button>
        <button
          onClick={() => setUserType("director")}
          className={`px-6 py-1 rounded-md ${
            userType === "director"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Director
        </button>
      </div>

      {/* Updated Steps sidebar with exact styling */}
      <div className="flex gap-8">
        <div className="w-48 relative">
          {/* This is the modified section */}
          <div className="">
            {/* Container for the vertical line of IDs */}
            <div className="relative">
              {/* Background strip for IDs */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gray-200 rounded-2xl "></div>

              {/* Vertical connecting line */}
              {/* <div className="absolute left-[14px] top-4 bottom-4 w-[2px] bg-gray-400"></div> */}

              {steps.map((step, index) => (
                <div key={step.id} className="relative ">
                  <div
                    className={`flex items-start gap-3 mb-4 ${
                      step.isActive ? "text-indigo-600" : "text-gray-500"
                    }`}
                  >
                    {/* Step indicator - positioned over the background strip */}
                    <div className="relative z-10 w-8 p-1">
                      {step.isCompleted ? (
                        <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center mx-auto">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <div
                          className={`w-6 h-6 rounded-full ${
                            step.isActive
                              ? "bg-indigo-600"
                              : "bg-white text-black"
                          } flex items-center justify-center text-white text-sm mx-auto`}
                        >
                          {step.id}
                        </div>
                      )}
                    </div>

                    {/* Step content */}
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{step.title}</span>
                      {step.subTitle && (
                        <span
                          className={`text-sm ${
                            step.isActive ? "text-indigo-600" : "text-gray-400"
                          }`}
                        >
                          {step.subTitle}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form content */}
        <div className="flex-1">
          <form onSubmit={handleContinue}>
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    // required
                    placeholder="First name"
                    className="mt-1 w-full p-1 border outline-none focus:ring-1 focus:ring-indigo-400 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Professional Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    // required
                    placeholder="Your email"
                    className="mt-1 w-full p-1 border outline-none focus:ring-1 focus:ring-indigo-400 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Position
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    // required
                    placeholder="Position"
                    className="mt-1 w-full p-1 border outline-none focus:ring-1 focus:ring-indigo-400 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    // required
                    placeholder="Address line 1"
                    className="mt-1 w-full p-1 border outline-none focus:ring-1 focus:ring-indigo-400 rounded-md"
                  />
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    placeholder="Address line 2"
                    className="mt-2 w-full p-1 border outline-none focus:ring-1 focus:ring-indigo-400 rounded-md"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      // required
                      placeholder="City"
                      className="w-full p-1 border outline-none focus:ring-1 focus:ring-indigo-400 rounded-md"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      // required
                      placeholder="Zip"
                      className="w-full p-1 border outline-none focus:ring-1 focus:ring-indigo-400 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <div className="flex gap-2">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      className="w-24 p-1 border outline-none focus:ring-1 focus:ring-indigo-400 rounded-md"
                    >
                      <option value="+91">+91</option>
                      {/* Add more country codes as needed */}
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      // required
                      placeholder="8974947492"
                      className="flex-1 p-1 border outline-none focus:ring-1 focus:ring-indigo-400 rounded-md"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Shop Act/DIN Number
                  </label>
                  <input
                    type="text"
                    name="shopActNumber"
                    value={formData.shopActNumber}
                    onChange={handleInputChange}
                    // required
                    placeholder="Number"
                    className="mt-1 w-full p-1 border outline-none focus:ring-1 focus:ring-indigo-400 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Industry
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    // required
                    onChange={handleInputChange}
                    className="mt-1 w-full p-1 border outline-none focus:ring-1 focus:ring-indigo-400 rounded-md"
                  >
                    <option value="">Please select your industry...</option>
                    <option value="IT Industry">IT Industry</option>
                    <option value="Mechanical Industry">
                      Mechanical Industry
                    </option>
                    <option value="Chemical Industry">Chemical Industry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Organization website
                  </label>
                  <input
                    type="url"
                    name="organizationWebsite"
                    value={formData.organizationWebsite}
                    onChange={handleInputChange}
                    // required
                    placeholder="www.example.com"
                    className="mt-1 w-full p-1 border outline-none focus:ring-1 focus:ring-indigo-400 rounded-md"
                  />
                </div>
              </div>
            )}

            {/* bank details */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Currency
                  </label>
                  <select
                    name="currency"
                    value={formData.value}
                    onChange={handleInputChange}
                    // required
                    className="mt-1 w-full p-1 border outline-none focus:ring-1 focus:ring-indigo-400 rounded-md"
                  >
                    <option value="">Please select your currency...</option>
                    <option value="IT Industry">IND</option>
                    <option value="Mechanical Industry">USD</option>
                    <option value="Chemical Industry">EUR</option>
                    {/* Add industry options */}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Bank Name
                  </label>
                  <select
                    name="bankName"
                    value={formData.value}
                    // required
                    onChange={handleInputChange}
                    className="mt-1 w-full p-1 border outline-none focus:ring-1 focus:ring-indigo-400 rounded-md"
                  >
                    <option value="">Please select your bank...</option>
                    <option value="HDFC">HDFC</option>
                    <option value="SBI">SBI</option>
                    <option value="HSBC">HSBC</option>
                    {/* Add industry options */}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Bank Account Number
                  </label>
                  <input
                    type="text"
                    name="bankAccNumber"
                    value={formData.bankAccNumber}
                    // required
                    onChange={handleInputChange}
                    placeholder="Enter account number"
                    className="mt-1 w-full p-1 border outline-none focus:ring-1 focus:ring-indigo-400 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Bank IFSC code
                  </label>
                  <input
                    type="text"
                    name="bankIFSC"
                    value={formData.bankIFSC}
                    // required
                    onChange={handleInputChange}
                    placeholder="Enter your IFSC number"
                    className="mt-1 w-full p-1 border outline-none focus:ring-1 focus:ring-indigo-400 rounded-md"
                  />
                </div>
              </div>
            )}

            {/* final otp step */}
            {currentStep === 4 && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Keep your account secure
                </label>
                <input
                  type="text"
                  name="adharOTP"
                  value={formData.adharOTP}
                  onChange={handleInputChange}
                  // required
                  placeholder="Enter your otp number"
                  className="mt-1 w-full p-1 border outline-none focus:ring-1 focus:ring-indigo-400 rounded-md"
                />

                {/* <label className="block text-sm font-medium text-gray-700">Bank IFSC code</label> */}
                <input
                  type="text"
                  name="digiLockerID"
                  value={formData.digiLockerID}
                  onChange={handleInputChange}
                  // required
                  placeholder="Enter DigiLocker ID"
                  className="mt-2 w-full p-1 border outline-none focus:ring-1 focus:ring-indigo-400 rounded-md"
                />
              </div>
            )}

            <button
              type="submit"
              className="mt-6 w-full bg-indigo-600 text-white py-1 px-4 rounded-md hover:bg-indigo-700 flex items-center justify-center gap-2"
            >
              {currentStep === 4 ? "Final submit" : "continue"}
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
