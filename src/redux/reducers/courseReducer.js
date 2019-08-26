// With 'default' term, you can decide the alias in the future imports
export default function courseReducer(state = [], action) {
    switch(action) {
        case 'CREATE_COURSE':
            return [...state, {...action.course}];
        default:
            return state;
    }
}