import { useState } from "react";
import { Upload, AlertCircle, Check, Loader } from "lucide-react";

const BulkLeadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false);
  const [uploadResponse, setUploadResponse] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      if (!file.name.match(/\.(xlsx|xls)$/)) {
        setError("Please upload a valid Excel file (.xlsx or .xls)");
        setSelectedFile(null);
        e.target.value = null;
      } else {
        setError(null);
        setSelectedFile(file);
      }
    }
  };

  const uploadFile = async (skipDuplicates = false) => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file-xle", selectedFile);
    if (skipDuplicates) {
      formData.append("skipDuplicates", "true");
    }

    try {
      const response = await fetch("http://localhost:8080/add-bulk-lead", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409 || data.error?.includes("duplicate")) {
          setShowDuplicateAlert(true);
        }
        throw new Error(data.error || "Failed to upload file");
      }

      // Check if recordsProcessed is 0, indicating invalid data
      if (data.recordsProcessed === 0) {
        setError("Failed!!! to proceed, check the data format again!");
        setSelectedFile(null);
        return;
      }

      setUploadResponse(data);
      setSelectedFile(null);
      setShowDuplicateAlert(false);
    } catch (err) {
      setError(err.message);
      setSelectedFile(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please upload an Excel file.");
      return;
    }
    uploadFile(false);
  };

  const handleSkipDuplicates = () => {
    uploadFile(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Bulk Lead Upload</h2>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Excel File (.xlsx)
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">Excel files only (.xlsx, .xls)</p>
                </div>
                <input 
                  type="file" 
                  accept=".xlsx,.xls" 
                  className="hidden" 
                  onChange={handleFileChange}
                  disabled={isLoading}
                />
              </label>
            </div>
            {selectedFile && (
              <div className="mt-2 text-sm text-gray-600 flex items-center">
                <Check size={16} className="text-green-500 mr-1" />
                {selectedFile.name} selected
              </div>
            )}
          </div>
          
          <button
            type="submit"
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors ${
              isLoading ? "opacity-75 cursor-not-allowed" : ""
            }`}
            disabled={!selectedFile || isLoading}
          >
            {isLoading ? (
              <>
                <Loader size={18} className="animate-spin mr-2" />
                Processing...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Upload the bulk lead Excel File (.xlsx) to submit all lead entries.
          </p>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {uploadResponse && !error && uploadResponse.recordsProcessed > 0 && (
          <div className="mt-4 bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <Check className="h-5 w-5 text-green-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  Successfully processed {uploadResponse.recordsProcessed} records
                </p>
              </div>
            </div>
          </div>
        )}

        {showDuplicateAlert && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Duplicate Entries Found
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Some entries in the Excel file already exist in the system.
                Would you like to skip the duplicate entries and continue with
                the upload?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  onClick={() => setShowDuplicateAlert(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-purple-500 border border-transparent rounded-md text-sm font-medium text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  onClick={handleSkipDuplicates}
                >
                  Skip Duplicates
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkLeadComponent;