import moment from "moment";
import { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const localizer = momentLocalizer(moment);

const CalendarComp = () => {
  
  const [events, setEvents] = useState([]);
  const [currentView, setCurrentView] = useState(Views.MONTH);
  const [leads, setLeads] = useState([]);
  const [leadData, setLeadData] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [showTable, setShowTable] = useState(false);

  // New state for showing update form and tracking selected lead data
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    followUpDate: "",
    assignTo: "",
    comments: "",
    statusType: "",
  });

  const fetchLeads = async () => {
    try {
      const response = await fetch("http://localhost:8080/get-all-lead");
      const leadData = await response.json();

      setLeads(leadData || []);

      const eventsData = leadData.reduce((eventsAcc, lead) => {
        const followUpDate = moment(lead.followUpDate).startOf("day").toDate();

        const existingEvent = eventsAcc.find((event) =>
          moment(event.start).isSame(followUpDate, "day")
        );

        if (existingEvent) {
          existingEvent.title = `${parseInt(existingEvent.title) + 1}`;
        } else {
          eventsAcc.push({
            start: followUpDate,
            end: followUpDate,
            title: "1",
            backgroundColor: getHashedColor(followUpDate.toString()),
          });
        }
        return eventsAcc;
      }, []);

      setEvents(eventsData);
    } catch (error) {
      console.log("failed to fetch",error);
      // toast.error("Failed to fetch leads");
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const getHashedColor = (input) => {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash = input.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `#${((hash >> 24) & 0xff).toString(16)}${(
      (hash >> 16) &
      0xff
    ).toString(16)}${((hash >> 8) & 0xff).toString(16)}`;
    return color;
  };

  const handleEventClick = (event) => {
    const clickedDate = moment(event.start).format("YYYY-MM-DD");
    const filteredLeadsByDate = leads.filter((lead) => {
      const followUpDate = moment(lead.followUpDate).format("YYYY-MM-DD");

      return followUpDate === clickedDate;
    });

    setFilteredLeads(filteredLeadsByDate);
    setShowTable(true);
  };

  const handleCloseTable = () => {
    setShowTable(false);
  };

  // Function to handle clicking on a table entry to open the update form
  const handleLeadClick = async (lead) => {
    try {
      const response = await fetch(
        `http://localhost:8080/get-lead-by-id/${lead.uid}`
      );
      const leadData = await response.json();

      setSelectedLead(leadData);
      
      setUpdateFormData({
        name: leadData.name || "",
        mobileNumber: leadData.mobileNumber || "",
        email: leadData.email || "",
        followUpDate: leadData.followUpDate || "",
        assignTo: leadData.assignTo || "",
        comments:
          leadData.comments.map((comment) => comment.comment).join(", ") || "",
        statusType: leadData.statusType || "",
      });
    
      setShowUpdateForm(true);
    } catch (error) {
      toast.error("Failed to fetch lead details", error);
    }
  };

  // Function to handle form changes
  const handleFormChange = (e) => {
    setUpdateFormData({
      ...updateFormData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission and send PUT request
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Prepare the lead follow-up data
    const leadFollowUpData = {
      name: updateFormData.name || selectedLead.name,
      email: updateFormData.email || selectedLead.email,
      mobileNumber: updateFormData.mobileNumber || selectedLead.mobileNumber,
      followUpDate: updateFormData.followUpDate || selectedLead.followUpDate,
      assignTo: updateFormData.assignTo || selectedLead.assignTo,
      statusType: updateFormData.statusType || selectedLead.statusType,
    };

    // Construct the payload with leadFollowUp data only
    const payload = {
      name: leadFollowUpData.name,
      email: leadFollowUpData.email,
      mobileNumber: leadFollowUpData.mobileNumber,
      followUpDate: leadFollowUpData.followUpDate,
      assignTo: leadFollowUpData.assignTo,
      statusType: leadFollowUpData.statusType,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/update-followup/${selectedLead.uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload), // Send the properly structured payload
        }
      );

      if (response.ok) {
        toast.success("Lead updated successfully!");
        setShowUpdateForm(false);
        fetchLeads(); // Refresh leads after update
      } else {
        toast.error("Failed to update lead.");
      }
    } catch (error) {
      console.error("Error updating lead:", error);
      toast.error("An error occurred while updating the lead.");
    }
  };

  // Function to handle closing the update form
  const handleCloseUpdateForm = () => {
    setShowUpdateForm(false);
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  };

  const [showCommentHistory, setShowCommentHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [noHistoryAvailable, setNoHistoryAvailable] = useState(false);

  const handleViewCommentsClick = (lead) => {
    // Set the history data for the selected lead
    const comments = lead.comments || [];
    setHistoryData(comments);
    setNoHistoryAvailable(comments.length === 0);

    // Toggle visibility of the comment history
    setLeadData(lead);
    setShowCommentHistory(true);
  };

  const closeCommentHistory = () => {
    setShowCommentHistory(false);
    setHistoryData([]);
  };
  
  return (
    <div className="w-full bg-white rounded-lg shadow-md">
      <div className="relative">
        {/* Toast Container */}
        <ToastContainer />
        
        {/* Calendar Component */}
<div className="w-full overflow-hidden">
  <Calendar
    localizer={localizer}
    events={events}
    startAccessor="start"
    endAccessor="end"
    views={{ month: true, week: true, day: true }}
    view={currentView}
    onView={setCurrentView}
    style={{ height: 480 }} 
    className="w-full"
    eventPropGetter={(event) => {
      const eventDate = moment(event.start).startOf("day").toDate();
      const today = new Date();

      const setDateCss =
        eventDate.getDate() === today.getDate() &&
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getFullYear() === today.getFullYear();

      return {
        style: {
          backgroundColor: event.backgroundColor,
          borderRadius: "0.375rem",
          color: "white",
          border: setDateCss ? "1.5px solid white" : "1px solid #7F7F7F",
          display: "block",
          height: "24px",
          width: "58px",
          marginTop: "20px",
          marginLeft: "5px",
          padding: "0px",
          boxShadow: setDateCss
            ? "0px 3px 5px 0px rgb(0, 0, 0, 0.9)"
            : "none",
          textAlign: "center",
        },
      };
    }}
    components={{
      event: ({ event }) => (
        <div
          className="rbc-event-content w-full h-full m-0 p-0"
          title={event.title}
          onClick={() => handleEventClick(event)}
        >
          {event.title}
        </div>
      ),
    }}
  />
</div>
  
        {/* Table Display */}
        {showTable && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <p className="font-bold text-xl">FollowUps</p>
                <button 
                  onClick={handleCloseTable} 
                  className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors"
                >
                  X
                </button>
              </div>
  
              <div className="overflow-auto p-4 max-h-[calc(90vh-80px)]">
                {filteredLeads.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Follow Up</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assign To</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status Type</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredLeads.map((lead, index) => (
                          <tr key={index} className="hover:bg-gray-200">
                            <td className="px-3 py-4 whitespace-nowrap text-sm">{lead.name || "N/A"}</td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm">{lead.mobileNumber}</td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm">{lead.email || "N/A"}</td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm">{lead.followUpDate || "N/A"}</td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm">{lead.assignTo || "N/A"}</td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm">{lead.statusType || "N/A"}</td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm">
                              {lead.comments && lead.comments.length > 0 ? (
                                <div>
                                  <strong>Comment:</strong>{" "}
                                  {lead.comments[0].comment}
                                  {lead.comments.length > 1 && " ...."}
                                </div>
                              ) : (
                                "No Comments"
                              )}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm">
                              <button
                                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs mr-2"
                                onClick={() => handleViewCommentsClick(lead)}
                              >
                                View comments
                              </button>
                              <button 
                                className="bg-purple-500 hover:bg-purple-600 text-white px-2 py-1 rounded text-xs"
                                onClick={() => handleLeadClick(lead)}
                              >
                                Update lead
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-center py-8 text-gray-500">No leads found for this date.</p>
                )}
              </div>
            </div>
          </div>
        )}
  
        {/* Comment History Modal */}
        {showCommentHistory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
              <div className="flex justify-end p-2">
                <button
                  className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors"
                  onClick={closeCommentHistory}
                >
                  X
                </button>
              </div>
              <p className="text-xl font-bold px-6 pb-4">Comments History: {leadData.name || "N/A"}</p>
              <div className="px-6 pb-6 max-h-[60vh] overflow-y-auto">
                {noHistoryAvailable ? (
                  <p className="text-center py-8 text-gray-500">No Comments available 😴</p>
                ) : (
                  historyData
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((item) => (
                      <div key={item.id} className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <p className="mb-2">{item.comment}</p>
                        <span className="text-xs text-gray-500">
                          {new Date(item.createdAt).toLocaleString()}
                        </span>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        )}
  
        {/* Update Form Modal */}
        {showUpdateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg h-[550px] overflow-y-auto">
              <div className="flex justify-between items-center p-4 border-b border-gray-200 ">
                <h2 className="text-xl font-bold">Update FollowUp</h2>
                <button
                  onClick={handleCloseUpdateForm}
                  className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors"
                >
                  X
                </button>
              </div>
              
              <form onSubmit={handleFormSubmit} className="p-6 ">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name:
                    <input
                      type="text"
                      name="name"
                      value={updateFormData.name}
                      onChange={handleFormChange}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </label>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Mobile Number:
                    <input
                      type="text"
                      name="mobileNumber"
                      value={updateFormData.mobileNumber}
                      onChange={handleFormChange}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </label>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email:
                    <input
                      type="email"
                      name="email"
                      value={updateFormData.email}
                      onChange={handleFormChange}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </label>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Follow Up Date:
                    <input
                      type="datetime-local"
                      name="followUpDate"
                      value={updateFormData.followUpDate}
                      onChange={handleFormChange}
                      min={getCurrentDateTime()}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </label>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Assign To:
                    <input
                      type="text"
                      name="assignTo"
                      value={updateFormData.assignTo}
                      onChange={handleFormChange}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </label>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Status Type:
                    <input
                      type="text"
                      name="statusType"
                      value={updateFormData.statusType}
                      onChange={handleFormChange}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </label>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
                >
                  Update Lead
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarComp;