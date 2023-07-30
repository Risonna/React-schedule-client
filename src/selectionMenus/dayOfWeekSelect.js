import React from 'react';

const DayOfWeekSelect = ({ daysOfWeek, selectedDayOfWeek, handleDayOfWeekChange }) => {
  return (
    <select value={selectedDayOfWeek} onChange={handleDayOfWeekChange}>
      {daysOfWeek.map((day) => (
        <option key={day} value={day}>
          {day}
        </option>
      ))}
    </select>
  );
};

export default DayOfWeekSelect;
