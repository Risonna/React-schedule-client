//lessonActions.js
export const fetchLessonsRequest = () => ({ type: 'FETCH_LESSONS_REQUEST' });
export const fetchLessonsSuccess = (lessons) => ({ type: 'FETCH_LESSONS_SUCCESS', payload: lessons });
export const fetchLessonsFailure = (error) => ({ type: 'FETCH_LESSONS_FAILURE', error });