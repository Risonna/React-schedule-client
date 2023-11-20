//webSocketActionCreators.js
import { CONNECT_SOCKET, DISCONNECT_SOCKET, RECEIVE_MESSAGE } from '../../actions/webSockets/webSocketActions';

// Create the socket instance
var socket;

export const connectSocket = (taskId) => (dispatch) => {
  // Dispatch the action
  dispatch({ type: CONNECT_SOCKET });
  socket = new WebSocket(`ws://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/websocket/pdf/${taskId}`);
  console.log('Opened connection ' + taskId);
};

export const disconnectSocket = () => (dispatch) => {
  // Dispatch the action
  dispatch({ type: DISCONNECT_SOCKET });

  // Add event listeners
  socket.addEventListener('close', () => {
    console.log('Closed connection');
    // Dispatch the action when disconnected
    dispatch(disconnectSocket());
  });

  console.log('Closed connection');
  // Disconnect the socket
  socket.close();

};

export const receiveMessage = (message) => (dispatch) => {
  // Dispatch the action with the received message
  dispatch({ type: RECEIVE_MESSAGE, payload: message });

};

export const sendMessage = (message) => () => {
  // Emit the message to the server
  socket.send(message);

};

export const startListening = () => (dispatch) => {
  console.log('started listening to websocket');
  // Add event listeners
  socket.addEventListener('message', (event) => {
    // Dispatch the action with the received message
    dispatch(receiveMessage(event.data));
  });

  // Additional logic if needed
};
