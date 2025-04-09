const TechnologyCharts = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        {/* Stack Distribution Chart */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="h-48 flex items-center justify-center">
            {/* Placeholder for donut chart */}
            <div className="relative w-32 h-32">
              <div className="w-full h-full rounded-full border-8 border-purple-300"></div>
              <div className="absolute top-0 left-0 w-1/2 h-full border-t-8 border-l-8 border-gray-600 rounded-tl-full rounded-bl-full"></div>
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 border-b-8 border-r-8 border-gray-400 rounded-br-full"></div>
            </div>
            
            {/* Legend */}
            <div className="ml-6">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full bg-gray-600 mr-2"></div>
                <span className="text-xs">Java fullstack</span>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full bg-purple-300 mr-2"></div>
                <span className="text-xs">MERN</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                <span className="text-xs">Stack</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Outreach Chart */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="h-48 flex items-center justify-center">
            {/* Placeholder for pie chart */}
            <div className="relative w-32 h-32">
              <div className="w-full h-full rounded-full bg-purple-200"></div>
              <div className="absolute top-0 left-0 w-full h-full border-purple-500 border-8 rounded-full" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 50%)' }}></div>
              <div className="absolute top-0 left-0 w-full h-full border-gray-600 border-8 rounded-full" style={{ clipPath: 'polygon(50% 50%, 0 0, 50% 0, 100% 0, 100% 50%)' }}></div>
            </div>
            
            {/* Legend */}
            <div className="ml-6">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full bg-gray-600 mr-2"></div>
                <span className="text-xs">Out</span>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-xs">cold</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-300 mr-2"></div>
                <span className="text-xs">Hot</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default TechnologyCharts;