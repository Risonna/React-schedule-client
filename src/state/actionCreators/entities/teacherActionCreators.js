// actionCreators/teacherActionCreators.js
import { fetchTeachersRequest, fetchTeachersSuccess, fetchTeachersFailure } from '../../actions/entities/teacherActions';

export const fetchTeachers = (entity, entityId) => {
  return async (dispatch) => {
    dispatch(fetchTeachersRequest());
    if(entity == 'none'){
      try {
        const response = await fetch(`http://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/api/get-all-info/get-all-teachers`);
        const data = await response.json();
        dispatch(fetchTeachersSuccess(data));
      } catch (error) {
        dispatch(fetchTeachersFailure(error.message));
      }
    }
    else{
      try {
        const response = await fetch(`http://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/api/get-all-info/get-all-teachers?department=${entityId}`);
        const data = await response.json();
        console.log(entityId);
        dispatch(fetchTeachersSuccess(data));
      } catch (error) {
        dispatch(fetchTeachersFailure(error.message));
      }
    }
  };
};
