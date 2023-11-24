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
import adminTeacherService from '../../businessLogic/services/adminTeacherService';

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
      await adminTeacherService.addTeacher(username);
      setUsername('');
    }
  };

  const handleDeleteUser = async (index) => {
    if (index >= 0 && index < adminsTeachers.length) {
      await adminTeacherService.deleteTeacher(adminsTeachers[index]);
    }
    console.log(index);
  };

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
