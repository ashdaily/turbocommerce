import {deleteRequest, getRequest, postRequest, putRequest} from "../util/AxiosServiceUtils";

export async function serviceGetAddress(params) {
    return await getRequest('customer/customer-shipping-address/', params);
}

export async function serviceCreateAddress(params) {
    return await postRequest('customer/customer-shipping-address/', params);
}

export async function serviceDeleteAddress(id) {
    return await deleteRequest(`customer/customer-shipping-address/${id}`, {});
}

export async function serviceEditAddress(id, params) {
    return await putRequest(`customer/customer-shipping-address/${id}/`, params);
}
