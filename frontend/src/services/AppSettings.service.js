import {getRequest, postRequest} from "../util/AxiosServiceUtils";

export async function serviceGetStoreInformation(params) {
    return await getRequest('store/store-information/', params);
}
