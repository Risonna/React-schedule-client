import React from 'react';
const daysOfWeek = ['ПОНЕДЕЛЬНИК', 'ВТОРНИК', 'СРЕДА', 'ЧЕТВЕРГ', 'ПЯТНИЦА', 'СУББОТА', 'ВОСКРЕСЕНЬЕ', 'ВСЯ НЕДЕЛЯ'];

const LessonTable = ({ selectedDayOfWeek, TIME_PERIODS, lessons, subjects, teachers, cabinets }) => {

  const checkScheduleContainer = () => {
    const gridDiv = document.querySelector('.not-schedule-container');
    if(gridDiv){
      if(!gridDiv.classList.contains('schedule-container')) {
        gridDiv.classList.add('schedule-container');
        gridDiv.classList.remove('not-schedule-container')
      }
    }
  } 

  const matchLessonsWithParameters = (timePeriod, day) => {
    {return uniqueLessons.map((lesson) => {
      if (
        lesson.lessonDay === day.toLowerCase() &&
        lesson.lessonTime === timePeriod
      ) {
        let subjectName = 'unknown';
        subjects.forEach((subject) => {
          if (subject.id === lesson.subjectId) {
            subjectName = subject.subjectName;
          }
        });
        let cabinetName = 'unknown';
        cabinets.forEach((cabinet) => {
          if(cabinet.id === lesson.cabinetId){
            cabinetName = cabinet.cabinetName;
          }
        });
        let teacherName = 'unknown';
        teachers.forEach((teacher) => {
          if(teacher.id === lesson.teacherId){
            teacherName = teacher.teacherSurname + ' ' + teacher.teacherName.charAt(0) + '.' + teacher.teacherPatronymic.charAt(0) + '.';
          }
        });
        return (
          <div key={lesson.id} className="lesson-cell">
            {lesson.fromWeekToWeek} {lesson.lessonWeek} {lesson.byChoice} {subjectName} {lesson.lessonType} {teacherName} ауд. {cabinetName}
          </div>
        );
      } else {
        // If the lesson doesn't match the condition, you can return an empty div or null
        return <div key={lesson.id}></div>;
      }
    })}
  };



  // Create a new array to store unique lessons
  const uniqueLessons = [];

  // Group lessons by their unique attributes (lessonDay, lessonTime, lessonWeek)
  const groupedLessons = lessons.reduce((groups, lesson) => {
    const groupKey = `${lesson.lessonDay}_${lesson.lessonTime}_${lesson.lessonWeek}`;
    if (!groups[groupKey]) {
      groups[groupKey] = lesson;
    }
    return groups;
  }, {});

  // Convert the grouped lessons object into an array of unique lessons
  for (const key in groupedLessons) {
    uniqueLessons.push(groupedLessons[key]);
  }

  return (
    <table className="lesson-table" id="lessonTable">
      <thead>
        <tr>
          <th>Время</th>
          {checkScheduleContainer()}
          {selectedDayOfWeek !== 'ВСЯ НЕДЕЛЯ' ? (
            <th>{selectedDayOfWeek}</th>
          ) : (
            // Display the day headers for the whole week
            daysOfWeek.map((day) => {
              if (day !== 'ВСЯ НЕДЕЛЯ') {
                return <th key={day}>{day}</th>;
              }
              return null;
            })
          )}
        </tr>
      </thead>
      <tbody>
        {TIME_PERIODS.map((timePeriod) => (
          <tr key={timePeriod}>
            <td>{timePeriod}</td>
            {selectedDayOfWeek !== 'ВСЯ НЕДЕЛЯ' ? (
              <td>
                <div style={{ textAlign: 'center' }}>
                  {matchLessonsWithParameters(timePeriod, selectedDayOfWeek)}
                </div>
              </td>
            ) : (
              // Display the lessons for the whole week
              daysOfWeek.map((day) => {
                if (day !== 'ВСЯ НЕДЕЛЯ') {
                  return (
                    <td key={day}>
                      <div style={{ textAlign: 'center' }}>
                        {/* Add your data here */}
                        {matchLessonsWithParameters(timePeriod, day)}
                      </div>
                    </td>
                  );
                }
                return null;
              })
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LessonTable;
