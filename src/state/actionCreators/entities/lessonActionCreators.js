// actionCreators/lessonActionCreators.js
import { fetchLessonsRequest, fetchLessonsSuccess, fetchLessonsFailure } from '../../actions/entities/lessonActions';

export const fetchLessons = (entity, selectedEntity) => {
  return async (dispatch) => {
    dispatch(fetchLessonsRequest());
    if(entity == 'none'){
        try {
            const response = await fetch(`http://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/api/get-all-info/get-all-lessons`);
            const data = await response.json();
            dispatch(fetchLessonsSuccess(data));
          } catch (error) {
            dispatch(fetchLessonsFailure(error.message));
          }
    }
    else if(entity == 'teacher'){
        try {
            const response = await fetch(`http://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/api/get-all-info/get-all-lessons?teacherId=${selectedEntity}`);
            const data = await response.json();
            dispatch(fetchLessonsSuccess(data));
          } catch (error) {
            dispatch(fetchLessonsFailure(error.message));
          }
    }
    else if(entity == 'cabinet'){
        try {
            const response = await fetch(`http://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/api/get-all-info/get-all-lessons?cabinetId=${selectedEntity}`);
            const data = await response.json();
            dispatch(fetchLessonsSuccess(data));
          } catch (error) {
            dispatch(fetchLessonsFailure(error.message));
          }
    }
  };
};
