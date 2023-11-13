// authReducer.js

import { SET_LOGIN_STATUS, SET_USER_ROLE } from '../../actions/authActions';

const initialState = {
  loggedIn: false,
  userRole: 'guest',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_STATUS:
      return {
        ...state,
        loggedIn: action.payload,
      };

    case SET_USER_ROLE:
      return {
        ...state,
        userRole: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
