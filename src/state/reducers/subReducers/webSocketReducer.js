// state/reducers/websocketReducer.js

import { CONNECT_SOCKET, DISCONNECT_SOCKET, RECEIVE_MESSAGE } from '../../actions/webSockets/webSocketActions';

const initialState = {
  connected: false,
  messages: [],
};

const websocketReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_SOCKET:
      return {
        ...state,
        connected: true,
      };

    case DISCONNECT_SOCKET:
      return {
        ...state,
        connected: false,
      };

    case RECEIVE_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    default:
      return state;
  }
};

export default websocketReducer;
