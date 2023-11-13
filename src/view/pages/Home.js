import React from 'react';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import './styles/Home.css'
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const userRole = useSelector((state) => state.auth.userRole);

  return (
    <div>
    <div className="home-container" style={{marginBottom: '5%'}}>
      <div className="home-content">
        <h2>Welcome to the Homepage!</h2>
      </div>
      <div className="buttons-container">
        <Link to="/teacherschedule">Teacher Schedule</Link>
        <Link to="/cabinetschedule">Cabinet Schedule</Link>
        <Link to="/departmentschedule">Department Schedule</Link>
        {/* Add more buttons or interactive elements here */}
      </div>
    </div>
    {loggedIn && userRole === 'admin' ? (
        <Dashboard />
      ) : (
        <br/>
      )}
    </div>
  );
};

export default Home;
