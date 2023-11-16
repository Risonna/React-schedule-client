// actions/teacherActions.js
export const fetchTeachersRequest = () => ({ type: 'FETCH_TEACHERS_REQUEST' });
export const fetchTeachersSuccess = (teachers) => ({ type: 'FETCH_TEACHERS_SUCCESS', payload: teachers });
export const fetchTeachersFailure = (error) => ({ type: 'FETCH_TEACHERS_FAILURE', error });