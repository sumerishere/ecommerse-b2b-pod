// import "./ClientData.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { FormOutlined, DeleteOutlined,SnippetsOutlined,RedoOutlined } from "@ant-design/icons";
import debounce from "lodash/debounce";


const ClientData = ({ templateId }) => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]); // Store original data
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [uidToDelete, setUidToDelete] = useState(null);
  const [updateFormVisible, setUpdateFormVisible] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    uid: null,
    fieldsData: {},
  });

  const [searchTerm, setSearchTerm] = useState(""); 
  const [filteredData, setFilteredData] = useState([]);


    // if (templateId) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `http://localhost:8080/get-template-data/${templateId}`
          );
          if (response.ok) {
            const result = await response.json();
            setData(result);
            setOriginalData(result); // Store original data
          } else {
            console.error("Failed to fetch template data");
          }
        } catch (error) {
          console.error("Fetch error:", error);
        } finally {
          setLoading(false);
        }
      };
    // }

  useEffect(() =>{
    fetchData();
  }, [templateId]);

  const handleRefresh = () => {
    fetchData();
  };

  useEffect(() => {
    // Filter data whenever searchTerm or originalData changes
    debouncedHandleSearch();
  }, [searchTerm, originalData]);

  const debouncedHandleSearch = debounce(() => {
    if (searchTerm.trim() === "") {
      setFilteredData(originalData);
    } else {
      const filtered = originalData.filter((item) =>
        JSON.stringify(item.fields_Data)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, 300);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchButtonClick = () => {
    debouncedHandleSearch();
  };

  const handleDeleteClick = (uid) => {
    setUidToDelete(uid);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/delete-by-uid/${uidToDelete}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        toast.success("Entry deleted successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        setData(data.filter((item) => item.uid !== uidToDelete));
      } else {
        toast.error("Failed to delete entry.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setShowConfirm(false);
      setUidToDelete(null);
    }
  };

  const handleUpdateClick = async (uid) => {
    try {
      const response = await fetch(
        `http://localhost:8080/get-user-by-uid/${uid}`
      );
      if (response.ok) {
        const result = await response.json();
        setUpdateFormData({
          uid: uid,
          fieldsData: result,
        });
        setUpdateFormVisible(true);
      } else {
        toast.error("Failed to fetch user data for update.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error(
        "An error occurred while fetching user data. Please try again.",
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
    }
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();

    try {
      const payload = {
        uid: updateFormData.uid,
        fieldsData: updateFormData.fieldsData,
      };

      const response = await fetch("http://localhost:8080/update-user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("User data updated successfully!", {
          position: "bottom-right",
          autoClose: 3000,
        });

        setUpdateFormVisible(false);
        const updatedData = data.map((item) =>
          item.uid === updateFormData.uid
            ? { ...item, fields_Data: updateFormData.fieldsData }
            : item
        );
        setData(updatedData);
      } else {
        const errorText = await response.text();
        toast.error(`Failed to update user data: ${errorText}`, {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error(
        "An error occurred while updating user data. Please try again.",
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData((prevData) => ({
      ...prevData,
      fieldsData: {
        ...prevData.fieldsData,
        [name]: value,
      },
    }));
  };

  // const handleCheckboxChange = (e, uid) => {
  //   const updatedData = data.map((row) =>
  //     row.uid === uid
  //       ? {
  //           ...row,
  //           fields_Data: {
  //             ...row.fields_Data,
  //             "fees completed": e.target.checked ? "Yes" : "No",
  //           },
  //         }
  //       : row
  //   );
  //   setData(updatedData);
  // };

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

  const fieldsDataArray = data.map((item) => item.fields_Data);
  const columnHeaders =
    fieldsDataArray.length > 0 ? Object.keys(fieldsDataArray[0]) : [];

  return (
    <div className="p-6 rounded-lg shadow-sm">
      <ToastContainer />
      <p className="text-2xl font-bold text-purple-700 mb-4">Client-Table</p>

      {/* client search input div */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search client here"
          className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <button 
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition-colors" 
          onClick={handleSearchButtonClick}
        >
          Search
        </button>
      </div>
      <hr className="border-gray-200 mb-4" />

      <div className="flex justify-between items-center mb-4">
        <div>
          <Link
            to={"/TemplateCreated"}
            className="no-underline text-black"
          >
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition-colors">
              Add Client
            </button>
          </Link>          
        </div>

        <button 
          className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors" 
          onClick={handleRefresh}
        >
          <RedoOutlined className="text-purple-600" />
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-full">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-purple-100">
              <tr>
                {columnHeaders.map((header, index) => (
                  <th key={index} className="px-4 py-2 text-left text-gray-700 font-semibold border-b">{header}</th>
                ))}
                <th className="px-4 py-2 text-left text-gray-700 font-semibold border-b sticky right-0 bg-purple-100">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.uid} className="hover:bg-gray-50">
                    {columnHeaders.map((header, index) => (
                      <td className="px-4 py-3 border-b text-gray-700" key={index}>
                        {item.fields_Data[header] !== undefined
                          ? item.fields_Data[header]
                          : ""}
                      </td>
                    ))}
                    <td className="px-3 py-5 border-b sticky right-0  flex gap-2">
                      <button
                        className="text-blue-500 hover:text-blue-700 p-1"
                        onClick={() => handleUpdateClick(item.uid)}
                      >
                        <FormOutlined />
                      </button>

                      <Link to="/InvoiceGen" className="no-underline">
                        <button
                          className="text-green-500 hover:text-green-700 p-1"
                        >
                          <SnippetsOutlined />
                        </button>
                      </Link>

                      <button
                        className="text-red-500 hover:text-red-700 p-1"
                        onClick={() => handleDeleteClick(item.uid)}
                      >
                        <DeleteOutlined />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columnHeaders.length + 3} className="px-4 py-8 text-center text-gray-500 text-lg">
                    Client not found 😭
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <p className="text-lg font-medium mb-4 text-center">
              Are you sure you want to delete this entry? 🥺
            </p>
            <div className="flex justify-center gap-4">
              <button 
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={confirmDelete}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                onClick={() => setShowConfirm(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {updateFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleUpdateSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {columnHeaders.map((header) =>
                header !== "lead-status" && header !== "fees completed" ? (
                  <div key={header} className="mb-3">
                    <label htmlFor={header} className="block text-gray-700 font-medium mb-1">{header}</label>
                    <input
                      type="text"
                      required={true}
                      id={header}
                      name={header}
                      value={updateFormData.fieldsData[header] || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                ) : null
              )}
              <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                <button 
                  type="submit" 
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                  onClick={() => setUpdateFormVisible(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

ClientData.propTypes = {
  templateId: PropTypes.string.isRequired,
};

export default ClientData;
