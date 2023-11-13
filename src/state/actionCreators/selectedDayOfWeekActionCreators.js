// actions.js
import { SET_SELECTED_DAY} from '../actions/selectedDayOfWeekActions';

export const setSelectedDayOfWeek = (day) => ({
  type: SET_SELECTED_DAY,
  payload: day,
});