// import "./TemplateCustom.css";
import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TemplateCustom = ({ username, organizationName }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  //---- default fields of template form ------//
  const [fields, setFields] = useState([
    {
      id: 1,
      type: "Text(String)",
      label: "Full Name",
      placeholder: "Enter your full name",
    },
    {
      id: 2,
      type: "Text(String)",
      label: "Address",
      placeholder: "Enter your address",
    },

    {
      id: 3,
      type: "Number(int)",
      label: "Mobile Number",
      placeholder: "Enter your mobile number",
    },
    { id: 4, type: "Date", label: "date", placeholder: "Select date" },
  ]);

  //---------- dropdown options -----------//
  const fieldTypes = [
    { id: 1, value: "", label: "Select Option", icon: "" },
    { id: 2, value: "Text(String)", label: "text", icon: "📝" },
    { id: 3, value: "Number(int)", label: "Number", icon: "🔢" },
    { id: 4, value: "file", label: "File Upload", icon: "📎" },
    { id: 5, value: "Date", label: "Date", icon: "📅" },
    { id: 6, value: "Yes/No check(checkbox)", label: "Yes/No (Checkbox)", icon: "☑️" },
    { id: 7, value: "Yes/No button(Radio)", label: "Yes/No (Radio Button)", icon: "⭕" },
    { id: 8, value: "Image", label:"Image/Photo", icon:"🖼️"},
    { id: 9, value: "select(dropdown)", label: "Dropdown", icon: "▼" },
  ];

  const addField = () => {
    const newField = {
      id: fields.length + 1,
      type: "Text(String)",
      // label: `${fields.length + 1}. Enter field name here`,
      placeholder: "Enter value",
      options: [],
    };
    setFields([...fields, newField]);
  };

  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  // method to handle form submission to backend
  const submitFormToBackend = async () => {
    try {
      // Prepare payload according to backend requirements
      const payload = {
        formName: organizationName,
        createdAt: new Date().toISOString(),
        userName: username, // This can be dynamically set later
        fields: {},
        dropdowns: [],
      };

      // Convert fields to backend expected format
      fields.forEach((field) => {
        // Directly use the field type from dropdown
        payload.fields[field.label] = field.type;

        // If field is a dropdown, add to dropdowns array
        if (field.type === "select(dropdown)" && field.options) {
          payload.dropdowns.push({
            dropdownName: field.label,
            options: field.options,
          });
        }
      });

      // Perform axios POST request
      const response = await axios.post(
        "http://localhost:8080/create-template",
        payload
      );

      // Log the entire response for debugging
      console.log("Full Server Response:", response);

      // Check if response has data and log it
      if (response.data) {
        console.log("Response Data:", response.data);

        const responseMessage =
          response.data.message || "Template created successfully";

        // Show success toast with additional info
        toast.success(`${responseMessage} `, {
          position: "top-right",
          autoClose: 3000,
          // hideProgressBar: false,
          // closeOnClick: true,
          // pauseOnHover: true,
          // draggable: true,
        });
      }
      else{

        const errorMessage = await response.data.text();
        console.log("error got during template submission",errorMessage)

        toast.error(`${errorMessage} `, {
          position: "top-right",
          autoClose: 3000,
        });
      }

      // Reset alert and preview states
      setShowAlert(false);
      setShowPreview(false);
    } catch (error) {
      // Comprehensive error logging
      console.error("Submission Error Details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
      });

      // Show detailed error toast
      const errorMessage =
        error.response?.data ||
        error.message ||
        "Form submission failed. Please try again.";

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });

      console.error("Submission error:", error);
    }
  };

  const handleSubmit = (e) => {
    setShowAlert(true);
    e.preventDefault();
  };

  const handleTypeChange = (id, newType) => {
    setFields(
      fields.map((field) =>
        field.id === id
          ? {
              ...field,
              type: newType,
              options: newType === "select(dropdown)" ? [] : undefined,
            }
          : field
      )
    );
  };

  const handleLabelChange = (id, newLabel) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, label: newLabel } : field
      )
    );
  };

  const addDropdownOption = (id, optionValue) => {
    setFields(
      fields.map((field) =>
        field.id === id && field.type === "select(dropdown)"
          ? { ...field, options: [...(field.options || []), optionValue] }
          : field
      )
    );
  };

  const handleOptionChange = (id, optionIndex, newValue) => {
    setFields(
      fields.map((field) =>
        field.id === id && field.type === "select(dropdown)"
          ? {
              ...field,
              options: field.options.map((opt, index) =>
                index === optionIndex ? newValue : opt
              ),
            }
          : field
      )
    );
  };

  const removeDropdownOption = (id, optionIndex) => {
    setFields(
      fields.map((field) =>
        field.id === id && field.type === "select(dropdown)"
          ? {
              ...field,
              options: field.options.filter(
                (_, index) => index !== optionIndex
              ),
            }
          : field
      )
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        {fields.map((field) => (
          <div key={field.id} className="mb-6 border border-gray-200 rounded-md p-4">
            <div className="flex justify-between items-center mb-2">
              <input
                type="text"
                value={field.label}
                required
                placeholder="Enter field name here"
                onChange={(e) => handleLabelChange(field.id, e.target.value)}
                className="w-full mr-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                readOnly={field.id < 5}
              />
              {field.id > 4 && (
                <button
                  type="button"
                  onClick={() => removeField(field.id)}
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full"
                >
                  ✕
                </button>
              )}
            </div>
  
            <div className="mt-2">
              <div className="mb-2">
                <select
                  value={field.type}
                  onChange={(e) => handleTypeChange(field.id, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={field.id < 5}
                >
                  {fieldTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.icon} {type.label}
                    </option>
                  ))}
                </select>
              </div>
  
              {field.type === "select(dropdown)" && (
                <div className="mt-2 pl-2 border-l-2 border-purple-200">
                  {field.options?.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center mb-2"
                    >
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(field.id, index, e.target.value)
                        }
                        placeholder={`Option ${index + 1}`}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeDropdownOption(field.id, index)}
                        className="ml-2 text-gray-500 hover:text-gray-700 p-1 rounded-full"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addDropdownOption(field.id, "")}
                    className="mt-1 flex items-center text-purple-500 hover:text-purple-700 font-medium"
                  >
                    <span className="mr-1">+</span> Add Option
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
  
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={addField}
            className="px-4 py-2 border border-purple-500 text-purple-500 rounded-md hover:bg-purple-50 font-medium text-base flex items-center"
          >
            <span className="mr-1">+</span> Add Field
          </button>
  
          <button
            type="submit"
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 font-medium text-base"
          >
            Submit Form
          </button>
        </div>
      </form>
  
      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
            <div>
              <p className="text-gray-600 font-medium">Note: "once you submit, It will be consider as permanent template form."</p>
            </div>
            <h3 className="text-xl font-bold text-center my-4">Confirm Submission</h3>
            <div className="flex flex-col space-y-2 mt-4">
              <button
                onClick={() => setShowPreview(true)}
                className="px-4 py-2 border border-purple-500 text-purple-500 rounded-md hover:bg-purple-50"
              >
                Preview
              </button>
              <button
                onClick={submitFormToBackend}
                className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
              >
                Yes, Submit
              </button>
              <button
                onClick={() => setShowAlert(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
  
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-center mb-4">Form Preview</h3>
            <div className="max-h-96 overflow-y-auto">
              {fields.map((field) => (
                <div key={field.id} className="mb-4">
                  <label className="block text-gray-700 font-medium mb-1">{field.label}</label>
                  <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                    {field.placeholder || "Preview field value would go here"}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowPreview(false)}
              className="mt-4 w-full px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};
TemplateCustom.propTypes = {
  username: PropTypes.string.isRequired,
  organizationName: PropTypes.string.isRequired,
};

export default TemplateCustom;
