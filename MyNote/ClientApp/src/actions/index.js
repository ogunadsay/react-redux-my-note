import * as actionTypes from '../constants/actionTypes';

export const addNote = note => ({ type: actionTypes.ADD_NOTE, payload: note });
export const deleteNote = id => ({ type: actionTypes.DELETE_NOTE, id });
export const updateNote = note => ({ type: actionTypes.UPDATE_NOTE, payload: note });
export const selectNote = note => ({ type: actionTypes.SELECT_NOTE, payload: note });
export const getNotes = note => ({ type: actionTypes.GET_NOTES });
// export const toggleVisibility = note=> ({type:actionTypes.ADD_NOTE})