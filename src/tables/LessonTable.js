import React from 'react';
const daysOfWeek = ['ПОНЕДЕЛЬНИК', 'ВТОРНИК', 'СРЕДА', 'ЧЕТВЕРГ', 'ПЯТНИЦА', 'СУББОТА', 'ВОСКРЕСЕНЬЕ', 'ВСЯ НЕДЕЛЯ'];

const LessonTable = ({ selectedDayOfWeek, TIME_PERIODS, lessons, subjects }) => {
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
                  {/* Add your data here */}
                  {uniqueLessons.map((lesson) => {
                    if (
                      lesson.lessonDay === selectedDayOfWeek.toLowerCase() &&
                      lesson.lessonTime === timePeriod
                    ) {
                      let subjectName = 'unknown';
                      subjects.forEach((subject) => {
                        if (subject.id === lesson.subjectId) {
                          subjectName = subject.subjectName;
                        }
                      });
                      return (
                        <div key={lesson.id} className="lesson-cell">
                          {lesson.fromWeekToWeek} {lesson.byChoice} {subjectName} {lesson.lessonType} {lesson.lessonWeek}
                        </div>
                      );
                    } else {
                      // If the lesson doesn't match the condition, you can return an empty div or null
                      return <div key={lesson.id}></div>;
                    }
                  })}
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
                        {uniqueLessons.map((lesson) => {
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
                            return (
                              <div key={lesson.id} className="lesson-cell">
                                {lesson.fromWeekToWeek} {lesson.byChoice} {subjectName} {lesson.lessonType} {lesson.lessonWeek}
                              </div>
                            );
                          } else {
                            // If the lesson doesn't match the condition, you can return an empty div or null
                            return <div key={lesson.id}></div>;
                          }
                        })}
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
