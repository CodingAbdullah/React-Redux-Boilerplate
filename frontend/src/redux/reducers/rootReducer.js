import { combineReducers } from 'redux';
import { loginReducer } from './authReducers';

export const rootReducer = combineReducers({
    authorization: loginReducer
});