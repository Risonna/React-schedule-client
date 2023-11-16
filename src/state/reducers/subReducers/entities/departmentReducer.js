// reducers/teacherReducer.js
const initialState = {
    data: [],
    loading: false,
    error: null,
  };
  
  const departmentReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_DEPARTMENTS_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_DEPARTMENTS_SUCCESS':
        return { ...state, data: action.payload, loading: false };
      case 'FETCH_DEPARTMENTS_FAILURE':
        return { ...state, error: action.error, loading: false };
      default:
        return state;
    }
  };
  
  export default departmentReducer;
  