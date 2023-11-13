//lessonActions.js
export const fetchLessonsRequest = () => ({ type: 'FETCH_LESSONS_REQUEST' });
export const fetchLessonsSuccess = (cabinets) => ({ type: 'FETCH_LESSONS_SUCCESS', payload: cabinets });
export const fetchLessonsFailure = (error) => ({ type: 'FETCH_LESSONS_FAILURE', error });