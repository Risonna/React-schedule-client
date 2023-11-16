import React, { useState, useEffect } from 'react';
import DepartmentSelect from '../selectionMenus/DepartmentSelect';
import TeacherSelect from '../selectionMenus/TeacherSelect';
import DayOfWeekSelect from '../selectionMenus/dayOfWeekSelect';
import LessonTable from '../tables/LessonTable';
import DepartmentLessonTable from '../tables/DepartmentLessonTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeachers } from '../../state/actionCreators/entities/teacherActionCreators';
import { fetchSubjects } from '../../state/actionCreators/entities/subjectActionCreators';
import { fetchCabinets } from '../../state/actionCreators/entities/cabinetActionCreators';
import { fetchLessons } from '../../state/actionCreators/entities/lessonActionCreators';
import { fetchDepartments } from '../../state/actionCreators/entities/departmentActionCreators';
import { setSelectedDayOfWeek } from '../../state/actionCreators/selectedDayOfWeekActionCreators';
import {
    startListening,
    disconnectSocket,
    receiveMessage,
    sendMessage,
    connectSocket,
} from '../../state/actionCreators/webSockets/webSocketActionCreators';
import { generatePdf, downloadPdf } from '../../businessLogic/services/pdfService';

const DepartmentSchedule = () => {
    const [selectedDepartment, setSelectedDepartment] = useState('unknown');
    const [selectedTeacher, setSelectedTeacher] = useState(1);
    const [viewType, setViewType] = useState('singleTeacher');
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
                const elementAllTeachersOneDay = document.getElementById('allTeachersOneDay');
                if (elementAllTeachersOneDay) {
                    const htmlContent = '<table class="lessonTable" id="lessonTable">' + elementAllTeachersOneDay.innerHTML + '</table>';
                    console.log('HTML Content:', htmlContent);

                    const receivedTaskId = await generatePdf(htmlContent);
                    setTaskId(receivedTaskId);
                    dispatch(sendMessage(receivedTaskId));
                }
                else {
                    const elementAllTeachersWholeWeek = document.getElementById('allTeachersWholeWeek');
                    if (elementAllTeachersWholeWeek) {
                        const htmlContent = '<table class="lessonTable" id="lessonTable">' + elementAllTeachersWholeWeek.innerHTML + '</table>';
                        console.log('HTML Content:', htmlContent);

                        const receivedTaskId = await generatePdf(htmlContent);
                        setTaskId(receivedTaskId);
                        dispatch(sendMessage(receivedTaskId));
                    }
                    else {
                        console.log('No table found by id');
                    }
                }
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

    const selectedDayOfWeek = useSelector((state) => state.selectedDay);

    const departments = useSelector((state) => state.departments.data);
    const departmentsLoading = useSelector((state) => state.departments.loading);

    const teachers = useSelector((state) => state.teachers.data);
    const teachersLoading = useSelector((state) => state.teachers.loading);

    const subjects = useSelector((state) => state.subjects.data);
    const subjectsLoading = useSelector((state) => state.subjects.loading);

    const lessons = useSelector((state) => state.lessons.data);
    const lessonsLoading = useSelector((state) => state.lessons.loading);

    const cabinets = useSelector((state) => state.cabinets.data);
    const cabinetsLoading = useSelector((state) => state.cabinets.loading);



    const handleDepartmentChange = (event) => {
        const selectedDepartment = event.target.value;
        setSelectedDepartment(selectedDepartment);
        // Reset the selected teacher when the department changes
        setSelectedTeacher(null);
        // Reset the view type to single teacher when the department changes
        setViewType('singleTeacher');
    };

    const handleTeacherChange = (event) => {
        setSelectedTeacher(event.target.value);
    };

    const handleDayOfWeekChange = (event) => {
        dispatch(setSelectedDayOfWeek(event.target.value));
    };
    const handleViewTypeChange = (event) => {
        setViewType(event.target.value);
    };

    useEffect(() => {
        dispatch(fetchLessons('teacher', selectedTeacher));
    }, [selectedTeacher])

    useEffect(() => {
        dispatch(fetchTeachers('department', selectedDepartment));
        if (teachers.length > 0) {
            setSelectedTeacher(teachers[0]); // Reset selected teacher when department changes
        }
    }, [selectedDepartment]);

    useEffect(() => {
        // Fetch teachers whenever selectedDepartment changes
        if (teachers.length > 0) {
            setSelectedTeacher(teachers[0].id); // Reset selected teacher when department changes
        }
    }, [teachers]);

    useEffect(() => {
        if (viewType == 'singleTeacher') {
            dispatch(fetchLessons('teacher', selectedTeacher));
        }
        else {
            dispatch(fetchLessons('none', null));
        }

    }, [viewType])

    useEffect(() => {
        dispatch(fetchSubjects());
        dispatch(fetchTeachers('department', selectedDepartment));
        dispatch(fetchCabinets());
        dispatch(fetchLessons('teacher', selectedTeacher));
        dispatch(fetchDepartments());
    }, [dispatch])


    // Wait for all the data to be loaded before rendering the LessonTable
    if (departmentsLoading || teachersLoading || subjectsLoading || lessonsLoading || cabinetsLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="schedule-container">
            <button onClick={handleGeneratePdf}>Generate PDF</button>
            <h2 style={{ textAlignLast: 'center' }}>Department Schedule</h2>
            <div className="selection-menu-wrapper">
                <DepartmentSelect departments={departments} selectedDepartment={selectedDepartment} handleDepartmentChange={handleDepartmentChange} />
                <TeacherSelect
                    teachers={teachers}
                    selectedTeacher={selectedTeacher}
                    handleTeacherChange={handleTeacherChange}
                    showAllTeachersOption={true} // Enable the "Show All Teachers" option
                />
                <DayOfWeekSelect daysOfWeek={daysOfWeek} selectedDayOfWeek={selectedDayOfWeek} handleDayOfWeekChange={handleDayOfWeekChange} />
                <div>
                    <label>
                        View Type:
                        <select value={viewType} onChange={(e) => {
                            setViewType(e.target.value)
                        }}>
                            <option value="singleTeacher">Single Teacher</option>
                            <option value="allTeachers">All Teachers</option>
                        </select>
                    </label>
                </div>
            </div>

            {(selectedTeacher && (viewType == "singleTeacher")) ? (
                <LessonTable selectedDayOfWeek={selectedDayOfWeek} TIME_PERIODS={TIME_PERIODS} lessons={lessons} subjects={subjects} teachers={teachers} cabinets={cabinets} />
            ) : (
                <DepartmentLessonTable
                    selectedDayOfWeek={selectedDayOfWeek}
                    TIME_PERIODS={TIME_PERIODS}
                    lessons={lessons}
                    subjects={subjects}
                    viewType={viewType}
                    selectedTeacher={selectedTeacher}
                    teachers={teachers}
                    cabinets={cabinets}
                />
            )}
        </div>
    );
};

export default DepartmentSchedule;