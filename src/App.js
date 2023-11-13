import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './view/templates/Header';
import Home from './view/pages/Home';
import Login from './view/pages/Login';
import Register from './view/pages/Register';
import TeacherSchedule from './view/schedules/TeacherSchedule'; // Import the TeacherSchedule component here
import CabinetSchedule from './view/schedules/CabinetSchedule';
import DepartmentSchedule from './view/schedules/DepartmentSchedule';
import CheckRegister from './WIP/Check';
import CheckLogin from './WIP/CheckLogin';
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import Dashboard from './view/pages/Dashboard';
import PdfGenerator from './WIP/PdfGenerator';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginStatus, setUserRole } from './state/actionCreators/authActionCreators';

const App = () => {

  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const userRole = useSelector((state) => state.auth.userRole);

  useEffect(() => {
    // Check if a token is present in local storage on page load
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;
      dispatch(setUserRole((role)));
      dispatch(setLoginStatus(true));
    }
    else{
      dispatch(setLoginStatus(false));
      dispatch(setUserRole(('guest')));
    }
  }, []);

  const handleLoginSuccess = (role) => {
    dispatch(setLoginStatus(true));
    dispatch(setUserRole((role)));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(setUserRole(('guest')));
    dispatch(setLoginStatus(false));
  };

   // Show loading state if logged-in state is still null
   if (loggedIn === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div> 
      <Header onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/teacherschedule" element={<TeacherSchedule />} /> {/* Add this line */}
          <Route path="/cabinetschedule" element={<CabinetSchedule />} /> {/* Add this line */}
          <Route path="departmentschedule" element={<DepartmentSchedule/>}/> {/* Add this line*/}
          <Route path="/registerActually" element={<CheckRegister/>}/> {/*Add this line */}
          <Route path="/checkLogin" element={<CheckLogin/>}/> {/*Add this line */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* Add this line */}
          <Route path="/generatePdf" element={<PdfGenerator />} /> {/* Add this line */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
