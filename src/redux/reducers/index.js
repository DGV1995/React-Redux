import { combineReducers } from 'redux';
import courses from './courseReducer'; // courses is an alias
import authors from './authorReducer';

const rootReducer = combineReducers({
    courses,
    authors
});

export default rootReducer;