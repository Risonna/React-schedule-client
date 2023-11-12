import React from 'react';

const DepartmentSelect = ({ departments, selectedDepartment, handleDepartmentChange }) => {
  return (
    <select value={selectedDepartment} onChange={handleDepartmentChange}>
      {departments.map((department) => (
        <option key={department} value={department}>
          {department}
        </option>
      ))}
    </select>
  );
};

export default DepartmentSelect;
