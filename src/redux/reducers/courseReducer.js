import * as types from '../actions/actionTypes';
import initialState from './initialState';

// With 'default' term, you can decide the alias in the future imports
export default function courseReducer(state = initialState.courses, action) {
    switch(action.type) {
        case types.CREATE_COURSE:
            return [...state, {...action.course}];
        case types.LOAD_COURSES_SUCCESS:
            return action.courses;
        default:
            return state;
    }
}