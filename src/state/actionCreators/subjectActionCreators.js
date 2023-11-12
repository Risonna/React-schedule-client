// actionCreators/subjectActionCreators.js
import { fetchSubjectsRequest, fetchSubjectsSuccess, fetchSubjectsFailure } from '../actions/subjectActions';

export const fetchSubjects = () => {
  return async (dispatch) => {
    dispatch(fetchSubjectsRequest());
    try {
      const response = await fetch('http://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/api/get-all-info/get-all-subjects');
      const data = await response.json();
      dispatch(fetchSubjectsSuccess(data));
    } catch (error) {
      dispatch(fetchSubjectsFailure(error.message));
    }
  };
};
