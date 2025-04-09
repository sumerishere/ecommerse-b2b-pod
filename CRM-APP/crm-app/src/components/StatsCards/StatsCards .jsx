const StatsCards = () => {
    const stats = [
      { title: "Total Lead", value: "200", icon: "group", subText: "Total Lead Of Month", color: "purple" },
      { title: "Deal Done", value: "140", icon: "handshake", subText: "Total Deal Of Month", color: "purple" },
      { title: "Open Lead", value: "30", icon: "event", subText: "Open Lead Of Month", color: "purple" },
      { title: "Miss Out", value: "20", icon: "pie_chart", subText: "Miss Out Of Month", color: "purple" },
      { title: "This Month", value: "264", icon: "emoji_events", subText: "Rewards Of Month", color: "purple" }
    ];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white shadow-md hover:shadow-lg rounded-lg shadow-sm p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-gray-500 text-sm mb-1">{stat.title}</h3>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
              <div className={`text-${stat.color}-500`}>
                <span className="material-icons">{stat.icon}</span>
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-auto">{stat.subText}</div>
          </div>
        ))}
      </div>
    );
  };
  
  export default StatsCards;