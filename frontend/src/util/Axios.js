import axios from 'axios'
import { setHeaders } from "./Auth";


axios.defaults.baseURL = process.env.REACT_APP_AXIOS_ENDPOINT;
axios.defaults.headers = setHeaders()

// axios.interceptors.response.use(response => {
//     if(response.status !== 401) return response;
//     axios.post('/auth/token', {
//         "refresh_token": refreshToken,
//         "client_id": process.env.REACT_APP_DJANGO_OAUTH_GENERATED_CLIENT_ID,
//         "client_secret": process.env.REACT_APP_DJANGO_OAUTH_GENERATED_CLIENT_SECRET,
//         "grant_type": "refresh_token"
//     }).then(response => {
//         saveToken(response.data["access_token"], response.data["refresh_token"]);
//         axios.defaults.headers = setHeaders()
//     }).catch(error => {
//         destroyToken();
//         window.location.reload();
//         return Promise.reject(error);
//     }
// )});


export default axios;
