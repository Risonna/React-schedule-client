// PdfGenerator.js

import React, { useState, useEffect } from 'react';
import TeacherSchedule from '../view/schedules/TeacherSchedule';
import { useDispatch, useSelector } from 'react-redux';
import {
  startListening,
  disconnectSocket,
  receiveMessage,
  sendMessage,
  connectSocket,
} from '../state/actionCreators/webSockets/webSocketActionCreators';
import { generatePdf, downloadPdf } from '../businessLogic/services/pdfService';

function PdfGenerator() {
  const [taskId, setTaskId] = useState(null);

  const dispatch = useDispatch();
  const { connected, messages } = useSelector((state) => state.websocket);

  useEffect(() => {
    // Start listening to socket events when the component mounts
    dispatch(startListening());

    // Cleanup function
    return () => {
      // Disconnect the socket when the component unmounts
      dispatch(disconnectSocket());
    };
  }, [dispatch]);

  // Function to trigger the RESTful service and handle the response
  const handleGeneratePdf = async () => {
    try {
      const element = document.getElementById('lessonTable');
      if (element) {
        const htmlContent = '<table class="lessonTable" id="lessonTable">' + element.innerHTML + '</table>';
        console.log('HTML Content:', htmlContent);

        const receivedTaskId = await generatePdf(htmlContent);
        setTaskId(receivedTaskId);
        dispatch(sendMessage(receivedTaskId));
      } else {
        console.log('No lesson-table');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handle the WebSocket messages
  useEffect(() => {
    if (messages.length > 0) {
      const receivedMessage = messages[messages.length - 1];
      console.log('Message from server:', receivedMessage);
      if (receivedMessage === taskId) {
        downloadPdf(taskId);
      }
    }
  }, [messages, taskId]);

  return (
    <div>
      <button onClick={handleGeneratePdf}>Generate PDF</button>
      <TeacherSchedule />
    </div>
  );
}

export default PdfGenerator;
