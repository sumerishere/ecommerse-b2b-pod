import { useUser } from '../../context/UserContext'; // Import the useUser hook
import StatsCards from '../StatsCards/StatsCards ';
import CalendarComp from '../Dashboard/Calendar';
import TechnologyCharts from '../Dashboard/TechnologyCharts ';
import LineChartComp from "../Dashboard/LineChart";

const Dashboard = () => {
  // Use the context to get user data
  const { user } = useUser();
  
  // Default image to use if no logo is available
  const defaultImage = "/Admin-img/admin-default.png";
  
  // Function to get the proper image source format
  const getImageSrc = () => {
    if (user.logo) {
      // If logo is a URL, use it directly. If it's base64 data, prefix it.
      return user.logo.startsWith("data:")
        ? user.logo
        : `data:image/jpeg;base64,${user.logo}`;
    }
    return defaultImage;
  };

  return (
    <div className="p-6">
      {/* Header with dynamic organization data */}
      <div className="flex justify-end mb-6">
        <div className="flex items-center">
          <div className="rounded-full h-8 w-8 flex items-center justify-center overflow-hidden">
            <img
              src={getImageSrc()}
              alt="Organization Logo"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.target.src = defaultImage;
              }}
            />
          </div>
          <div className="ml-2">
            <div className="font-bold text-sm">{user.organizationName || "Organization Name"}</div>
            <div className="text-xs text-gray-500">Role: Admin</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Calendar and Charts Section */}
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <div className="flex-1">
          <CalendarComp />
        </div>
        <div className="flex-1">
          <LineChartComp/>
        </div>
      </div>

      {/* Technology Charts */}
      <TechnologyCharts />
    </div>
  );
};

export default Dashboard;