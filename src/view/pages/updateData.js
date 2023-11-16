// UpdateComponent.jsx

import React from 'react';
import './styles/UpdateData.css';

const UpdateComponent = () => {
  const handleUpdate = (type) => {
    // Add your update logic here based on the button type
    console.log(`Updating ${type}`);
  };

  return (
    <div className="update-container">
      <button className="update-button" onClick={() => handleUpdate('teachers')}>
        Update Teachers
      </button>
      <button className="update-button" onClick={() => handleUpdate('subjects')}>
        Update Subjects
      </button>
      <button className="update-button" onClick={() => handleUpdate('groups')}>
        Update Groups
      </button>
      <button className="update-button" onClick={() => handleUpdate('cabinets')}>
        Update Cabinets
      </button>
    </div>
  );
};

export default UpdateComponent;
