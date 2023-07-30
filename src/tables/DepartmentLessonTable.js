import React from 'react';
import { useState, useEffect } from 'react';

const DepartmentLessonTable = ({ selectedDayOfWeek, TIME_PERIODS, lessons, subjects, viewType, selectedTeacher, teachers, cabinets }) => {
  const daysOfWeek = ['ПОНЕДЕЛЬНИК', 'ВТОРНИК', 'СРЕДА', 'ЧЕТВЕРГ', 'ПЯТНИЦА', 'СУББОТА', 'ВОСКРЕСЕНЬЕ', 'ВСЯ НЕДЕЛЯ'];
  const [showTeacherNames, setShowTeacherNames] = useState(true);

  const changeScheduleContainerClass = (toRemove) => {
    let gridDiv = document.querySelector('.schedule-container');
    if (toRemove === true) {
      if (gridDiv) {
        gridDiv.classList.remove('schedule-container');
        gridDiv.classList.add('not-schedule-container');
      }
    }
    else {
      gridDiv = document.querySelector('.not-schedule-container');
      if (gridDiv) {
        if (!gridDiv.classList.contains('schedule-container')) {
          gridDiv.classList.add('schedule-container');
          gridDiv.classList.remove('not-schedule-container')
        }
      }

    }
    return;
  };


  // Function to filter the lessons based on the selected day of the week and teacher (if applicable)
  const filterLessons = () => {
    if (viewType === 'allTeachers') {
      // When viewing all teachers, show all lessons for the selected day of the week
      return lessons.filter((lesson) => lesson.dayOfWeek === selectedDayOfWeek);
    } else {
      // When viewing a single teacher, show lessons for the selected teacher and day of the week
      return lessons.filter((lesson) => lesson.dayOfWeek === selectedDayOfWeek && lesson.teacherId === selectedTeacher);
    }
  };

  // Function to render the teacher names on the left side
  const renderTeacherNames = () => {
    return teachers.map((teacher) => (
      <th key={teacher.id}>
        <div style={{ transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>
          {teacher.teacherName} {teacher.teacherPatronymic} {teacher.teacherSurname}
        </div>
      </th>
    ));
  };

  // Function to render the table header based on the view type
  const renderTableHeader = (showTeacherNames) => {
    return (
      <tr>
        {showTeacherNames && <th>Teacher</th>}
        {/* {viewType === 'allTeachers' && <th>Teacher</th>} */}
        {TIME_PERIODS.map((timePeriod) => (
          <th key={timePeriod}>{timePeriod}</th>
        ))}
      </tr>
    );
  };

  // Function to render the table rows for all teachers
  const renderAllTeachersTableRows = (dayOfTheWeek, showTeacherNames) => {
    const timePeriods = [...TIME_PERIODS];
    const allTeachersLessons = lessons.filter((lesson) => lesson.lessonDay.toLowerCase() === dayOfTheWeek.toLowerCase());

    return teachers.map((teacher) => (
      <tr key={teacher.id}>
        {/* {viewType === 'allTeachers' && <td>{teacher.teacherName} {teacher.teacherPatronymic} {teacher.teacherSurname}</td>} */}
        {showTeacherNames && <td style={{ minWidth: '300px'}}>
          <div className='lessontd' style={{ whiteSpace: 'nowrap'}}>
            {teacher.teacherName} {teacher.teacherPatronymic} {teacher.teacherSurname}
          </div>
        </td>}
        {timePeriods.map((timePeriod) => {
          const lesson = allTeachersLessons.find((lesson) => lesson.teacherId === teacher.id && lesson.lessonTime === timePeriod);
          let subjectName = 'unknown';
          let cabinetName = 'unknown';
          let teacherName = 'unknown';
          if(lesson){subjects.forEach((subject) => {
            if (subject.id === lesson.subjectId) {
              subjectName = subject.subjectName;
            }
          });
          cabinets.forEach((cabinet) => {
            if (cabinet.id === lesson.cabinetId) {
              cabinetName = cabinet.cabinetName;
            }
          });
          
          teachers.forEach((teacher) => {
            if (teacher.id === lesson.teacherId) {
              teacherName = teacher.teacherSurname + ' ' + teacher.teacherName.charAt(0) + '.' + teacher.teacherPatronymic.charAt(0) + '.';
            }
          });
        }
          
          return (
            <td key={timePeriod}>
              <div className='lessontd'>
                {lesson ? `${lesson.lessonWeek} ${subjectName} ${lesson.byChoice} ${lesson.lessonType} ${teacherName} ауд. ${cabinetName}` : ''}
              </div>
            </td>
          );
        })}
      </tr>
    ));
  };


  // Function to render the individual day tables for the whole week view
  const renderWholeWeekTables = () => {
    let firstTableRendered = false;
    const bulb = document.querySelector('.alldaysTeachers');
    return (
      <div style={{ display: 'flex', flexDirection: 'row', overflow: 'auto' }}>
        {daysOfWeek.map((dayOfWeek) => {
          if (dayOfWeek !== 'ВСЯ НЕДЕЛЯ') {
            return (
              <table className="allDaysTeachers" key={dayOfWeek}>
                <thead>
                  <tr>
                    <th colSpan={TIME_PERIODS.length + 1} style={{ textAlign: 'center' }}>{dayOfWeek}</th>
                  </tr>
                  {!firstTableRendered ? renderTableHeader(true) : renderTableHeader(false)}
                </thead>
                <tbody>
                  {!firstTableRendered ? renderAllTeachersTableRows(dayOfWeek, true) : renderAllTeachersTableRows(dayOfWeek, false)}
                  {/* {renderAllTeachersTableRows(dayOfWeek, showTeacherNames)} */}
                  {firstTableRendered = true}
                </tbody>
              </table>
            );
          }
          return null;
        })}
      </div>
    );
  };



  return (
    <div>
      <h3 style={{ textAlignLast: 'center' }}>Lesson Table</h3>
      {selectedDayOfWeek === 'ВСЯ НЕДЕЛЯ' ? (
        <div>
          {/* {renderTableHeader()} */}
          {changeScheduleContainerClass(true)}
          {renderWholeWeekTables()}
        </div>
      ) : (
        <table className='allDaysTeachers'>
          <thead>
            {renderTableHeader(true)}
          </thead>
          <tbody>
            {changeScheduleContainerClass(false)}
            {renderAllTeachersTableRows(selectedDayOfWeek, true)}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DepartmentLessonTable;
