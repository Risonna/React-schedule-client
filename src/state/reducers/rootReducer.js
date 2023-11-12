// reducers/index.js
import { combineReducers } from 'redux';
import teacherReducer from './subReducers/teacherReducer'; // Create this file later
import subjectReducer from './subReducers/subjectReducer';
import cabinetReducer from './subReducers/cabinetReducer';

const rootReducer = combineReducers({
  teachers: teacherReducer,
  subjects: subjectReducer,
  cabinets: cabinetReducer,
  // ... add more reducers as needed
});

export default rootReducer;
