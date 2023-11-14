// ExcelUploadComponent.jsx

import React, { useState } from 'react';
import './styles/ExcelUploadComponent.css';

const ExcelUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    // Add your logic for handling the uploaded Excel file
    if (selectedFile) {
      console.log('File uploaded:', selectedFile);
      // Add your logic to process the uploaded file here
    } else {
      console.error('No file selected.');
    }
  };

  return (
    <div className="excel-upload-container">
      <label htmlFor="file-upload" className="file-upload-label">
        <span className="upload-icon">📂</span> Choose Excel File
      </label>
      <input
        type="file"
        id="file-upload"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="file-input"
      />
      <button onClick={handleUpload} className="upload-button">
        Upload
      </button>
    </div>
  );
};

export default ExcelUploadComponent;
