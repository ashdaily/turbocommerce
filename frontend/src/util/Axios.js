import axios from 'axios'
import { setHeaders, refreshToken, saveTokens, destroyTokens } from "./Auth";


axios.defaults.baseURL = process.env.REACT_APP_AXIOS_ENDPOINT;
axios.defaults.headers = setHeaders()

axios.interceptors.response.use(response => {
    if(response.status !== 401) return response;
    axios.post('/auth/token/refresh/', {
        "refresh_token": refreshToken,
    }).then(response => {
        saveTokens(response.data["access_token"], response.data["refresh_token"]);
        axios.defaults.headers = setHeaders()
        window.location.reload()
    }).catch(error => {
        destroyTokens();
        window.location.reload();
        return Promise.reject(error);
    })
}, (error) => {
    if(error.response.status === 401) {
        axios.post('/api/core/auth/token/refresh/', {
            "refresh": refreshToken,
        }).then(response => {
            console.log(response)
            saveTokens(response.data.access, refreshToken);
            axios.defaults.headers = setHeaders()
            window.location.reload()
        }).catch(error => {
            destroyTokens();
            window.location.reload();
            return Promise.reject(error);
        })
    }
});


export default axios;
