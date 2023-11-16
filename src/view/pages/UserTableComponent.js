// UserTableComponent.jsx

import React, { useState, useEffect } from 'react';
import './styles/UserTableComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminsTeachers } from '../../state/actionCreators/entities/adminsTeachersActionCreators';
import {
  startListening,
  disconnectSocket,
  receiveMessage,
  sendMessage,
  connectSocket,
} from '../../state/actionCreators/webSockets/entitySocketActionCreators';

const UserTableComponent = () => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const adminsTeachers = useSelector((state) => state.adminsTeachers.data);
  const { messages } = useSelector((state) => state.websocket);

  // Handle the WebSocket messages
  useEffect(() => {
    if (messages.length > 0) {
      const receivedMessage = messages[messages.length - 1];
      console.log('Message from server:', receivedMessage);
      if (receivedMessage === 'refetchAdminsTeachers') {
        // Dispatch the action to start fetching data
        dispatch(fetchAdminsTeachers());
      }
    }
  }, [messages, dispatch]);

  const handleAddUser = async () => {
    if (username.trim() !== '') {
      // TODO: Call your API to add the user
      // Example API call using fetch:
      // const response = await fetch('/your-api-endpoint', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ username }),
      // });
      // If your API returns updated adminsTeachers, you can dispatch a new fetch
      // dispatch(fetchAdminsTeachers());
      setUsername('');
    }
  };

  const handleDeleteUser = async (index) => {
    // TODO: Call your API to delete the user
    // Example API call using fetch:
    // const response = await fetch('/your-api-endpoint/' + adminsTeachers[index], {
    //   method: 'DELETE',
    // });
    // If your API returns updated adminsTeachers, you can dispatch a new fetch
    // dispatch(fetchAdminsTeachers());
  };

  useEffect(() => {
    // Connect the WebSocket when the component mounts
    dispatch(connectSocket());

    // Start listening for messages
    dispatch(startListening());

    // Fetch data when the component mounts
    dispatch(fetchAdminsTeachers());

    return () => {
      // Disconnect the WebSocket when the component unmounts
      dispatch(disconnectSocket());
    };
  }, [dispatch]);

  return (
    <div className="user-table-container">
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FontAwesomeIcon icon={faPlus} className="icon" onClick={handleAddUser} />
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {adminsTeachers.length !== 0 ? (
            adminsTeachers.map((user, index) => (
              <tr key={index}>
                <td>{user}</td>
                <td>
                  <FontAwesomeIcon icon={faMinus} className="icon" onClick={() => handleDeleteUser(index)} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTableComponent;
