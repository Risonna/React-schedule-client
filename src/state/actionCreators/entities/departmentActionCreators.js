// actionCreators/subjectActionCreators.js
import { fetchDepartmentsRequest, fetchDepartmentsSuccess, fetchDepartmentsFailure } from '../../actions/entities/departmentActions';

export const fetchDepartments = () => {
  return async (dispatch) => {
    dispatch(fetchDepartmentsRequest());
    try {
      const response = await fetch('http://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/api/get-all-info/get-all-departments');
      const data = await response.json();
      dispatch(fetchDepartmentsSuccess(data));
    } catch (error) {
      dispatch(fetchDepartmentsFailure(error.message));
    }
  };
};
