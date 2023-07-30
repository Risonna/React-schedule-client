import React from 'react';

const DepartmentLessonTable = ({ selectedDayOfWeek, TIME_PERIODS, lessons, subjects, viewType, selectedTeacher, teachers }) => {
  const daysOfWeek = ['ПОНЕДЕЛЬНИК', 'ВТОРНИК', 'СРЕДА', 'ЧЕТВЕРГ', 'ПЯТНИЦА', 'СУББОТА', 'ВОСКРЕСЕНЬЕ', 'ВСЯ НЕДЕЛЯ'];
  
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
      return (
        <div>
          {teachers.map((teacher) => (
            <div key={teacher.id}>{teacher.teacherName} {teacher.teacherPatronymic} {teacher.teacherSurname}</div>
          ))}
        </div>
      );
    };

  // Function to render the table header based on the view type
  const renderTableHeader = () => {
    return (
      <tr>
        {/* {viewType === 'allTeachers' && <th>Teacher</th>} */}
        {TIME_PERIODS.map((timePeriod) => (
          <th key={timePeriod}>{timePeriod}</th>
        ))}
      </tr>
    );
  };

  // Function to render the table rows for all teachers
  const renderAllTeachersTableRows = (dayOfTheWeek) => {
    const timePeriods = [...TIME_PERIODS];
    const allTeachersLessons = lessons.filter((lesson) => lesson.lessonDay.toLowerCase() === dayOfTheWeek.toLowerCase());

    return teachers.map((teacher) => (
      <tr key={teacher.id}>
        {/* {viewType === 'allTeachers' && <td>{teacher.teacherName} {teacher.teacherPatronymic} {teacher.teacherSurname}</td>} */}
        {timePeriods.map((timePeriod) => {
          const lesson = allTeachersLessons.find((lesson) => lesson.teacherId === teacher.id && lesson.lessonTime === timePeriod);
          return (
            <td key={timePeriod}>
              {lesson ? `${lesson.lessonWeek} ${lesson.subjectName} ${lesson.byChoice} ${lesson.lessonType} ауд. ${lesson.cabinetName}` : ''}
            </td>
          );
        })}
      </tr>
    ));
  };

  // Function to render the individual day tables for the whole week view
 // Function to render the individual day tables for the whole week view
 const renderWholeWeekTables = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {daysOfWeek.map((dayOfWeek) => {
        if (dayOfWeek !== 'ВСЯ НЕДЕЛЯ') {
          return (
            <table className="allDaysTeachers" key={dayOfWeek}>
              <thead>
                <tr>
                  <th colSpan={TIME_PERIODS.length + 1}>{dayOfWeek}</th>
                </tr>
                {renderTableHeader()}
              </thead>
              <tbody>
                {renderAllTeachersTableRows(dayOfWeek)}
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
    <h3>Lesson Table</h3>
    {selectedDayOfWeek === 'ВСЯ НЕДЕЛЯ' ? (
      <div>
        {renderTableHeader()}
        {renderWholeWeekTables()}
      </div>
    ) : (
      <table>
        <thead>
          {renderTableHeader()}
        </thead>
        <tbody>
          {renderAllTeachersTableRows(selectedDayOfWeek)}
        </tbody>
      </table>
    )}
  </div>
);
};

export default DepartmentLessonTable;
