import React from 'react';

const TeacherSelect = ({ teachers, selectedTeacher, handleTeacherChange }) => {
  return (
    <select className={'selectTeacher'} value={selectedTeacher} onChange={handleTeacherChange}>
      {teachers.map((teacher) => (
        <option key={teacher.id} value={teacher.id}>
          {teacher.teacherName} {teacher.teacherPatronymic} {teacher.teacherSurname}
        </option>
      ))}
    </select>
  );
};

export default TeacherSelect;
