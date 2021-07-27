import axios from 'axios';

export function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}

export function setAxiosTimezone() {
  const tempDate = new Date();
  axios.defaults.headers.common.timezone = -(tempDate.getTimezoneOffset() / 60);
}
