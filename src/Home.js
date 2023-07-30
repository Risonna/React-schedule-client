import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h2>Welcome to the Homepage!</h2>
      </div>
      <div className="buttons-container">
        <Link to="/groupschedule">Group Schedule</Link>
        <Link to="/teacherschedule">Teacher Schedule</Link>
        <Link to="/cabinetschedule">Cabinet Schedule</Link>
        <Link to="/departmentschedule">Department Schedule</Link>
        {/* Add more buttons or interactive elements here */}
      </div>
    </div>
  );
};

export default Home;
