// Reducers are functions that take two parameters, action and state
// Must be pure functions

// only way to change the state is by sending a signal to the store.This signal is an action. “Dispatching an action” is the process of sending out a signal

import * as actionTypes from '../constants/actionTypes';
import apiCaller from 'axios';

const initialState = {
    notes: [],
    selected: [],
    deleteButtonEnabled: false
};

export const actionCreators = {
    getNotes: () => async (dispatch, getState) => {
        const url = `api/Notes`;
        const response = await apiCaller.get(url);
        const notes = await response.data;

        dispatch({ type: actionTypes.GET_NOTES,notes })
    },
    addNote: (note) => async (dispatch, getState) => {
        const url = `api/Notes`;
        const response = await apiCaller.post(url, note);
        if (response.status == 201) {
            dispatch({ type: actionTypes.ADD_NOTE,note:response.data })
        }
    },
    selectNote: (note) => (dispatch)=>{
        dispatch({ type: actionTypes.SELECT_NOTE, note })
    },
    updateNote: (note) => async (dispatch) => {
        const url = `api/Notes/${note.id}`;
        const response = await apiCaller.put(url,note);
        dispatch({ type: actionTypes.UPDATE_NOTE, note });
    },
    deleteNote: (id) => async (dispatch) => {
        const url = `api/Notes/${id}`;
        const response = await apiCaller.delete(url);
        dispatch({ type: actionTypes.DELETE_NOTE, id });
    }
}

export default (state, action) => {
    state = state || initialState;
    switch (action.type) {
        case actionTypes.GET_NOTES:
            return {
                ...state,
                notes: action.notes
            }
        case actionTypes.ADD_NOTE:
            return {
                ...state,
                notes: [...state.notes, action.note],
                selected: action.note,
                deleteButtonEnabled: true
            };
        case actionTypes.SELECT_NOTE:
            return {
                ...state,
                selected: action.note,
                deleteButtonEnabled: true
            }
        case actionTypes.UPDATE_NOTE:
            return {
                ...state,
                notes: state.notes.map(note => {
                    console.log(note, action.note)
                    if (note.id === parseInt(action.note.id)) {
                        return { ...note, text: action.note.text }
                    } return note;
                }),
                selected: action.note,
                deleteButtonEnabled: true
            }
        case actionTypes.DELETE_NOTE:
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.id),
                selected: [],
                deleteButtonEnabled: false
            }
        default:
            return state;
    }
};