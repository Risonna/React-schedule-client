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
import { fetchLessons } from '../../state/actionCreators/lessonActionCreators';
import { setSelectedTeacher } from '../../state/actionCreators/selectedTeacherActionCreators';
import { setSelectedDayOfWeek } from '../../state/actionCreators/selectedDayOfWeekActionCreators';



const TeacherSchedule = () => {

    const daysOfWeek = ['ПОНЕДЕЛЬНИК', 'ВТОРНИК', 'СРЕДА', 'ЧЕТВЕРГ', 'ПЯТНИЦА', 'СУББОТА', 'ВОСКРЕСЕНЬЕ', 'ВСЯ НЕДЕЛЯ'];

    const TIME_PERIODS = ['8.00-9.35', '9.45-11.20', '11.45-13.20', '13.30-15.05', '15.30-17.05', '17.15-18.50', '19.00-20.35'];


    const dispatch = useDispatch();
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
    };


    useEffect(() => {
        dispatch(fetchTeachers('none'));
        dispatch(fetchSubjects());
        dispatch(fetchCabinets());
        dispatch(fetchLessons('teacher', selectedTeacher));
        
    }, [dispatch]);

    useEffect(() => {
            dispatch(fetchLessons('teacher', selectedTeacher));
    }, [selectedTeacher])




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
