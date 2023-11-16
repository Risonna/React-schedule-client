//departmentActions.js
export const fetchDepartmentsRequest = () => ({ type: 'FETCH_DEPARTMENTS_REQUEST' });
export const fetchDepartmentsSuccess = (departments) => ({ type: 'FETCH_DEPARTMENTS_SUCCESS', payload: departments });
export const fetchDepartmentsFailure = (error) => ({ type: 'FETCH_DEPARTMENTS_FAILURE', error });