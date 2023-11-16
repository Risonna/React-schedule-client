// reducers/rootReducer.js
import { combineReducers } from 'redux';
import teacherReducer from './subReducers/entities/teacherReducer'; // Create this file later
import subjectReducer from './subReducers/entities/subjectReducer';
import cabinetReducer from './subReducers/entities/cabinetReducer';
import lessonReducer from './subReducers/entities/lessonReducer';
import departmentReducer from './subReducers/entities/departmentReducer';
import selectedTeacherReducer from './subReducers/selectedTeacherReducer';
import selectedDayReducer from './subReducers/selectedDayOfWeekReducer';
import authReducer from './subReducers/authReducer';
import websocketReducer from './subReducers/webSocketReducer';
import adminsTeachersReducer from './subReducers/entities/adminsTeachersReducer';

const rootReducer = combineReducers({
  teachers: teacherReducer,
  subjects: subjectReducer,
  cabinets: cabinetReducer,
  lessons: lessonReducer,
  departments: departmentReducer,
  selectedTeacher: selectedTeacherReducer,
  selectedDay: selectedDayReducer,
  auth:authReducer,
  websocket:websocketReducer,
  adminsTeachers:adminsTeachersReducer,
  // ... add more reducers as needed
});

export default rootReducer;
