/* eslint-disable indent,linebreak-style */
import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';
import AuthReducer from './Auth.reducer';

const rootReducer = combineReducers({
  state: (state = {}) => state,
  // form: formReducer,
  auth: AuthReducer
});

export default rootReducer;
