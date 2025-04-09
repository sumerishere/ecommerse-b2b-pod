import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ClientData from "../Client-data/ClientData";
import "../Client-data/ClientDataTable.css";

const ClientDataTable = ({ templateId }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set loading to true when the component starts loading
    if (templateId !== null) {
      setLoading(true);
      // Simulate a loading delay
      setTimeout(() => {
        setLoading(false); // Set loading to false after data is "fetched"
      }, 1000); // Adjust the timeout duration as needed
    } else {
      setLoading(false); // No need to load if templateId is null
    }
  }, [templateId]);

  return (
    <div className="min-h-[60vh] bg-gray-50 p-6 rounded-lg">
  {loading ? (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
      <p className="text-xl text-gray-600 font-medium">Loading...</p>
    </div>
  ) : templateId !== null ? (
    <div className="w-full">
      <ClientData templateId={templateId} />
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <img
        className="w-64 h-70 mb-6 rounded-lg shadow-sm"
        src="/images/undraw_File_searching_.png"
        alt="Data not found"
      />
      <p className="text-2xl font-bold text-gray-700">Oops...Data Not Found!!!</p>
      <div className="mt-6 w-48 h-1 bg-gradient-to-r from-purple-300 via-purple-500 to-purple-300 rounded-full"></div>
    </div>
  )}
</div>
  );
};

// Add prop validation using PropTypes
ClientDataTable.propTypes = {
  templateId: PropTypes.string.isRequired, // Ensure templateId is required and a string
};

export default ClientDataTable;
