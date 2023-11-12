// reducers/teacherReducer.js
const initialState = {
    data: [],
    loading: false,
    error: null,
  };
  
  const teacherReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_TEACHERS_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_TEACHERS_SUCCESS':
        return { ...state, data: action.payload, loading: false };
      case 'FETCH_TEACHERS_FAILURE':
        return { ...state, error: action.error, loading: false };
      default:
        return state;
    }
  };
  
  export default teacherReducer;
  