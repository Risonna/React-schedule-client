// reducers/teacherReducer.js
const initialState = {
    data: [],
    loading: false,
    error: null,
  };
  
  const cabinetReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_CABINETS_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_CABINETS_SUCCESS':
        return { ...state, data: action.payload, loading: false };
      case 'FETCH_CABINETS_FAILURE':
        return { ...state, error: action.error, loading: false };
      default:
        return state;
    }
  };
  
  export default cabinetReducer;
  