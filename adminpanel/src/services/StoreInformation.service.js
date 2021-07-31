import { getRequest, postRequest } from '../../../frontend/src/util/AxiosServiceUtils';

export async function serviceGetStoreInformation(params) {
  return await getRequest('store/store-information/', params);
}

export async function serviceAddStoreInformation(params) {
  return await postRequest('store/store-information/', params);
}
