import React, { useState } from 'react';
import useDataFetching from '../hooks/useDataFetching';
import TeacherSelect from '../selectionMenus/TeacherSelect'
import DayOfWeekSelect from '../selectionMenus/dayOfWeekSelect';
import LessonTable from '../tables/LessonTable';
import { useEffect } from 'react';

const TeacherSchedule = () => {
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    const daysOfWeek = ['ПОНЕДЕЛЬНИК', 'ВТОРНИК', 'СРЕДА', 'ЧЕТВЕРГ', 'ПЯТНИЦА', 'СУББОТА', 'ВОСКРЕСЕНЬЕ', 'ВСЯ НЕДЕЛЯ'];
    const [selectedDayOfWeek, setSelectedDayOfWeek] = useState(daysOfWeek[0]); // Define selectedDayOfWeek state
    const TIME_PERIODS = ['8.00-9.35', '9.45-11.20', '11.45-13.20', '13.30-15.05', '15.30-17.05', '17.15-18.50', '19.00-20.35'];

    // Fetch teachers using the custom hook
    const { data: teachers, loading: teachersLoading, error: teachersError } = useDataFetching(
        'http://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/api/get-all-info/get-all-teachers'
    );


    // Fetch subjects using the custom hook
    const { data: subjects, loading: subjectsLoading, error: subjectsError } = useDataFetching(
        'http://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/api/get-all-info/get-all-subjects'
    );

    // Fetch lessons using the custom hook
    const { data: lessons, loading: lessonsLoading, error: lessonsError } = useDataFetching(
        `http://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/api/get-all-info/get-all-lessons?teacherId=${selectedTeacher}`
    );
    // Fetch departments using the custom hook
    const { data: cabinets, loading: cabinetsLoading, error: cabinetsError } = useDataFetching(
        'http://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/api/get-all-info/get-all-cabinets'
    );

    const handleTeacherChange = (event) => {
        setSelectedTeacher(event.target.value);
    };

    // Define handleDayOfWeekChange function (not shown in your provided code)
    const handleDayOfWeekChange = (event) => {
        setSelectedDayOfWeek(event.target.value);
    };


    // ... other functions and logic ...
    useEffect(() => {
        // Set the selectedTeacher to the first teacher in the list after fetching teachers
        if (teachers.length > 0 && !selectedTeacher) {
            setSelectedTeacher(teachers[0].id);
        }
    }, [teachers, selectedTeacher]);



    // Wait for all the data to be loaded before rendering the LessonTable
    if (teachersLoading || subjectsLoading || lessonsLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="schedule-container">
            <h2>Teacher Schedule</h2>
            <div className="selection-menu-wrapper">
                <TeacherSelect teachers={teachers} selectedTeacher={selectedTeacher} handleTeacherChange={handleTeacherChange} />
                <DayOfWeekSelect daysOfWeek={daysOfWeek} selectedDayOfWeek={selectedDayOfWeek} handleDayOfWeekChange={handleDayOfWeekChange} />
            </div>

            <LessonTable selectedDayOfWeek={selectedDayOfWeek} TIME_PERIODS={TIME_PERIODS} lessons={lessons} subjects={subjects} teachers={teachers} cabinets={cabinets}/>
        </div>
    );
};

export default TeacherSchedule;
