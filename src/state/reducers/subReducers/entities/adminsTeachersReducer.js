// reducers/adminsTeachersReducer.js
const initialState = {
  data: [], // Change this to data: {}
  loading: false,
  error: null,
};

const adminsTeachersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ADMINS_TEACHERS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_ADMINS_TEACHERS_SUCCESS':
      return { ...state, data: action.payload, loading: false };
    case 'FETCH_ADMINS_TEACHERS_FAILURE':
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
};

export default adminsTeachersReducer;
