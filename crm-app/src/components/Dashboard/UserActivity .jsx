const UserActivity = () => {
    // This would be replaced with actual chart library implementation
    return (
      <div className="bg-white rounded-lg p-4 shadow-sm h-full">
        <h3 className="text-gray-800 font-medium mb-4">User Activity</h3>
        <div className="h-64 w-full bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg overflow-hidden">
          {/* This is a placeholder for the actual chart */}
          <div className="h-full w-full relative">
            <div className="absolute bottom-0 left-0 w-full h-3/4 bg-purple-300 opacity-50 rounded-tl-3xl rounded-tr-3xl">
              {/* Chart area */}
            </div>
            
            {/* Y-axis labels */}
            <div className="absolute top-0 left-0 h-full px-2 flex flex-col justify-between text-xs text-gray-500">
              <span>400K</span>
              <span>300K</span>
              <span>200K</span>
              <span>100K</span>
            </div>
            
            {/* X-axis labels */}
            <div className="absolute bottom-0 left-0 w-full flex justify-between px-4 text-xs text-gray-500">
              <span>J</span>
              <span>F</span>
              <span>M</span>
              <span>A</span>
              <span>M</span>
              <span>J</span>
              <span>J</span>
              <span>A</span>
              <span>S</span>
              <span>O</span>
              <span>N</span>
              <span>D</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default UserActivity;