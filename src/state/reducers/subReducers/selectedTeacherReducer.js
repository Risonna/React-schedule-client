// selectedTeacherReducer.js
import { SET_SELECTED_TEACHER } from '../../actions/selectedTeacherActions';

const selectedTeacherReducer = (state = 1, action) => {
  switch (action.type) {
    case SET_SELECTED_TEACHER:
      return action.payload;
    default:
      return state;
  }
};

export default selectedTeacherReducer;
