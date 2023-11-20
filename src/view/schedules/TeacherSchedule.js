import React, { useState } from 'react';
import TeacherSelect from '../selectionMenus/TeacherSelect'
import DayOfWeekSelect from '../selectionMenus/dayOfWeekSelect';
import LessonTable from '../tables/LessonTable';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeachers } from '../../state/actionCreators/entities/teacherActionCreators';
import { fetchSubjects } from '../../state/actionCreators/entities/subjectActionCreators';
import { fetchCabinets } from '../../state/actionCreators/entities/cabinetActionCreators';
import { fetchLessons } from '../../state/actionCreators/entities/lessonActionCreators';
import { setSelectedTeacher } from '../../state/actionCreators/selectedTeacherActionCreators';
import { setSelectedDayOfWeek } from '../../state/actionCreators/selectedDayOfWeekActionCreators';
import {
    startListening,
    disconnectSocket,
    receiveMessage,
    sendMessage,
    connectSocket,
} from '../../state/actionCreators/webSockets/webSocketActionCreators';
import { generatePdf, downloadPdf } from '../../businessLogic/services/pdfService';
import { generateUUID } from '../../businessLogic/uuid';



const TeacherSchedule = () => {

    const daysOfWeek = ['ПОНЕДЕЛЬНИК', 'ВТОРНИК', 'СРЕДА', 'ЧЕТВЕРГ', 'ПЯТНИЦА', 'СУББОТА', 'ВОСКРЕСЕНЬЕ', 'ВСЯ НЕДЕЛЯ'];

    const TIME_PERIODS = ['8.00-9.35', '9.45-11.20', '11.45-13.20', '13.30-15.05', '15.30-17.05', '17.15-18.50', '19.00-20.35'];
    const [taskId, setTaskId] = useState(generateUUID());


    const dispatch = useDispatch();

    const {connected, messages } = useSelector((state) => state.websocket);

    useEffect(() => {

        // Cleanup function
        return () => {
            // Disconnect the socket when the component unmounts
            if(connected){
            dispatch(disconnectSocket());
            }
            setTaskId(null);
        };
    }, [dispatch]);

    const handleGeneratePdf = async () => {
        try {
            dispatch(connectSocket(taskId));
            // Start listening to socket events when the component mounts
            dispatch(startListening());
            
            const element = document.getElementById('lessonTable');
            if (element) {
                const htmlContent = '<table class="lessonTable" id="lessonTable">' + element.innerHTML + '</table>';
                console.log('HTML Content:', htmlContent);

                await generatePdf(htmlContent, taskId);
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
            if(receivedMessage === 'refetchLessons'){
                dispatch(fetchLessons('teacher', selectedTeacher));
            }
            else if(receivedMessage === 'refetchTeachers'){
                dispatch(fetchTeachers('none'));
            }
            else if(receivedMessage === 'refetchCabinets'){
                dispatch(fetchCabinets());
            }
            else if(receivedMessage === 'refetchSubjects'){
                dispatch(fetchSubjects());
            }
        }
    }, [messages, taskId]);

    const selectedDayOfWeek = useSelector((state) => state.selectedDay);

    const selectedTeacher = useSelector((state) => state.selectedTeacher);

    const teachers = useSelector((state) => state.teachers.data);
    const teachersLoading = useSelector((state) => state.teachers.loading);

    const subjects = useSelector((state) => state.subjects.data);
    const subjectsLoading = useSelector((state) => state.subjects.loading);

    const lessons = useSelector((state) => state.lessons.data);
    const lessonsLoading = useSelector((state) => state.lessons.loading);

    const cabinets = useSelector((state) => state.cabinets.data);
    const cabinetsLoading = useSelector((state) => state.cabinets.loading);

    const handleTeacherChange = (event) => {
        dispatch(setSelectedTeacher(event.target.value));
    };

    // Define handleDayOfWeekChange function (not shown in your provided code)
    const handleDayOfWeekChange = (event) => {
        dispatch(setSelectedDayOfWeek(event.target.value));
        setTaskId(generateUUID());
    };


    useEffect(() => {
        dispatch(fetchTeachers('none'));
        dispatch(fetchSubjects());
        dispatch(fetchCabinets());
        dispatch(fetchLessons('teacher', selectedTeacher));

    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchLessons('teacher', selectedTeacher));
        setTaskId(generateUUID());
    }, [selectedTeacher])




    // Wait for all the data to be loaded before rendering the LessonTable
    if (teachersLoading || subjectsLoading || lessonsLoading || cabinetsLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="schedule-container">
            <button onClick={handleGeneratePdf}>Generate PDF</button>
            <h2>Teacher Schedule</h2>
            <div className="selection-menu-wrapper">
                <TeacherSelect teachers={teachers} selectedTeacher={selectedTeacher} handleTeacherChange={handleTeacherChange} />
                <DayOfWeekSelect daysOfWeek={daysOfWeek} selectedDayOfWeek={selectedDayOfWeek} handleDayOfWeekChange={handleDayOfWeekChange} />
            </div>

            <LessonTable selectedDayOfWeek={selectedDayOfWeek} TIME_PERIODS={TIME_PERIODS} lessons={lessons} subjects={subjects} teachers={teachers} cabinets={cabinets} />
        </div>
    );
};

export default TeacherSchedule;
