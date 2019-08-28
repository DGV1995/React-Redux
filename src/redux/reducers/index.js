import { combineReducers } from 'redux';
import courses from './courseReducer'; // courses is an alias
import authors from './authorReducer';
import apiCallsInProgress from './apiStatusReducer';

const rootReducer = combineReducers({
    courses,
    authors,
    apiCallsInProgress
});

export default rootReducer;