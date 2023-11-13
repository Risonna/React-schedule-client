// reducers/teacherReducer.js
const initialState = {
    data: [],
    loading: false,
    error: null,
  };
  
  const lessonReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_LESSONS_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_LESSONS_SUCCESS':
        return { ...state, data: action.payload, loading: false };
      case 'FETCH_LESSONS_FAILURE':
        return { ...state, error: action.error, loading: false };
      default:
        return state;
    }
  };
  
  export default lessonReducer;
  