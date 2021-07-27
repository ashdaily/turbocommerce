import {getRequest, putRequest} from "../util/AxiosServiceUtils";

export async function serviceGetStoreInformation(params) {
    return await getRequest('store/store-information/', params);
}

export async function serviceChangePassword(params) {
    return await putRequest('core/customer/update-password/', params);
}
