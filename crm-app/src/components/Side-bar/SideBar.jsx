import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FileDoneOutlined,
  FormOutlined,
  FundProjectionScreenOutlined,
  LogoutOutlined,
  SolutionOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  CreditCardOutlined 
} from "@ant-design/icons";
import { BsPeople } from "react-icons/bs";

const Sidebar = ({ isExpanded, setIsExpanded, username, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  // Menu items with icons and paths from AsideBar
  const menuItems = [
    { icon: <FundProjectionScreenOutlined />, label: "Dashboard", path: "/" },
    { icon: <UserAddOutlined />, label: "Add Lead", path: "/LeadRegistrationForm", state: { username } },
    { icon: <BsPeople />, label: "Add Bulk Lead", path: "/BulkLead" },
    { icon: <UserAddOutlined />, label: "Add Client", path: "/TemplateCreated", state: { username } },
    { icon: <UsergroupAddOutlined />, label: "Client List", path: "/ClientDataTable" },
    { icon: <FileDoneOutlined />, label: "Invoice", path: "/InvoiceGen" },
    { icon: <SolutionOutlined />, label: "Subscription", path: "/Subscription" },
    { icon: <FormOutlined />, label: "Create Template", path: "/TemplateCustom" },
    { icon: <CreditCardOutlined />, label: "Create kanban", path:"/create-kanban" },
    { icon: <LogoutOutlined />, label: "Log out", action: handleLogout }
  ];

  return (
    <aside className={`bg-white transition-all duration-300 shadow-md ${isExpanded ? 'w-56 overflow-y-scroll' : 'w-16'} relative`}>
      {/* Toggle button */}
      <button 
        className="absolute right-2 top-6 bg-white rounded-full  p-1 shadow-md z-20"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="material-icons text-gray-600 text-sm">
          {isExpanded ? 'chevron_left' : 'chevron_right'}
        </span>
      </button>

      {/* Logo/Brand */}
      <div className="flex items-center p-4">
        {isExpanded ? (
          <Link to="/" className="text-black no-underline">
            <div className="flex items-center">
            <span className="font-bold text-lg">Shepherd</span>
            <span className="text-xs bg-purple-200 rounded p-1 ml-1">CRM</span>
            </div>
          </Link>
        ) : (
          <span className="font-bold text-2xl">S</span>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="mt-4">
        {menuItems.map((item, index) => (
          item.action ? (
            <div 
              key={index} 
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-purple-100 hover:text-purple-700 cursor-pointer transition-colors duration-200"
              onClick={item.action}
            >
              <span className="text-lg">{item.icon}</span>
              {isExpanded && <span className="ml-4">{item.label}</span>}
            </div>
          ) : (
            <Link 
              key={index}
              to={item.path}
              state={item.state}
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-purple-100 hover:text-purple-700 no-underline transition-colors duration-200"
            >
              <span className="text-lg">{item.icon}</span>
              {isExpanded && <span className="ml-4">{item.label}</span>}
            </Link>
          )
        ))}
      </nav>

      {isExpanded && (
        <div className="absolute pb-2 left-4 text-xs text-gray-500">
          <p className="m-0">Design and developed by</p>
          <p className="m-0 font-medium">Sumer Khan.</p>
        </div>
      )}
    </aside>
  );
};

Sidebar.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  setIsExpanded: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Sidebar;