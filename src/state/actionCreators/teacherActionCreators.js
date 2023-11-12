// actionCreators/teacherActionCreators.js
import { fetchTeachersRequest, fetchTeachersSuccess, fetchTeachersFailure } from '../actions/teacherActions';

export const fetchTeachers = () => {
  return async (dispatch) => {
    dispatch(fetchTeachersRequest());
    try {
      const response = await fetch('http://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/api/get-all-info/get-all-teachers');
      const data = await response.json();
      dispatch(fetchTeachersSuccess(data));
    } catch (error) {
      dispatch(fetchTeachersFailure(error.message));
    }
  };
};
