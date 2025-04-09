import './index.css'; 
import {Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import Sidebar from './components/Side-bar/SideBar';
import Dashboard from './components/Dashboard/Dashboard';
import LeadFollowUp from './components/LeadFollowUp/LeadFollowUp';
import LeadRegistrationForm from "./components/LeadFollowUp/LeadRegistrationForm";
import SubscriptionPage from "./components/Subscription-component/SubscriptionPage";
import BulkLeadComponent from "./components/Bulk-lead/BulkLead";
import InvoiceGen from "./components/Invoice-generator/InvoiceGen";
import TemplateCustom from "./components/template-fom/TemplateCustom";
import LoginComponent from "./components/Login-form/LoginComp";
import SignUpComp from "./components/SignUp-form/SignUpComp";
import ErrorBoundary from "./ErrorBoundary";

// import LeadActivity from "./components/LeadFollowUp/LeadActivity";
// import LeadList from "./components/LeadFollowUp/LeadList";
// import BusinessPanel from "./components/Business-Panel/BusinessPanel";
// import DynamicForm from "./components/template-fom/TemplateComp";
import TemplateCreated from "./components/Created-Templates/CreatedTemplate";
import ClientDataTable from "./components/Client-data/ClientDataTable";
// import CalenderComponent from "./components/calender-component/CalenderComponent";

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [organizationName, setOrganizationName] = useState(
    localStorage.getItem("organizationName") || ""
  );
  const [templateId, setTemplateId] = useState(null);
  const [user, setUser] = useState({
    id: null,
    fullName: "",
    address: "",
    mobileNumber: "",
    email: "",
    organizationName: "",
    userName: "",
    formTemplates: [],
    logo: null,
  });

  const handleLogin = (username, password) => {
    fetch(
      `http://localhost:8080/login?username=${username}&password=${password}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Login failed");
        }
      })
      .then((data) => {
        setIsAuthenticated(true);
        setUsername(username);
        setOrganizationName(data.organizationName);

        localStorage.setItem("username", username);
        localStorage.setItem("organizationName", data.organizationName);
        localStorage.setItem("isAuthenticated", "true");
        setUser(data);

        console.log("app user data", user);
        console.log("getting organizationName---->", data.organizationName);
        console.log("username ---->", username);
        localStorage.setItem("user", JSON.stringify(data));
        fetchTemplateData(username);
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("Login failed. Please check your credentials.");
      });
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const fetchTemplateData = (username) => {
    fetch(`http://localhost:8080/get-template-username?userName=${username}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          console.log(data);
          setTemplateId(data[0].id); // Assuming you want the first template's ID
        } else {
          console.error("No templates found for this user.");
        }
      })
      .catch((error) => console.error("Error fetching template data:", error));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setOrganizationName("");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    localStorage.removeItem("organizationName");
  };

  useEffect(() => {
    if (isAuthenticated && username) {
      fetchTemplateData(username);
    }
  }, [isAuthenticated, username]);

  return (
    <>
      {isAuthenticated ? (
        <div className="flex h-screen bg-gray-50">
          {/* Sidebar Component */}
          <Sidebar 
            isExpanded={isSidebarExpanded} 
            setIsExpanded={setIsSidebarExpanded}
            username={username}
            setIsAuthenticated={handleLogout}
          />
          
          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route
                path='/'
                element={
                  <ErrorBoundary>
                    <Dashboard />
                    {/* <LeadActivity /> */}
                    <LeadFollowUp />
                  </ErrorBoundary>
                }
              />

              {/* <Route path="/LeadList" element={<LeadList />} />
              <Route
                path="/DynamicForm"
                element={<DynamicForm userName={username} />}
              /> */}

              <Route 
                path="/BulkLead" 
                element={<BulkLeadComponent />} 
              />

              <Route
                path="/LeadRegistrationForm"
                element={<LeadRegistrationForm />}
              />

              <Route
                path="/InvoiceGen"
                element={<InvoiceGen templateId={templateId} />}
              />

              <Route 
                path="/Subscription" 
                element={<SubscriptionPage />}
              />

              <Route
                path="/TemplateCreated"
                element={<TemplateCreated username={username} />}
              />

              <Route 
                path="/TemplateCustom" 
                element={
                  <TemplateCustom username={username} organizationName={organizationName} />
                }
              />

              <Route
                path="/ClientDataTable"
                element={<ClientDataTable templateId={templateId} />}
              />

              {/* <Route path="/CalenderComponent" element={<CalenderComponent />} /> */}
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<LoginComponent onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/SignUpComp" element={<SignUpComp />} />
        </Routes>
      )}
    </>
  );
}

export default App;