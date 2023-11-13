import {SET_SELECTED_TEACHER } from '../actions/selectedTeacherActions';

export const setSelectedTeacher = (teacherId) => ({
    type: SET_SELECTED_TEACHER,
    payload: teacherId,
  });