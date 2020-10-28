import axios from 'axios'

const accessToken = localStorage.getItem("accessToken");
const backendName = localStorage.getItem("backendName");

axios.defaults.baseURL = process.env.REACT_APP_AXIOS_ENDPOINT;
axios.defaults.headers = accessToken ? {'Authorization': `Bearer ${backendName} ${accessToken}`} : {}

export default axios;
