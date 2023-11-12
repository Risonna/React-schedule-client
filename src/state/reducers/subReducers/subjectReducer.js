// reducers/teacherReducer.js
const initialState = {
    data: [],
    loading: false,
    error: null,
  };
  
  const subjectReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_SUBJECTS_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUBJECTS_SUCCESS':
        return { ...state, data: action.payload, loading: false };
      case 'FETCH_SUBJECTS_FAILURE':
        return { ...state, error: action.error, loading: false };
      default:
        return state;
    }
  };
  
  export default subjectReducer;
  