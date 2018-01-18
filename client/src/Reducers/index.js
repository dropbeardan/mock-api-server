import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import instanceReducer from './instanceReducer';
import sessionReducer from './sessionReducer';

export default combineReducers({
    instance: instanceReducer,
    session: sessionReducer,
    routing: routerReducer
});

