import React, { useState, useEffect } from 'react';
import useDataFetching from '../../domain/hooks/useDataFetching';
import CabinetSelect from '../selectionMenus/CabinetSelect';
import DayOfWeekSelect from '../selectionMenus/dayOfWeekSelect';
import LessonTable from '../tables/LessonTable';

const CabinetSchedule = () => {
  const [selectedCabinet, setSelectedCabinet] = useState(null);

  const daysOfWeek = ['ПОНЕДЕЛЬНИК', 'ВТОРНИК', 'СРЕДА', 'ЧЕТВЕРГ', 'ПЯТНИЦА', 'СУББОТА', 'ВОСКРЕСЕНЬЕ', 'ВСЯ НЕДЕЛЯ'];
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState(daysOfWeek[0]);
  const TIME_PERIODS = ['8.00-9.35', '9.45-11.20', '11.45-13.20', '13.30-15.05', '15.30-17.05', '17.15-18.50', '19.00-20.35'];

  // Fetch cabinets using the custom hook
  const { data: cabinets, loading: cabinetsLoading, error: cabinetsError } = useDataFetching(
    'http://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/api/get-all-info/get-all-cabinets'
  );

  // Fetch subjects using the custom hook
  const { data: subjects, loading: subjectsLoading, error: subjectsError } = useDataFetching(
    'http://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/api/get-all-info/get-all-subjects'
  );

  // Fetch lessons using the custom hook
  const { data: lessons, loading: lessonsLoading, error: lessonsError } = useDataFetching(
    `http://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/api/get-all-info/get-all-lessons?cabinetId=${selectedCabinet}`
  );

     // Fetch teachers using the custom hook
     const { data: teachers, loading: teachersLoading, error: teachersError } = useDataFetching(
      'http://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/api/get-all-info/get-all-teachers'
  );

  const handleCabinetChange = (event) => {
    setSelectedCabinet(event.target.value);
  };

  // Define handleDayOfWeekChange function (not shown in your provided code)
  const handleDayOfWeekChange = (event) => {
    setSelectedDayOfWeek(event.target.value);
  };

  useEffect(() => {
    // Set the selectedCabinet to the first cabinet in the list after fetching cabinets
    if (cabinets.length > 0 && !selectedCabinet) {
      setSelectedCabinet(cabinets[0].id);
    }
  }, [cabinets, selectedCabinet]);

  // Wait for all the data to be loaded before rendering the LessonTable
  if (cabinetsLoading || subjectsLoading || lessonsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="schedule-container">
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
