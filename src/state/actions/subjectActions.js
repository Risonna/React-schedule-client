//subjectActions.js
export const fetchSubjectsRequest = () => ({ type: 'FETCH_SUBJECTS_REQUEST' });
export const fetchSubjectsSuccess = (subjects) => ({ type: 'FETCH_SUBJECTS_SUCCESS', payload: subjects });
export const fetchSubjectsFailure = (error) => ({ type: 'FETCH_SUBJECTS_FAILURE', error });