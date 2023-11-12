import React, { useState } from 'react';
import useDataFetching from '../../domain/hooks/useDataFetching';
import TeacherSelect from '../selectionMenus/TeacherSelect'
import DayOfWeekSelect from '../selectionMenus/dayOfWeekSelect';
import LessonTable from '../tables/LessonTable';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeachers } from '../../state/actionCreators/teacherActionCreators';
import { fetchSubjects } from '../../state/actionCreators/subjectActionCreators';
import { fetchCabinets } from '../../state/actionCreators/cabinetActionCreators';



const TeacherSchedule = () => {
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    const daysOfWeek = ['ПОНЕДЕЛЬНИК', 'ВТОРНИК', 'СРЕДА', 'ЧЕТВЕРГ', 'ПЯТНИЦА', 'СУББОТА', 'ВОСКРЕСЕНЬЕ', 'ВСЯ НЕДЕЛЯ'];

    const [selectedDayOfWeek, setSelectedDayOfWeek] = useState(daysOfWeek[0]); // Define selectedDayOfWeek state

    const TIME_PERIODS = ['8.00-9.35', '9.45-11.20', '11.45-13.20', '13.30-15.05', '15.30-17.05', '17.15-18.50', '19.00-20.35'];


    const dispatch = useDispatch();
    
    const teachers = useSelector((state) => state.teachers.data);
    const teachersLoading = useSelector((state) => state.teachers.loading);

    const subjects = useSelector((state) => state.subjects.data);
    const subjectsLoading = useSelector((state) => state.subjects.loading);

    // Fetch lessons using the custom hook
    const { data: lessons, loading: lessonsLoading, error: lessonsError } = useDataFetching(
        `http://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/api/get-all-info/get-all-lessons?teacherId=${selectedTeacher}`
    );

    const cabinets = useSelector((state) => state.cabinets.data);
    const cabinetsLoading = useSelector((state) => state.cabinets.loading);

    const handleTeacherChange = (event) => {
        setSelectedTeacher(event.target.value);
    };

    // Define handleDayOfWeekChange function (not shown in your provided code)
    const handleDayOfWeekChange = (event) => {
        setSelectedDayOfWeek(event.target.value);
    };


    // ... other functions and logic ...
    useEffect(() => {
        dispatch(fetchTeachers());
        dispatch(fetchSubjects());
        dispatch(fetchCabinets());
    }, [dispatch]);




    // Wait for all the data to be loaded before rendering the LessonTable
    if (teachersLoading || subjectsLoading || lessonsLoading || cabinetsLoading) {
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
