// actionCreators/subjectActionCreators.js
import { fetchCabinetsRequest, fetchCabinetsSuccess, fetchCabinetsFailure } from '../actions/cabinetActions';

export const fetchCabinets = () => {
  return async (dispatch) => {
    dispatch(fetchCabinetsRequest());
    try {
      const response = await fetch('http://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/api/get-all-info/get-all-cabinets');
      const data = await response.json();
      dispatch(fetchCabinetsSuccess(data));
    } catch (error) {
      dispatch(fetchCabinetsFailure(error.message));
    }
  };
};
