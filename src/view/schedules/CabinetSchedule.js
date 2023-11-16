import React, { useState, useEffect } from 'react';
import CabinetSelect from '../selectionMenus/CabinetSelect';
import DayOfWeekSelect from '../selectionMenus/dayOfWeekSelect';
import LessonTable from '../tables/LessonTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeachers } from '../../state/actionCreators/entities/teacherActionCreators';
import { fetchSubjects } from '../../state/actionCreators/entities/subjectActionCreators';
import { fetchCabinets } from '../../state/actionCreators/entities/cabinetActionCreators';
import { fetchLessons } from '../../state/actionCreators/entities/lessonActionCreators';
import { setSelectedDayOfWeek } from '../../state/actionCreators/selectedDayOfWeekActionCreators';
import {
  startListening,
  disconnectSocket,
  receiveMessage,
  sendMessage,
  connectSocket,
} from '../../state/actionCreators/webSockets/webSocketActionCreators';
import { generatePdf, downloadPdf } from '../../businessLogic/services/pdfService';

const CabinetSchedule = () => {
  const [selectedCabinet, setSelectedCabinet] = useState(1);
  const [taskId, setTaskId] = useState(null);

  const daysOfWeek = ['ПОНЕДЕЛЬНИК', 'ВТОРНИК', 'СРЕДА', 'ЧЕТВЕРГ', 'ПЯТНИЦА', 'СУББОТА', 'ВОСКРЕСЕНЬЕ', 'ВСЯ НЕДЕЛЯ'];
  const TIME_PERIODS = ['8.00-9.35', '9.45-11.20', '11.45-13.20', '13.30-15.05', '15.30-17.05', '17.15-18.50', '19.00-20.35'];

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

  const selectedDayOfWeek = useSelector((state) => state.selectedDay);

  const cabinets = useSelector((state) => state.cabinets.data);
  const cabinetsLoading = useSelector((state) => state.cabinets.loading);

  const subjects = useSelector((state) => state.subjects.data);
  const subjectsLoading = useSelector((state) => state.subjects.loading);

  const lessons = useSelector((state) => state.lessons.data);
  const lessonsLoading = useSelector((state) => state.lessons.loading);

  const teachers = useSelector((state) => state.teachers.data);
  const teachersLoading = useSelector((state) => state.teachers.loading);

  const handleCabinetChange = (event) => {
    setSelectedCabinet(event.target.value);
  };

  const handleDayOfWeekChange = (event) => {
    dispatch(setSelectedDayOfWeek(event.target.value));
  };

  useEffect(() => {
    dispatch(fetchTeachers('none'));
    dispatch(fetchSubjects());
    dispatch(fetchCabinets());
    dispatch(fetchLessons('cabinet', selectedCabinet));

  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchLessons('cabinet', selectedCabinet));
  }, [selectedCabinet])

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

  // Wait for all the data to be loaded before rendering the LessonTable
  if (cabinetsLoading || subjectsLoading || lessonsLoading || teachersLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="schedule-container">
      <button onClick={handleGeneratePdf}>Generate PDF</button>
      <h2>Cabinet Schedule</h2>
      <div className="selection-menu-wrapper">
        <CabinetSelect cabinets={cabinets} selectedCabinet={selectedCabinet} handleCabinetChange={handleCabinetChange} />
        <DayOfWeekSelect daysOfWeek={daysOfWeek} selectedDayOfWeek={selectedDayOfWeek} handleDayOfWeekChange={handleDayOfWeekChange} />
      </div>
      <LessonTable selectedDayOfWeek={selectedDayOfWeek} TIME_PERIODS={TIME_PERIODS} lessons={lessons} subjects={subjects} teachers={teachers} cabinets={cabinets} />
    </div>
  );
};

export default CabinetSchedule;
