import {deleteRequest, getRequest, postRequest} from "../util/AxiosServiceUtils";

export async function serviceGetAddress(params) {
    return await getRequest('customer/customer-shipping-address/', params);
}

export async function serviceCreateAddress(params) {
    return await postRequest('customer/customer-shipping-address/', params);
}

export async function serviceDeleteAddress(id) {
    return await deleteRequest(`customer/customer-shipping-address/${id}`, {});
}
