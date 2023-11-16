// actionCreators/adminsTeachersActionCreators.js
import { fetchAdminsTeachersFailure, fetchAdminsTeachersRequest, fetchAdminsTeachersSuccess } from '../../actions/entities/adminsTeachersActions';

export const fetchAdminsTeachers = () => {
  return async (dispatch) => {
    dispatch(fetchAdminsTeachersRequest()); // Call the function here
    try {
      const response = await fetch('http://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/api/get-all-info/get-all-admins-teachers');
      const data = await response.json();
      console.log('API Response:', data);
      dispatch(fetchAdminsTeachersSuccess(data));
    } catch (error) {
      dispatch(fetchAdminsTeachersFailure(error.message));
    }
  };
};

