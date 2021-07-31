import {serviceGetStoreInformation} from '../services/StoreInformation.service';

export const STORE_INFORMATION_LIST_INIT = 'STORE_INFORMATION_LIST_INIT';
export const STORE_INFORMATION_LIST_DONE = 'STORE_INFORMATION_LIST_DONE';

export const actionGetStoreInformation = () => {
    const req = serviceGetStoreInformation();
    return dispatch => {
        dispatch({type: STORE_INFORMATION_LIST_INIT, payload: null});
        req.then(res => {
            if (!res.error) {
                dispatch({type: STORE_INFORMATION_LIST_DONE, payload: res.data});
            } else {
                dispatch({type: STORE_INFORMATION_LIST_DONE, payload: []});
            }
        });
    };
};
