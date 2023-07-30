import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import TeacherSchedule from './schedules/TeacherSchedule'; // Import the TeacherSchedule component here
import CabinetSchedule from './schedules/CabinetSchedule';
import DepartmentSchedule from './schedules/DepartmentSchedule';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/teacherschedule" element={<TeacherSchedule />} /> {/* Add this line */}
          <Route path="/cabinetschedule" element={<CabinetSchedule />} /> {/* Add this line */}
          <Route path="departmentschedule" element={<DepartmentSchedule/>}/> {/* Add this line*/}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
