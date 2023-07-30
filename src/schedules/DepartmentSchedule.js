import React, { useState, useEffect } from 'react';
import useDataFetching from '../hooks/useDataFetching';
import DepartmentSelect from '../selectionMenus/DepartmentSelect';
import TeacherSelect from '../selectionMenus/TeacherSelect';
import DayOfWeekSelect from '../selectionMenus/dayOfWeekSelect';
import LessonTable from '../tables/LessonTable';
import DepartmentLessonTable from '../tables/DepartmentLessonTable';

const DepartmentSchedule = () => {
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [selectedDayOfWeek, setSelectedDayOfWeek] = useState('ПОНЕДЕЛЬНИК');
    const [viewType, setViewType] = useState('singleTeacher');

    const daysOfWeek = ['ПОНЕДЕЛЬНИК', 'ВТОРНИК', 'СРЕДА', 'ЧЕТВЕРГ', 'ПЯТНИЦА', 'СУББОТА', 'ВОСКРЕСЕНЬЕ', 'ВСЯ НЕДЕЛЯ'];
    const TIME_PERIODS = ['8.00-9.35', '9.45-11.20', '11.45-13.20', '13.30-15.05', '15.30-17.05', '17.15-18.50', '19.00-20.35'];

    // Fetch departments using the custom hook
    const { data: departments, loading: departmentsLoading, error: departmentsError } = useDataFetching(
        'http://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/api/get-all-info/get-all-departments'
    );

    // Fetch teachers using the custom hook with the selected department as a parameter
    const { data: teachers, loading: teachersLoading, error: teachersError } = useDataFetching(
        `http://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/api/get-all-info/get-all-teachers?department=${selectedDepartment}`
    );

    // Fetch subjects using the custom hook
    const { data: subjects, loading: subjectsLoading, error: subjectsError } = useDataFetching(
        'http://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/api/get-all-info/get-all-subjects'
    );

    // Fetch lessons using the custom hook
    const { data: lessons, loading: lessonsLoading, error: lessonsError } = useDataFetching(
        `http://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/api/get-all-info/get-all-lessons?teacherId=${selectedTeacher}`
    );

        // Fetch lessons using the custom hook
        const { data: allLessons, loading: allLessonsLoading, error: allLessonsError } = useDataFetching(
            `http://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/api/get-all-info/get-all-lessons?teacherId=`
        );
        


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
        setSelectedDayOfWeek(event.target.value);
    };
    const handleViewTypeChange = (event) => {
        setViewType(event.target.value);
    };

    useEffect(() => {
        // Fetch teachers whenever selectedDepartment changes
        if(teachers.length >0){
            setSelectedTeacher(null); // Reset selected teacher when department changes
        }
    }, [selectedDepartment]);

    useEffect(() => {
        // Set the selectedDepartment to the first department in the list after fetching departments
        if (departments.length > 0 && !selectedDepartment) {
            setSelectedDepartment(departments[0]);
        }
    }, [departments, selectedDepartment]);


    useEffect(() => {
        setSelectedDepartment(departments[0]);
    }, [departments])

    useEffect(() => {
        // Fetch teachers whenever selectedDepartment changes
        if(teachers.length >0){
            setSelectedTeacher(teachers[0].id); // Reset selected teacher when department changes
        }
    }, [teachers]);
    

    // Wait for all the data to be loaded before rendering the LessonTable
    if (departmentsLoading || teachersLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="schedule-container">
            <h2 style={{textAlignLast: 'center'}}>Department Schedule</h2>
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

            {(selectedTeacher && (viewType =="singleTeacher")) ? (
                <LessonTable selectedDayOfWeek={selectedDayOfWeek} TIME_PERIODS={TIME_PERIODS} lessons={lessons} subjects={subjects} />
            ) : (
                <DepartmentLessonTable
                    selectedDayOfWeek={selectedDayOfWeek}
                    TIME_PERIODS={TIME_PERIODS}
                    lessons={allLessons}
                    subjects={subjects}
                    viewType={viewType}
                    selectedTeacher={selectedTeacher}
                    teachers={teachers}
                />
            )}
        </div>
    );
};

export default DepartmentSchedule;
