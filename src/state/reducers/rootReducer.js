// reducers/index.js
import { combineReducers } from 'redux';
import teacherReducer from './subReducers/teacherReducer'; // Create this file later
import subjectReducer from './subReducers/subjectReducer';
import cabinetReducer from './subReducers/cabinetReducer';
import lessonReducer from './subReducers/lessonReducer';
import departmentReducer from './subReducers/departmentReducer';
import selectedTeacherReducer from './subReducers/selectedTeacherReducer';
import selectedDayReducer from './subReducers/selectedDayOfWeekReducer';
import authReducer from './subReducers/authReducer';

const rootReducer = combineReducers({
  teachers: teacherReducer,
  subjects: subjectReducer,
  cabinets: cabinetReducer,
  lessons: lessonReducer,
  departments: departmentReducer,
  selectedTeacher: selectedTeacherReducer,
  selectedDay: selectedDayReducer,
  auth:authReducer,
  // ... add more reducers as needed
});

export default rootReducer;
