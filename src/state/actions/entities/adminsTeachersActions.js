//adminsTeachersActions.js
export const fetchAdminsTeachersRequest = () => ({ type: 'FETCH_ADMINS_TEACHERS_REQUEST' });
export const fetchAdminsTeachersSuccess = (AdminsTeachers) => ({ type: 'FETCH_ADMINS_TEACHERS_SUCCESS', payload: AdminsTeachers });
export const fetchAdminsTeachersFailure = (error) => ({ type: 'FETCH_ADMINS_TEACHERS_FAILURE', error });