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
          <Link to="/teacherschedule" className="dashboard-link">
            <FiBook className="dashboard-icon" />
            <h3>Teacher Schedule</h3>
            <p>View and manage teacher schedules</p>
          </Link>
        </div>

        {/* Card 2 */}
        <div className="dashboard-card">
          <Link to="/cabinetschedule" className="dashboard-link">
            <FiCalendar className="dashboard-icon" />
            <h3>Cabinet Schedule</h3>
            <p>View and manage cabinet schedules</p>
          </Link>
        </div>

        {/* Card 3 */}
        <div className="dashboard-card">
          <Link to="/departmentschedule" className="dashboard-link">
            <FiUsers className="dashboard-icon" />
            <h3>Department Schedule</h3>
            <p>View and manage department schedules</p>
          </Link>
        </div>

        {/* Card 4 */}
        <div className="dashboard-card">
          <Link to="/registerActually" className="dashboard-link">
            <FiFileText className="dashboard-icon" />
            <h3>Check Register</h3>
            <p>Check attendance and registration</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
