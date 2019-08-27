import * as types from '../actions/actionTypes';

// With 'default' term, you can decide the alias in the future imports
export default function courseReducer(state = [], action) {
    switch(action.type) {
        case types.CREATE_COURSE:
            return [...state, {...action.course}];
        default:
            return state;
    }
}