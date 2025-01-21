import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const barData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 4000 },
  { name: "July", value: 3000 },
  { name: "Aug", value: 2000 },
  { name: "Sep", value: 6000 },
  { name: "Oct", value: 4000 },
  { name: "Nov", value: 3000 },
  { name: "Dec", value: 2000 },
];

const doughnutData = [
  { name: "Sales", value: 400 },
  { name: "Marketing", value: 300 },
  { name: "Support", value: 300 },
];

const pieData = [
  { name: "Electronics", value: 500 },
  { name: "Shoes", value: 300 },
  { name: "Home Equipments", value: 200 },
  { name: "Snacks", value: 200 },
];

const lineData = [
  { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
  { name: "May", uv: 1890, pv: 4800, amt: 2181 },
  { name: "jun", uv: 4000, pv: 2400, amt: 2400 },
  { name: "july", uv: 3000, pv: 1398, amt: 2210 },
  { name: "aug", uv: 2000, pv: 9800, amt: 2290 },
  { name: "sep", uv: 2780, pv: 3908, amt: 2000 },
  { name: "oct", uv: 1890, pv: 4800, amt: 2181 },
  { name: "nov", uv: 4000, pv: 2400, amt: 2400 },
  { name: "dec", uv: 3000, pv: 1398, amt: 2210 },
];

const dummyTableData = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "Electronics" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Shoes" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "Snacks" },
  { id: 4, name: "Alice Williams", email: "alice@example.com", status: "Shoes" },
  { id: 5, name: "Jane Smith", email: "jane@example.com", status: "Home Equip" },
  { id: 6, name: "Bob Johnson", email: "bob@example.com", status: "Office Equip" },
  { id: 7, name: "Alice Williams", email: "alice@example.com", status: "General" },
];

const Dashboard = () => {
  const BLUE_COLORS = ["#3b82f6", "#2563eb", "#1d4ed8", "#1e40af"]; // blue-500 to blue-800

  return (
    <div className="dashboard-root p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Sell</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {/* Bar Chart */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold text- mb-4">
            Bar Chart
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#3b82f6" />
              <YAxis stroke="#3b82f6" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold  mb-4">
            Pie Chart
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#3b82f6"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={BLUE_COLORS[index % BLUE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Doughnut Chart */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">
            Doughnut Chart
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={doughnutData}
                cx="50%"
                cy="50%"
                labelLine={false}
                innerRadius={60}
                outerRadius={80}
                fill="#3b82f6"
                dataKey="value"
              >
                {doughnutData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={BLUE_COLORS[index % BLUE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">
            Line Chart
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#3b82f6" />
              <YAxis stroke="#3b82f6" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#3b82f6"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#2563eb" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="mt-8 bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">
          Customers List
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-blue-50">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Product Category</th>
              </tr>
            </thead>
            <tbody>
              {dummyTableData.map((user) => (
                <tr key={user.id} className="border-b hover:bg-blue-50">
                  <td className="px-6 py-4">{user.id}</td>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : user.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }
                    `}
                    >
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;