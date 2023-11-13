// authActions.js
import { SET_LOGIN_STATUS, SET_USER_ROLE} from '../actions/authActions';
export const setLoginStatus = (status) => ({
    type: SET_LOGIN_STATUS,
    payload: status,
  });
  
  export const setUserRole = (role) => ({
    type: SET_USER_ROLE,
    payload: role,
  });
  