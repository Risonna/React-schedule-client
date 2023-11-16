import React from 'react';
import { Link } from 'react-router-dom';
import { FiBook, FiCalendar, FiUsers, FiFileText } from 'react-icons/fi'; // Import icons from react-icons
import './styles/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-cards">
        {/* Card 1 */}
        <div className="dashboard-card">
          <Link to="/parse" className="dashboard-link">
            <FiBook className="dashboard-icon" />
            <h3>Parse excel</h3>
            <p>Upload excel file and get your schedule parsed</p>
          </Link>
        </div>

        {/* Card 2 */}
        <div className="dashboard-card">
          <Link to="/updateData" className="dashboard-link">
            <FiCalendar className="dashboard-icon" />
            <h3>Update Data</h3>
            <p>Manually or automatically update data</p>
          </Link>
        </div>

        {/* Card 3 */}
        <div className="dashboard-card">
          <Link to="/departmentschedule" className="dashboard-link">
            <FiUsers className="dashboard-icon" />
            <h3>Check statistics</h3>
            <p>See statistics for different things related to your schedule</p>
          </Link>
        </div>

        {/* Card 4 */}
        <div className="dashboard-card">
          <Link to="/teacherAdminTable" className="dashboard-link">
            <FiFileText className="dashboard-icon" />
            <h3>Give teachers a role</h3>
            <p>Give selected teachers rights to upload schedule</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
