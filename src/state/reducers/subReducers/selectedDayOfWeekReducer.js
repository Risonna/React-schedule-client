// selectedDayReducer.js
import { SET_SELECTED_DAY } from '../../actions/selectedDayOfWeekActions';

const selectedDayReducer = (state = 'ПОНЕДЕЛЬНИК', action) => {
  switch (action.type) {
    case SET_SELECTED_DAY:
      return action.payload;
    default:
      return state;
  }
};

export default selectedDayReducer;
