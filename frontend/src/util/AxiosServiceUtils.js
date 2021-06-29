import axios from 'axios';
import Constants from '../config/constants';


export async function postRequest(url, params) {
    try {
        const tempRequest = await axios.post(`${Constants.DEFAULT_APP_URL}${url}`, {...params});
        if (tempRequest.status === 200 || tempRequest.status === 201) {
            return {
                error: false,
                message: '',
                data: tempRequest.data,
                authorization: true,
                response_code: tempRequest.data
            };
        }
    } catch (err) {
        if (err.response.status === 401) {
            return {error: true, authorization: false, response_code: 0};
        }
        if (err.response.status === 400) {
            return {error: true, message: 'Please Send Required Parameters', authorization: true, response_code: 0};
        }
        return {error: true, message: 'Something Went Wrong', authorization: true};
    }
}

export async function deleteRequest(url, params) {
    try {
        const tempRequest = await axios.delete(`${Constants.DEFAULT_APP_URL}${url}`, {...params});
        if (tempRequest.status === 200 || tempRequest.status === 201) {
            return {
                error: false,
                message: '',
                data: tempRequest.data,
                authorization: true,
                response_code: tempRequest.data
            };
        }
    } catch (err) {
        if (err.response.status === 401) {
            return {error: true, authorization: false, response_code: 0};
        }
        if (err.response.status === 400) {
            return {error: true, message: 'Please Send Required Parameters', authorization: true, response_code: 0};
        }
        return {error: true, message: 'Something Went Wrong', authorization: true};
    }
}

export async function putRequest(url, params) {
    try {
        const tempRequest = await axios.put(`${Constants.DEFAULT_APP_URL}${url}`, {...params});
        if (tempRequest.status === 200 || tempRequest.status === 201) {
            return {
                error: false,
                message: '',
                data: tempRequest.data,
                authorization: true,
                response_code: tempRequest.data
            };
        }
    } catch (err) {
        if (err.response.status === 401) {
            return {error: true, authorization: false, response_code: 0};
        }
        if (err.response.status === 400) {
            return {error: true, message: 'Please Send Required Parameters', authorization: true, response_code: 0};
        }
        return {error: true, message: 'Something Went Wrong', authorization: true};
    }
}

export async function getRequest(url, params) {
    try {
        const tempRequest = await axios.get(`${Constants.DEFAULT_APP_URL}${url}`, {params: {...params}});
        if (tempRequest.status === 200) {
            return {error: false, message: '', data: tempRequest.data, authorization: true};
        }
    } catch (err) {
        if (err.response.status === 401) {
            return {error: true, authorization: false};
        }
        if (err.response.status === 400) {
            return {error: true, message: 'Please Send Required Parameters', authorization: true};
        }
        return {error: true, message: 'Something Went Wrong', authorization: true};
    }
}

export async function formDataRequest(url, formData) {
    try {
        const tempRequest = await axios({
            method: 'post',
            url: `${Constants.DEFAULT_APP_URL}${url}`,
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        });
        if (tempRequest.status === 200) {
            return {error: false, message: '', data: tempRequest.data, authorization: true};
        }
    } catch (err) {
        if (err.response.status === 401) {
            return {error: true, authorization: false};
        }
        if (err.response.status === 400) {
            return {error: true, message: 'Please Send Required Parameters', authorization: true};
        }
        return {error: true, message: 'Something Went Wrong', authorization: true};
    }
}
