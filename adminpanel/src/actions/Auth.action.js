/* eslint-disable indent,linebreak-style,max-len */
import { setAuthorizationToken } from '../utils/AxiosUtils';
import history from '../utils/HistoryUtils';

export const AUTH_USER = 'AUTH_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_PROFILE = 'SET_PROFILE';
export const GET_PROFILE_INIT = 'GET_PROFILE_INIT';

export function actionLoginUser(data) {
  return (dispatch) => {
    if (data) {
      localStorage.setItem('jwt_token', data.token);
      // localStorage.setItem('user', JSON.stringify({ name: data.name,  id: data.user_id }));
      // setAuthorizationToken(data.token);
      dispatch({
        type: AUTH_USER,
        payload: { token: data.token, name: data.name, id: data.user_id }
      });
      // dispatch(actionGetProfile());
      history.push(`/dashboard`);
    }
  };
  // return ({type: AUTH_USER, payload: data});
}

export function actionLogoutUser() {
  return (dispatch) => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
    setAuthorizationToken(false);
    dispatch({ type: LOGOUT_USER });
    history.push(`/login`);
    // browserHistory.push(`${process.env.PUBLIC_URL}/login`);
  };
}
