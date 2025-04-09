import StatsCards from '../StatsCards/StatsCards ';
import Calendarr from '../Dashboard/Calendar';
// import UserActivity from '../Dashboard/UserActivity ';
import TechnologyCharts from '../Dashboard/TechnologyCharts ';
import LineChartComp from "../Dashboard/LineChart";

const Dashboard = () => {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-end mb-6">
        <div className="flex items-center">
          <div className="rounded-full bg-purple-500 h-8 w-8 flex items-center justify-center text-white">
            TS
          </div>
          <div className="ml-2">
            <div className="font-bold text-sm">TESTING SHASTRA</div>
            <div className="text-xs text-gray-500">Role: Admin</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Calendar and Charts Section */}
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <div className="flex-1">
          <Calendarr />
        </div>
        <div className="flex-1">
          {/* <UserActivity /> */}
          <LineChartComp/>
        </div>
      </div>

      {/* Technology Charts */}
      <TechnologyCharts />
    </div>
  );
};

export default Dashboard;
