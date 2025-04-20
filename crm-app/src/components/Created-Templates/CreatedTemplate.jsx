import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./CreatedTemplate.css";

import PropTypes from "prop-types";

const TemplateCreated = ({ username }) => {
  const [templateData, setTemplateData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [formTemplateId, setFormTemplateId] = useState(null);

  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/get-template-username?userName=${username}`
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched data:", data);

          if (Array.isArray(data) && data.length > 0) {
            setTemplateData(data);
            console.log("templateData : ----> ", templateData);
            setFormTemplateId(data[0].id); // Assuming the ID is available as `id` in the response
          } else {
            setTemplateData([]);
          }
        } else {
          setTemplateData([]);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setTemplateData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplateData();
  }, [username]);

  const getDropdownOptions = (columnName) => {
    if (!templateData[0]?.dropdowns) return [];

    const dropdown = templateData[0].dropdowns.find(
      (d) => d.dropdownName === columnName
    );

    return dropdown?.options || [];
  };
  // const handleChange = (e) => {
  //   const { name, value, type, checked, files } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]:
  //       type === "checkbox"
  //         ? checked
  //         : type === "file"
  //         ? files[0]
  //         : value,
  //   }));
  // };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Special case for Yes/No checkboxes
    if (type === "checkbox" && (value === "Yes" || value === "No")) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked ? value : "", // Set to "Yes" or "No" if checked, or empty if unchecked
      }));
    } else {
      // Handle other input types as before
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object for all data
    const formDataObject = new FormData();

    // Add formTemplateId
    formDataObject.append("formTemplateId", formTemplateId);

    // Prepare the formData
    const jsonFormData = {};

    Object.keys(formData).forEach((key) => {
      if (formData[key] instanceof File) {
        // Append files directly to FormData
        formDataObject.append(key, formData[key]);
      } else {
        // Add non-file data to jsonFormData
        jsonFormData[key] = formData[key];
      }
    });

    // Add the JSON data as a stringified object
    formDataObject.append(
      "formDataRequest",
      JSON.stringify({
        formTemplateId: formTemplateId,
        formData: jsonFormData,
      })
    );

    try {
      // Send form data using fetch API
      const response = await fetch("http://localhost:8080/submit-form-data", {
        method: "POST",
        body: formDataObject, // Send formDataObject directly
        // Don't set Content-Type header, let the browser set it with the boundary
      });

      if (response.ok) {
        toast.success("Form submitted successfully!", {
          position: "top-center",
        });
        console.log("Form submitted successfully.");
      } else {
        const errorText = await response.text();
        toast.error(`Error submitting form: ${errorText}`, {
          position: "top-center",
        });
        console.error("Error submitting form:", errorText);
      }
    } catch (error) {
      toast.error("Submission error: " + error.message, {
        position: "top-center",
      });
      console.error("Submission error:", error);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        <div className="flex flex-col items-center">
          {/* Spinner */}
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          {/* Loading text */}
          <p className="mt-4 text-lg font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (templateData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]: p-8  rounded-lg ">
        <img
          className="w-66 h-64 mb-6 rounded-lg shadow-sm"
          src="/images/data-8873303_1920.png"
          alt="Empty template"
        />
        <p className="text-2xl font-bold text-gray-700 mb-2">Template not found. 🥲</p>
        <p className="text-gray-600 text-center max-w-md italic border-l-4 border-purple-500 pl-4 py-2 bg-white">
          Note: First you will have to create your own template form, then you will be able to see your template form here.
        </p>
        
        <div className="mt-8 w-full max-w-sm">
          <div className="h-1 w-full bg-gradient-to-r from-purple-300 via-purple-500 to-purple-300 rounded-full"></div>
        </div>
      </div>
    );
  }

  const template = templateData[0];
  const fields = template?.fields || [];

  return (
    <div className="bg-purple-50 p-4 rounded-lg">
      <ToastContainer />
      <p id="createdTemplate-h1" className="text-2xl font-bold text-purple-500 mb-4"> Add Client</p>
  
      <div className="bg-white p-4 rounded shadow">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          {fields.map((field, index) => (
            <div key={index} className="mb-2">
              <label htmlFor={field.columnName} className="block text-gray-700 text-sm font-semibold mb-1">
                {field.dataType !== "Multiple Options(Dropdown)"
                  ? field.columnName
                  : ""}
              </label>
  
              {field.dataType === "Yes/No button(Radio)" ? (
                <div className="flex gap-4 mt-2">
                  <label id="label-radio-1" className="inline-flex items-center">
                    <input
                      id="radio-input-1"
                      className="w-4 h-4 text-purple-500 cursor-pointer"
                      type="radio"
                      name={field.columnName}
                      value="Yes"
                      onChange={handleChange}
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label id="label-radio-2" className="inline-flex items-center">
                    <input
                      id="radio-input-2"
                      className="w-4 h-4 text-purple-500 cursor-pointer"
                      type="radio"
                      name={field.columnName}
                      value="No"
                      onChange={handleChange}
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              ) : field.dataType === "Yes/No check(checkbox)" ? (
                <div className="flex gap-4 mt-2">
                  <label id="template-label-checkbox" className="inline-flex items-center">
                    <input
                      className="w-4 h-4 text-purple-500 cursor-pointer"
                      id="template-checkbox-input"
                      type="checkbox"
                      name={field.columnName}
                      value="Yes"
                      onChange={handleChange}
                      checked={formData[field.columnName] === "Yes"}
                    />
                    <span className="ml-2">Yes</span>
                  </label>
  
                  <label id="template-label-checkbox" className="inline-flex items-center">
                    <input
                      className="w-4 h-4 text-purple-500 cursor-pointer"
                      id="template-checkbox-input"
                      type="checkbox"
                      name={field.columnName}
                      value="No"
                      onChange={handleChange}
                      checked={formData[field.columnName] === "No"}
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              ) : field.dataType === "Image" ? (
                <div>
                  <label id="label-image" className="block">
                    <input
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-purple-500 file:text-white"
                      id="image-input"
                      type="file"
                      accept="image/*"
                      name={field.columnName}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              ) : field.dataType === "file" ? (
                <div>
                  <label id="label-pdf" className="block">
                    <input
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-purple-500 file:text-white"
                      id="pdf-input"
                      type="file"
                      accept="application/pdf"
                      name={field.columnName}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              ) : field.dataType === "Date" ? (
                <div>
                  <label id="label-date" className="block">
                    <input
                      type="date"
                      name={field.columnName}
                      id="date-input"
                      className="w-full border border-gray-300 px-3 py-2 rounded text-gray-700"
                      onChange={handleChange}
                    />
                  </label>
                </div>
              ) : field.dataType === "Mobile No." ? (
                <div>
                  <label id="label-mobile" className="block">
                    <input
                      type="text"
                      placeholder="Enter Mobile Number"
                      name={field.columnName}
                      id="mobile-input"
                      className="w-full border border-gray-300 px-3 py-2 rounded text-gray-700"
                      onChange={handleChange}
                    />
                  </label>
                </div>
              ) : field.dataType === "select(dropdown)" ? (
                <select
                  required
                  className="w-full border border-gray-300 px-3 py-2 rounded text-gray-700 bg-white"
                  name={field.columnName}
                  value={formData[field.columnName] || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [field.columnName]: e.target.value,
                    }))
                  }
                >
                  <option value="">select option</option>
                  {getDropdownOptions(field.columnName).map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  className="w-full border border-gray-300 px-3 py-2 rounded text-gray-700"
                  placeholder={`Enter ${
                    field.columnName !== "comment box"
                      ? field.columnName
                      : "comment"
                  }`}
                  type={field.dataType === "Number(int)" ? "number" : "text"}
                  min={field.dataType === "Number(int)" ? 0 : undefined}
                  required={true}
                  id={field.columnName}
                  name={field.columnName}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}
  
          <div className="md:col-span-2 mt-4">
            <button 
              type="submit" 
              className=" w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

TemplateCreated.propTypes = {
  open: PropTypes.bool.isRequired,
  // toggleAsideBar: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired, 
};

export default TemplateCreated;
