import { useState } from 'react';

const Calendar = () => {
  // State for current date
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeDay, setActiveDay] = useState(new Date().getDate());
  
  // Days of the week
  const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  
  // Get current month and year
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();
  
  // Function to get calendar days for current month
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Day of the week of the first day (0 = Sunday, 1 = Monday, etc.)
    // Convert to our format where Monday is 0
    let firstDayIndex = firstDay.getDay() - 1;
    if (firstDayIndex < 0) firstDayIndex = 6; // If Sunday (0-1=-1), set to 6
    
    // Total days in the month
    const daysInMonth = lastDay.getDate();
    
    // Days from previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    
    // Days from next month
    const nextMonthDays = 42 - (firstDayIndex + daysInMonth); // 42 = 6 rows * 7 days
    
    const days = [];
    let dayRow = [];
    
    // Previous month days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      dayRow.push({
        day: prevMonthLastDay - i,
        currentMonth: false
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      dayRow.push({
        day: i,
        currentMonth: true,
        isToday: i === new Date().getDate() && 
                 month === new Date().getMonth() && 
                 year === new Date().getFullYear()
      });
      
      // Create new row after 7 days
      if (dayRow.length === 7) {
        days.push(dayRow);
        dayRow = [];
      }
    }
    
    // Next month days
    for (let i = 1; i <= nextMonthDays; i++) {
      dayRow.push({
        day: i,
        currentMonth: false
      });
      
      // Create new row after 7 days
      if (dayRow.length === 7) {
        days.push(dayRow);
        dayRow = [];
      }
    }
    
    // Add any remaining days as a final row
    if (dayRow.length > 0) {
      while (dayRow.length < 7) {
        dayRow.push({
          day: dayRow.length + 1,
          currentMonth: false
        });
      }
      days.push(dayRow);
    }
    
    return days;
  };
  
  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  // Handle date click
  const handleDayClick = (day) => {
    if (day.currentMonth) {
      setActiveDay(day.day);
    }
  };
  
  // Get calendar days whenever currentDate changes
  const calendarDays = getCalendarDays();
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{`${currentMonth} ${currentYear}`}</h2>
        <div className="flex">
          <button 
            className="text-gray-500 p-1 hover:bg-gray-100 rounded-full"
            onClick={prevMonth}
          >
            <span className="material-icons">chevron_left</span>
          </button>
          <button 
            className="text-gray-500 p-1 hover:bg-gray-100 rounded-full"
            onClick={nextMonth}
          >
            <span className="material-icons">chevron_right</span>
          </button>
        </div>
      </div>
      
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 mb-2">
        {weekDays.map((day, index) => (
          <div key={index} className="text-center py-2 text-sm font-medium">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      {calendarDays.map((week, weekIndex) => (
        <div key={weekIndex} className="grid grid-cols-7">
          {week.map((day, dayIndex) => (
            <div 
              key={dayIndex} 
              className={`
                text-center py-3 border border-gray-100 cursor-pointer hover:bg-gray-50
                ${day.currentMonth ? '' : 'text-gray-300'}
                ${day.currentMonth && day.day === activeDay ? 'bg-purple-500 text-white hover:bg-purple-600' : ''}
                ${day.isToday && day.day !== activeDay ? 'border-2 border-purple-300' : ''}
              `}
              onClick={() => handleDayClick(day)}
            >
              {day.day}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Calendar;