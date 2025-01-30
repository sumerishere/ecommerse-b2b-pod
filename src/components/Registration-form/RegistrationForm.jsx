import React, { useState } from 'react';
import { ChevronRight, Check } from 'lucide-react';

const RegistrationForm = () => {
  // State for form data
  const [formData, setFormData] = useState({
    // Basic Information
    firstName: '',
    email: '',
    position: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    zip: '',
    phone: '',
    countryCode: '+91',
    
    // Professional Details
    shopActNumber: '',
    industry: '',
    website: '',
  });

  // State for current step
  const [currentStep, setCurrentStep] = useState(1);
  
  // State for user type
  const [userType, setUserType] = useState('candidate');

  // Define steps for the breadcrumb
  const steps = [
    {
      id: 1,
      title: 'Basic Details',
      isCompleted: currentStep > 1,
      isActive: currentStep === 1,
    },
    {
      id: 2,
      title: 'Professional details',
      isCompleted: currentStep > 2,
      isActive: currentStep === 2,
    },
    {
      id: 3,
      title: 'OTP Verification',
      isCompleted: currentStep > 3,
      isActive: currentStep === 3,
    },
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
      } else if (currentStep === 2) {
        // Professional Details API call would go here
        // await fetch('your-api/professional-details', {...})
        setCurrentStep(3);
      } else if (currentStep === 3) {
        // Final submission
        // await fetch('your-api/complete-registration', {...})
        // Handle successful registration
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header with progress indicator */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="flex items-center gap-2">
          <span>Account verification</span>
          <span className="text-indigo-600 text-sm">In progress</span>
        </div>
      </div>

      {/* User type selector */}
      <div className="flex justify-end gap-4 mb-8">
        <button
          onClick={() => setUserType('candidate')}
          className={`px-6 py-2 rounded-md ${
            userType === 'candidate' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Candidate
        </button>
        <button
          onClick={() => setUserType('director')}
          className={`px-6 py-2 rounded-md ${
            userType === 'director' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Director
        </button>
      </div>

      {/* Updated Steps sidebar with exact styling */}
      <div className="flex gap-8">
        <div className="w-48 relative">
          {/* Vertical line */}
          <div className="absolute left-3 top-4 bottom-4 w-[2px] bg-gray-200"></div>
          
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              <div className={`flex items-start gap-3 mb-4 ${
                step.isActive ? 'text-indigo-600' : 'text-gray-500'
              }`}>
                {/* Step indicator */}
                <div className="relative z-10">
                  {step.isCompleted ? (
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className={`w-6 h-6 rounded-full ${
                      step.isActive ? 'bg-indigo-600' : 'bg-gray-200'
                    } flex items-center justify-center text-white text-sm`}>
                      {step.id}
                    </div>
                  )}
                </div>
                
                {/* Step content */}
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{step.title}</span>
                  {step.subTitle && (
                    <span className={`text-sm ${
                      step.isActive ? 'text-indigo-600' : 'text-gray-400'
                    }`}>
                      {step.subTitle}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Form content */}
        <div className="flex-1">
          <form onSubmit={handleContinue}>
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First name"
                    className="mt-1 w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Professional Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your email"
                    className="mt-1 w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Position</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    placeholder="Position"
                    className="mt-1 w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    placeholder="Address line 1"
                    className="mt-1 w-full p-2 border rounded-md"
                  />
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    placeholder="Address line 2"
                    className="mt-2 w-full p-2 border rounded-md"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      placeholder="Zip"
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <div className="flex gap-2">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      className="w-24 p-2 border rounded-md"
                    >
                      <option value="+91">+91</option>
                      {/* Add more country codes as needed */}
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="8974947492"
                      className="flex-1 p-2 border rounded-md"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Shop Act/DIN Number</label>
                  <input
                    type="text"
                    name="shopActNumber"
                    value={formData.shopActNumber}
                    onChange={handleInputChange}
                    placeholder="Number"
                    className="mt-1 w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Industry</label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="mt-1 w-full p-2 border rounded-md"
                  >
                    <option value="">Please select your industry...</option>
                    {/* Add industry options */}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Organization website</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="www.example.com"
                    className="mt-1 w-full p-2 border rounded-md"
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                {/* Add OTP verification UI here */}
              </div>
            )}

            <button
              type="submit"
              className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 flex items-center justify-center gap-2"
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;