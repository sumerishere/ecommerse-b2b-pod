// import "./LeadFollowUp.css";
import {
  DeleteOutlined,
  FormOutlined,
  HistoryOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import debounce from "lodash/debounce";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LeadFollowUp = () => {
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState(null);
  const [noHistoryAvailable, setNoHistoryAvailable] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [filterOption, setFilterOption] = useState("name");
  const [searchText, setSearchText] = useState("");

  //------- getting all data from backend of lead table -------//

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/get-all-lead");
      const data = await response.json();
      setLeads(data || []);
      setFilteredLeads(data || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };
  // Function to force re-render by changing the key
  useEffect(() => {
    fetchLeads();
  }, []);

  const handleRefresh = () => {
    fetchLeads();
  };

  const handleSearch = async (text) => {
    try {
      const queryParams = new URLSearchParams();
      let url;

      if (text) {
        if (filterOption === "mobile") {
          queryParams.append("mobileNumber", text);
          url = `http://localhost:8080/search-lead-mobile?${queryParams.toString()}`;
        } 
        else {
          queryParams.append("name", text);
          url = `http://localhost:8080/search-lead-name?${queryParams.toString()}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setFilteredLeads(data || []);
      }
    } catch (error) {
      console.error("Error searching leads:", error);
    }
  };

  const debouncedSearch = debounce((text) => handleSearch(text), 300);

  useEffect(() => {
    if (searchText.length >= 3) {
      debouncedSearch(searchText);
    } else {
      setFilteredLeads(leads);
    }
  }, [searchText, leads, debouncedSearch]);

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilterOption(selectedFilter);

    // Update input type and placeholder based on selected filter
    if (selectedFilter === "mobile") {
      setSearchText(""); // Clear input when changing filter
    }
  };

  const handleDelete = (uid) => {
    setLeadToDelete(uid);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (leadToDelete) {
      try {
        await fetch(`http://localhost:8080/delete-lead-by-id/${leadToDelete}`, {
          method: "DELETE",
        });

        setLeads(leads.filter((lead) => lead.uid !== leadToDelete));
        setFilteredLeads(
          filteredLeads.filter((lead) => lead.uid !== leadToDelete)
        );
        toast.success("Lead deleted successfully!");
        setShowDeleteConfirm(false);
        setLeadToDelete(null);
      } catch (error) {
        console.error("Error deleting lead:", error);
        toast.error("Failed to delete lead. Please try again.");
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setLeadToDelete(null);
  };

  const handleUpdate = async (uid) => {
    try {
      const response = await fetch(
        `http://localhost:8080/get-lead-by-id/${uid}`
      );
      const data = await response.json();
      console.log("Lead data fetched successfully:", data);
      setSelectedLead(data);
      setShowUpdateForm(true);
    } catch (error) {
      console.error("Error fetching lead data:", error);
    }
  };

  const handleHistory = async (uid) => {
    try {
      // Fetch the lead's data
      const leadResponse = await fetch(
        `http://localhost:8080/get-lead-by-id/${uid}`
      );
      const leadData = await leadResponse.json();

      // Set the lead data to show user info in the history container
      setSelectedLead(leadData);

      // Fetch the comments (history) data
      const commentsResponse = await fetch(
        `http://localhost:8080/get-comments-by-id/${uid}`
      );
      const commentsData = await commentsResponse.json();

      // Set the comments data to show the history
      if (Array.isArray(commentsData) && commentsData.length === 0) {
        console.log("lead comment : ", commentsData);
        setNoHistoryAvailable(true);
      } else {
        setHistoryData(Array.isArray(commentsData) ? commentsData : []);
        setNoHistoryAvailable(false);
      }

      // Show the history container with user info and comments
      setShowHistory(true);
    } catch (error) {
      console.error("Error fetching history or lead data:", error);
      setNoHistoryAvailable(true);
      setShowHistory(true);
    }
  };

  const closeHistory = () => {
    setShowHistory(false);
    setNoHistoryAvailable(false);
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    const newComment = event.target.newComment.value;

    if (!selectedLead) return;

    const updatedLeadData = {
      leadFollowUp: {
        name: event.target.name.value,
        email: event.target.email.value,
        mobileNumber: event.target.mobileNumber.value,
        address: event.target.address.value,
        qualification: event.target.qualification.value,
        courseType: event.target.courseType.value,
        source: event.target.source.value,
        referName: event.target.referName.value,
        category: event.target.category.value,
        followUpDate: event.target.followUpDate.value,
        assignTo: event.target.assignTo.value,
      },
      comments: [newComment],
    };

    try {
      const response = await fetch(
        `http://localhost:8080/update-lead-by-id/${selectedLead.uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedLeadData),
        }
      );

      // Check if the response is in JSON format
      const contentType = response.headers.get("content-type");

      if (response.ok) {
        let data;
        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
          console.log("Lead updated successfully:", data);
        } else {
          const textData = await response.text();
          console.log("Lead updated successfully:", textData);
        }
        toast.success("Lead updated successfully!!!");
        setShowUpdateForm(false);
        setSelectedLead(null);
      } else {
        const errorMessage = await response.text();
        toast.error(errorMessage);
        // throw new Error('Failed to update lead');
      }
    } catch (error) {
      console.error("Error updating lead:", error);
      toast.error("Failed to update lead,", error);
    }
  };

  const cancelUpdateForm = () => {
    setShowUpdateForm(false);
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

  // Handle checkbox change
  const handleCheckboxChange = (uid) => {
    setSelectedCheckboxes((prev) => ({
      ...prev,
      [uid]: !prev[uid],
    }));
  };

  //sorting lead based category of leads(hot->warm->cold)
  const sortLeads = (a, b) => {
    const categoryOrder = { hot: 1, warm: 2, cold: 3 };
    return categoryOrder[a.category] - categoryOrder[b.category];
  };

  // Sort the filteredLeads array
  const sortedLeads = [...filteredLeads].sort(sortLeads);

  return (
    <div className="w-full max-w-full mx-auto p-4">
      <ToastContainer />
      <p className="text-2xl font-bold mb-4 text-center">Lead-Table</p>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        {/* filter lead by category */}
        <div className="w-full md:w-1/4">
          <select
            className="w-full p-2 border border-gray-300 rounded cursor-pointer"
            value={filterOption}
            onChange={handleFilterChange}
          >
            <option value="">Search Filter</option>
            <option value="name">Name</option>
            <option value="mobile">Mobile</option>
          </select>
        </div>
        {/* search input div*/}
        <div className="w-full md:w-3/4 flex">
          <input
            type={filterOption === "mobile" ? "number" : "text"}
            placeholder={
              filterOption === "mobile"
                ? "Enter mobile number"
                : "Enter name here"
            }
            className="w-full p-2 border border-gray-300 rounded-l"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button 
            className="bg-purple-500 text-white px-4 py-2 rounded-r hover:bg-purple-600 transition"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
  
      <hr className="my-4" />
      
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <div>
          <Link
            to="/LeadRegistrationForm"
            className="text-white"
          >
            <button className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded transition">
              Add Lead
            </button>
          </Link>
        </div>
  
        <div className="flex gap-4 items-center">
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 bg-red-500 rounded-full mr-1"></span>
            <p className="text-sm">hot</p>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 bg-yellow-500 rounded-full mr-1"></span>
            <p className="text-sm">warm</p>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 bg-blue-500 rounded-full mr-1"></span>
            <p className="text-sm">cold</p>
          </div>
        </div>
  
        <button 
          className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
          onClick={handleRefresh}
        >
          <RedoOutlined />
        </button>
      </div>
  
      <div className="w-full overflow-x-auto h-[500px]">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="sticky left-0 bg-gray-100 border-b px-4 py-2 text-left">FollowUps-Done</th>
              <th className="border-b px-4 py-2 text-left">Name</th>
              <th className="border-b px-4 py-2 text-left">Email</th>
              <th className="border-b px-4 py-2 text-left">Mobile Number</th>
              <th className="border-b px-4 py-2 text-left">Address</th>
              <th className="border-b px-4 py-2 text-left">Qualification</th>
              <th className="border-b px-4 py-2 text-left">courseType</th>
              <th className="border-b px-4 py-2 text-left">FollowUp-DateTime</th>
              <th className="sticky right-0 bg-gray-100 border-b px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length === 0 ? (
              <tr>
                <td
                  colSpan="9"
                  className="border-b px-4 py-4 text-center font-medium text-lg"
                >
                  Lead not found 😭
                </td>
              </tr>
            ) : (
              sortedLeads.map((lead) => (
                <tr key={lead.uid} className="hover:bg-gray-50">
                  <td className="sticky left-0 bg-white border-b px-4 py-2 flex items-center space-x-2">
                    <input
                      className="cursor-pointer"
                      type="checkbox"
                      checked={!!selectedCheckboxes[lead.uid]}
                      onChange={() => handleCheckboxChange(lead.uid)}
                    />
                    <div
                      className={`w-4 h-4 rounded-full ${
                        lead.category === "hot"
                          ? "bg-red-500"
                          : lead.category === "warm"
                          ? "bg-yellow-500"
                          : lead.category === "cold"
                          ? "bg-blue-500"
                          : ""
                      }`}
                    ></div>
                  </td>
                  <td className="border-b px-4 py-2">{lead.name}</td>
                  <td className="border-b px-4 py-2">{lead.email}</td>
                  <td className="border-b px-4 py-2">{lead.mobileNumber}</td>
                  <td className="border-b px-4 py-2">{lead.address}</td>
                  <td className="border-b px-4 py-2">{lead.qualification}</td>
                  <td className="border-b px-4 py-2">{lead.courseType}</td>
                  <td className="border-b px-4 py-2">{lead.followUpDate}</td>
                  <td className="sticky right-0 bg-white border-b px-4 py-2">
                    <div className="flex space-x-2">
                      <button
                        className="bg-purple-500 text-white p-1 rounded hover:bg-purple-600 transition"
                        onClick={() => handleUpdate(lead.uid)}
                      >
                        <FormOutlined />
                      </button>
                      <button
                        className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition"
                        onClick={() => handleDelete(lead.uid)}
                      >
                        <DeleteOutlined />
                      </button>
                      <button
                        className="bg-gray-500 text-white p-1 rounded hover:bg-gray-600 transition"
                        onClick={() => handleHistory(lead.uid)}
                      >
                        <HistoryOutlined />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
  
      {/* Update Form Modal */}
      {showUpdateForm && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-screen overflow-y-auto p-6">
            <form className="space-y-4" onSubmit={handleUpdateSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    type="text"
                    name="name"
                    defaultValue={selectedLead.name || ""}
                  />
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    type="email"
                    name="email"
                    defaultValue={selectedLead.email || ""}
                  />
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    type="tel"
                    name="mobileNumber"
                    defaultValue={selectedLead.mobileNumber || ""}
                  />
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    type="text"
                    name="address"
                    defaultValue={selectedLead.address || ""}
                  />
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    type="text"
                    name="qualification"
                    defaultValue={selectedLead.qualification || ""}
                  />
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Type</label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    type="text"
                    name="courseType"
                    defaultValue={selectedLead.courseType || ""}
                  />
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    type="text"
                    name="source"
                    defaultValue={selectedLead.source || ""}
                  />
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Refer Name</label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    type="text"
                    name="referName"
                    defaultValue={selectedLead.referName || ""}
                  />
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    type="text"
                    name="category"
                    defaultValue={selectedLead.category || ""}
                  />
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">FollowUp-Date</label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    type="datetime-local"
                    name="followUpDate"
                    defaultValue={selectedLead.followUpDate || ""}
                  />
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assign-To</label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    type="text"
                    name="assignTo"
                    defaultValue={selectedLead.assignTo || "Assign name here"}
                  />
                </div>
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Comment</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded h-24"
                  placeholder="add new comment under(1-151) letters"
                  name="newComment"
                />
              </div>
  
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded transition"
                  type="button"
                  onClick={cancelUpdateForm}
                >
                  Cancel
                </button>
                <button
                  className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded transition"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
  
      {/* Lead History Modal */}
      {showHistory && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-medium">
                Profile of {historyData.length > 0 ? historyData[0]?.leadName : "Lead"}
              </h3>
              <button 
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                onClick={closeHistory}
              >
                X
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {selectedLead.name || "N/A"}</p>
                <p><span className="font-medium">Email:</span> {selectedLead.email || "N/A"}</p>
                <p><span className="font-medium">Mobile Number:</span> {selectedLead.mobileNumber || "N/A"}</p>
                <p><span className="font-medium">Address:</span> {selectedLead.address || "N/A"}</p>
              </div>
              <div className="space-y-2">
                <p><span className="font-medium">Qualification:</span> {selectedLead.qualification || "N/A"}</p>
                <p><span className="font-medium">Source:</span> {selectedLead.source || "N/A"}</p>
                <p><span className="font-medium">Refer Name:</span> {selectedLead.referName || "N/A"}</p>
                <div className="flex items-center">
                  <p><span className="font-medium">Category:</span> ({selectedLead.category || "N/A"})</p>
                  <div
                    className={`ml-2 w-4 h-4 rounded-full ${
                      selectedLead.category === "hot"
                        ? "bg-red-500"
                        : selectedLead.category === "warm"
                        ? "bg-yellow-500"
                        : selectedLead.category === "cold"
                        ? "bg-blue-500"
                        : ""
                    }`}
                  ></div>
                </div>
              </div>
            </div>
            
            <hr className="my-2" />
            
            <div className="p-4">
              <h4 className="font-medium mb-3">Comments:</h4>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {noHistoryAvailable ? (
                  <p className="text-center text-gray-500">No Comments available😴</p>
                ) : (
                  historyData
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((item) => (
                      <div key={item.id} className="p-3 bg-gray-50 rounded">
                        <p className="text-gray-800">{item.comment}</p>
                        <span className="text-xs text-gray-500 block mt-1">
                          {new Date(item.createdAt).toLocaleString()}
                        </span>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
  
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md text-center">
            <p className="text-lg mb-6">
              Are you sure you want to delete this lead entry? 🥺
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded transition"
                onClick={confirmDelete}
              >
                Yes
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded transition"
                onClick={cancelDelete}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadFollowUp;
