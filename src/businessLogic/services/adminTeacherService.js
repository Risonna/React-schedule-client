// apiService.js

const BASE_URL = 'http://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/api';

const adminTeacherService = {

  addTeacher: async (username) => {
    const jwtToken = localStorage.getItem('token');
    if (jwtToken != null) {
      await fetch(`${BASE_URL}/adminTeacher/addTeacher`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${jwtToken}`,
        },
        body: username,
      });
    }
  },

  deleteTeacher: async (teacherId) => {
    const jwtToken = localStorage.getItem('token');
    if (jwtToken != null) {
      await fetch(`${BASE_URL}/adminTeacher/deleteTeacher/${teacherId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `${jwtToken}`,
        },
      });
    }
  },
};

export default adminTeacherService;