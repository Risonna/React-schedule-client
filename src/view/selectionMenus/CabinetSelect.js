import React from 'react';

const CabinetSelect = ({ cabinets, selectedCabinet, handleCabinetChange }) => {
  return (
    <select value={selectedCabinet} onChange={handleCabinetChange}>
      {cabinets.map((cabinet) => (
        <option key={cabinet.id} value={cabinet.id}>
          {cabinet.cabinetName}
        </option>
      ))}
    </select>
  );
};

export default CabinetSelect;
